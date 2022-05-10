import express from 'express'
import { getAllMessages } from '../controllers/message'
import passport from 'passport'
const MessageRouter = express.Router()

// protected
MessageRouter.get(
   '/:chatId',
   passport.authenticate('jwt', { session: false }),
   getAllMessages
)

export default MessageRouter
