import { Request, Response, NextFunction } from 'express'
import User from '../../models/userModel'
import { verifyLogin } from './validator'
import jwt from 'jsonwebtoken'

const loginController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { error } = verifyLogin(req.body)

   if (error) {
      return res.status(400).send(error)
   }
   try {
      const userFound = await User.findOne({ email: req.body.email })
      // if user not found
      if (!userFound) {
         return res
            .status(401)
            .send({ status: 'failed', data: 'This user does not exist' })
      }
      // if user found but password invalid
      if (
         !(await userFound.isValidPassword(
            req.body.password,
            userFound.password
         ))
      ) {
         return res
            .status(401)
            .send({ status: 'failed', data: 'Incorrect Password' })
      }
      // if all the tests get successful
      const { id, name, email } = userFound
      const payload = { id, email, name }
      const token = jwt.sign({ user: payload }, `${process.env.JWT_SECRET}`)

      return res.status(200).send({
         status: 'success',
         token: `Bearer ${token}`,
      })
   } catch (err) {
      console.log('error -->', err)
      return res.status(500).send({ error: err })
   }
}

export { loginController }
