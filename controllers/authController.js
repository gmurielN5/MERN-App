const { response } = require("express")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const UserModel = require("../models/user")

// Authentication

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
        if (!user) {
          return done(null, false, {
            message: { msgBody: "Incorrect email.", msgError: true },
          })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, {
            message: { msgBody: "Wrong Password", msgError: true },
          })
        }
        return done(null, user, { message: "Logged in Successfully" })
      } catch (error) {
        return done(error)
      }
    }
  )
)

// Authorization
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        const user = await UserModel.findOne({ _id: jwt_payload.user._id })
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  models.user.findOne(id, (err, user) => {
    done(err, user)
  })
})
