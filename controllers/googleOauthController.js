const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require('../models/users')
 // Sequelize User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:1010/api/v1/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const state = req.query.state? JSON.parse(Buffer.from(req.query.state, 'base64').toString()) : {};
        const {role} = state;
        let token;

        // Find user in MySQL
        let userExist = await User.findOne({
          where: { email: profile._json.email },
        });

        if (userExist) {
          // Only generate JWT
          token = jwt.sign({ 
            id: userExist.id 
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });
        } 
        else {
          // Create a new user in MySQL via Sequelize
          User = await User.create({
            
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            isVerified: profile._json.email_verified,
            password: "ErrandHive",
            role // No password because Google login
          });

          token = jwt.sign({ id: User.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });
        }
        return done(null, token);
      } catch (error) {
        console.error("Google Login Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((token, done) => {
  done(null, token);
});

passport.deserializeUser((token, done) => {
  done(null, token);
});
