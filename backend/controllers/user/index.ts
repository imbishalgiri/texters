import { Request, response, Response } from 'express'
import User from '../../models/userModel'

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
   const name = req.query.name || ''
   const email = req.query.email || ''
   try {
      const user = await User.find({
         name: new RegExp(`${name}`, 'gi'),
         email: new RegExp(`${email}`, 'gi'),
      }).select('-password -createdAt -updatedAt')
      // sending response here
      return res.send({
         title: 'success',
         data: user,
      })
      // ----------------
   } catch (error) {
      return res.send(error)
   }
}

const updateImage = (req: Request, res: Response) => {}

export { getAllUsers, updateImage }
