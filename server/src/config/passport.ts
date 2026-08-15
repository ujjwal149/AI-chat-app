import  prisma  from "../lib/prisma";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },

  async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(
          new Error("Google account does not have an email address.")
        );
      }

      const googleId = profile.id;

      // 1. Check Google account
      let user = await prisma.user.findUnique({
        where: {
          googleId,
        },
      });

      if (user) {
        return done(null, user);
      }

      // 2. Check existing email account
      user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            googleId,
            emailVerified: true,
          },
        });

        return done(null, user);
      }

      // 3. Create new Google user
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name:
            profile.displayName ||
            email.split("@")[0],
          password: null,
          emailVerified: true,
        },
      });

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
)
);

export default passport;