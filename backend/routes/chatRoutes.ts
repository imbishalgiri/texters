import express, { Request, Response } from 'express'
import { createChat, getAllChats } from '../controllers/chat'
import passport from 'passport'

const ChatRouter = express.Router()

ChatRouter.route('/')
   .get(passport.authenticate('jwt', { session: false }), getAllChats)
   .post(passport.authenticate('jwt', { session: false }), createChat)

export default ChatRouter
