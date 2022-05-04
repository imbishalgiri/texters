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

// upload image to the cloudinary
const updateImage = async (req: Request, res: Response) => {
   const userID = req.user?._id

   try {
      const imageUrl = req.file?.path

      if (imageUrl) {
         await User.findByIdAndUpdate(userID, {
            avatar: imageUrl,
         })
         res.status(200).send({
            status: 'success',
            imageUrl: imageUrl,
         })
      }
   } catch (err) {
      res.status(500).send({ status: 'failed', error: 'err' })
   }
}

export { getAllUsers, updateImage }
