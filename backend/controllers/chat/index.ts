import { Request, Response } from 'express'
import Chat from '../../models/chatModel'

// ------ types

// creating a chat between sender and receiver
export const createChat = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { receiverId } = req.body
   const senderId = req.user?._id

   // adding base check
   if (!receiverId) {
      return res.status(403).send({
         title: 'Validation Error',
         message: 'please provide receiverId',
      })
   }

   try {
      const isChat = await Chat.findOne({
         isGroupChat: false,
         users: { $all: [receiverId, senderId] },
      })
         .populate('users')
         .populate('message')

      if (isChat) {
         // send already created chat
         return res.send(isChat)
      }

      const chat = {
         chatName: 'welcome chat',
         isGroupChat: false,
         users: [receiverId, senderId],
      }
      // create new chat and send the newly created chat
      await (await Chat.create(chat)).populate('users')
      return res.status(200).send({
         status: 'success',
         data: chat,
      })
   } catch (error) {
      return res.send(error)
   }
}

// get all chats for a single user
export const getAllChats = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const senderId = req.user?._id
   try {
      const allChats = await Chat.find({
         users: { $all: [senderId] },
      }).populate('users')
      return res.status(200).send({ status: 'success', data: allChats })
   } catch (error) {
      return res.send(error)
   }
}
