import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma.ts";

import { generateToken } from "../lib/jwt.ts";

import { signupSchema } from "../validations/signupSchema.ts";
import { signinSchema } from "../validations/signinSchema.ts";


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

    console.log("Validation successful:", result.data);

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

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);

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

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
  res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "lax",
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

    console.log("Current user ID:", userId);
    
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