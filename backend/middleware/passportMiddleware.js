import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const googleSecret = process.env.GOOGLE_SECRET;

// google authorization middleware
passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: googleSecret,
      callbackURL: "http://localhost:5000/api/auth/loggedIn",
    },
    (accessToken, refreshToken, profile, done) => {
      if (!accessToken) {
        return done(new Error("No access token received"), null);
      }

      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

export default passport;
