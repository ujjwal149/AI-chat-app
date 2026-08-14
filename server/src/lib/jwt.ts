import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d"
        }
    );
};

export const verifyToken = (token:string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    )as{
        userId:string;
    };
}; 

// ---------- Password Reset Token Generation ---------- //
export const generatePasswordResetToken = (
  userId: string
) => {
  return jwt.sign(
    {
      userId,
      purpose: "PASSWORD_RESET",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "10m",
    }
  );
};

export const verifyPasswordResetToken = (
  token: string
) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as {
    userId: string;
    purpose: "PASSWORD_RESET";
  };
};