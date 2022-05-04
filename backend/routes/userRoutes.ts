import express, { Request, Response } from 'express'
import { getAllUsers, updateImage } from '../controllers/user'
import passport from 'passport'
import parser from '../config/cloudinary'
const UserRouter = express.Router()

// protected route
UserRouter.get(
   '/all',
   passport.authenticate('jwt', { session: false }),
   getAllUsers
)

UserRouter.patch(
   '/addImage',
   parser.single('image'),
   passport.authenticate('jwt', { session: false }),
   updateImage
)

export default UserRouter
