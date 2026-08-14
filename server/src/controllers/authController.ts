import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma.ts";

import { generateToken } from "../lib/jwt.ts";

import { signupSchema } from "../validations/signupSchema.ts";
import { signinSchema } from "../validations/signinSchema.ts";

import { createOtp, verifyOtp } from "../services/otpService.ts";
import { sendVerificationEmail } from "../services/emailService.ts";


//----------Signup Controller----------//
//----------Signup Controller----------//

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        error: "A user with this email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    try {
      const otp = await createOtp(
        user.id,
        "EMAIL_VERIFICATION"
      );

      await sendVerificationEmail(
        user.email,
        otp
      );
    } catch (emailError) {
      console.error(
        "Signup email delivery failed:",
        emailError
      );

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      res.status(500).json({
        error:
          "Unable to send verification email. Please try again.",
      });

      return;
    }

    res.status(201).json({
      message:
        "Account created. Verification code sent to your email.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      error: "Unable to create user",
    });
  }
};

// ---------- Signin Controller ---------- //

export const signin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      });

      return;
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
      });

      return;
    }

    if (!user.emailVerified) {
      res.status(403).json({
        error: "Please verify your email before signing in",
      });
    
      return;
    }

    if (!user.password) {
      res.status(401).json({
        error: "Invalid credentials",
      });

      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
      });

      return;
    }

    const isProduction = process.env.NODE_ENV === "production";

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to login user",
    });
  }
};


//---------- Logout Controller ---------- //
export const logout = async (
  _: Request,
  res: Response
): Promise<void> => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};


// ---------- Current User Controller ---------- //

export const currentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    
    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to get current user",
    });
  }
};

// ---------- Verify Email Controller ---------- //
export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        error: "Email and OTP are required",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        error: "Invalid verification request",
      });
      return;
    }

    if (user.emailVerified) {
      res.status(400).json({
        error: "Email is already verified",
      });
      return;
    }

    const isValid = await verifyOtp(
      user.id,
      otp,
      "EMAIL_VERIFICATION"
    );

    if (!isValid) {
      res.status(400).json({
        error: "Invalid or expired OTP",
      });
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to verify email",
    });
  }
};

//--------------resend verification email controller----------------//
export const resendVerificationEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        error: "Email is required",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        error: "Unable to send verification email",
      });
      return;
    }

    if (user.emailVerified) {
      res.status(400).json({
        error: "Email is already verified",
      });
      return;
    }

    const otp = await createOtp(
      user.id,
      "EMAIL_VERIFICATION"
    );

    await sendVerificationEmail(
      user.email,
      otp
    );

    res.status(200).json({
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to send verification email",
    });
  }
};