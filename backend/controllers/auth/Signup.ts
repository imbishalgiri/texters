import { Request, Response } from 'express'
import User from '../../models/userModel'

import { verifySignup } from './validator'

// contolling user sign up right here
const signupController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { error } = verifySignup(req.body)
   const user = new User(req.body)
   if (error) {
      return res.status(400).send(error)
   }
   try {
      const userFound = await User.findOne({ email: req.body.email })
      if (userFound) {
         return res.status(403).send({
            field: 'email',
            message: 'This user already exists',
         })
      }

      const createdUser = await user.save()
      return res.status(201).send({ status: 'success', data: createdUser })
   } catch (err) {
      return res.status(500).send({ error: err })
   }
}

export { signupController }
