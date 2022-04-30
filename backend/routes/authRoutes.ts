import express from 'express'
import { signupController } from '../controllers/auth/Signup'
import { loginController } from '../controllers/auth/Login'

const AuthRouter = express.Router()

AuthRouter.route('/signup').post(signupController)

AuthRouter.route('/login').post(loginController)

export default AuthRouter
