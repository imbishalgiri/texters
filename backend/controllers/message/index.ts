import { Request, Response } from 'express'
import Message from '../../models/messageModel'

const getAllMessages = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { chatId } = req.params
   if (!chatId) {
      return res.status(400).send({
         title: 'validation error',
         message: 'Please provide chat id to get message from the chat',
      })
   }
   try {
      const messages = await Message.find({ chat: chatId })
         .populate('sender', '-password -email  -__v -createdAt -updatedAt')
         .select('-createdAt -updatedAt -email  -__v')
      return res.status(200).send({
         title: 'success',
         data: messages,
      })
   } catch (error) {
      return res.status(500).send({
         title: 'Error',
         message: error,
      })
   }
}

export { getAllMessages }
