import crypto from "crypto";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma.ts";

type OtpPurpose =
  | "EMAIL_VERIFICATION"
  | "PASSWORD_RESET";

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;

export const generateOtp = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const createOtp = async (
  userId: string,
  purpose: OtpPurpose
): Promise<string> => {
  const otp = generateOtp();

  const codeHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  await prisma.verificationCode.updateMany({
    where: {
      userId,
      purpose,
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });

  await prisma.verificationCode.create({
    data: {
      userId,
      codeHash,
      purpose,
      expiresAt,
    },
  });

  return otp;
};

export const verifyOtp = async (
  userId: string,
  otp: string,
  purpose: OtpPurpose
): Promise<boolean> => {
  const verificationCode =
    await prisma.verificationCode.findFirst({
      where: {
        userId,
        purpose,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
        attempts: {
          lt: MAX_ATTEMPTS,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  if (!verificationCode) {
    return false;
  }

  const isValid = await bcrypt.compare(
    otp,
    verificationCode.codeHash
  );

  if (!isValid) {
    await prisma.verificationCode.update({
      where: {
        id: verificationCode.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    return false;
  }

  await prisma.verificationCode.update({
    where: {
      id: verificationCode.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  return true;
};