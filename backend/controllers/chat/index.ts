import { Request, Response } from 'express'
import Chat from '../../models/chatModel'
import Message from '../../models/messageModel'

/*
   @CONTROLLER(1): creating a chat between sender and receiver
 */
export const createChat = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { receiverId, message } = req.body
   const senderId = req.user?._id

   // adding base check (AKA validation)
   if (!receiverId || !message) {
      return res.status(403).send({
         title: 'Validation Error',
         message: 'please provide both (receiverId and message)',
      })
   }

   try {
      // checking whether chat already exists or not
      const isChat = await Chat.findOne({
         isGroupChat: false,
         users: { $all: [receiverId, senderId] },
      })
      /* 
         if chat between them users exists then...

         1. update the latest message in that chat

         2. create a message with (chat_id) and (sender_info)
       */
      if (isChat) {
         //1.
         const chat = await Chat.findByIdAndUpdate(
            isChat._id,
            { recentMessage: message },
            { new: true }
         ).populate('users')
         //2.
         const messageData = { sender: senderId, message, chat: chat?._id }
         const createdMessage = await (
            await Message.create(messageData)
         ).populate('sender')

         if (createdMessage)
            return res.send({ title: 'success', data: createdMessage })
         return res.send({
            status: 'Failed',
            message: 'could not send the damn message',
         })
      }
      /*
         If there aint no chat between sender and receiver (i.e they havent yet texted each other)

         1. create a chat with the two users
         2. create first message with (chat_id) and the (sender_info)
      */
      const chat = {
         chatName: 'welcome chat',
         isGroupChat: false,
         recentMessage: message,
         users: [receiverId, senderId],
      }
      // 1. create new chat and send the newly created chat
      const populatedChat = await (await Chat.create(chat)).populate('users')
      const firstMessage = {
         sender: senderId,
         message,
         chat: populatedChat._id,
      }

      // 2.
      const firstChat = await (
         await Message.create(firstMessage)
      ).populate('user')
      return res.status(200).send({
         status: 'success',
         data: firstChat,
      })
   } catch (error) {
      return res.send(error)
   }
}
// --- end of create chat controller

/*
   @CONTROLLER(2): get all chats for a single user
*/
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
