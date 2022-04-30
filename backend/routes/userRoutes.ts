import express, { Request, Response } from 'express'
import { getAllUsers } from '../controllers/user'
import passport from 'passport'
const UserRouter = express.Router()

// protected route
UserRouter.get(
   '/all',
   passport.authenticate('jwt', { session: false }),
   getAllUsers
)

export default UserRouter
