import passport from 'passport'
import User from '../models/userModel'
import passportJwtStrategy from 'passport-jwt'

// types -->
import type { ErrorRequestHandler } from 'express'
import { typeUser } from '../types'

const JwtStrategy = passportJwtStrategy.Strategy
const ExtractJwt = passportJwtStrategy.ExtractJwt
const options = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET,
}

passport.use(
   new JwtStrategy(options, function (jwt_payload, done) {
      User.findOne(
         { id: jwt_payload.id },
         function (err: ErrorRequestHandler, user: typeUser) {
            if (err) {
               return done(err, false)
            }
            if (user) {
               return done(null, user)
            } else {
               return done(null, false)
               // or you could create a new account
            }
         }
      )
   })
)
