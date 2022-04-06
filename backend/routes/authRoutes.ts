import express from 'express'
import { signupController } from '../controllers/auth/Signup'
import { loginController } from '../controllers/auth/Login'

const AuthRouter = express.Router()

AuthRouter.post('/signup', signupController)

AuthRouter.post('/login', loginController)

export default AuthRouter
