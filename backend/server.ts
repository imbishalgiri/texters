import express, { Application, Request, Response } from 'express'
import { Server } from 'socket.io'

import cors from 'cors'
import passport from 'passport'

import UserRoutes from './routes/userRoutes'
import AuthRoutes from './routes/authRoutes'
import ChatRoutes from './routes/chatRoutes'
import MessageRoutes from './routes/messageRoutes'
import { typeMessage } from './types'

import dotenv from 'dotenv'
dotenv.config()

// setting up constants
const port = process.env.PORT || 4000

// cloudinary imports
import './config/cloudinary'

const app: Application = express()

app.use(cors())

app.use(express.json())

// passport js setup
app.use(passport.initialize())
import './config/passport'
// -------------------------------

// database connection code
import './config/database'

// app  Routes in here
app.use('/api/auth/', AuthRoutes)
app.use('/api/user/', UserRoutes)
app.use('/api/chat/', ChatRoutes)
app.use('/api/message/', MessageRoutes)
app.get('/', (req: Request, res: Response) => {
   res.send('Hello World this is endpoint /')
})
// --------------------------------------------

// running main server right here
const server = app.listen(port, () => {
   return console.log(`Server started on port ${port}`)
})

// types for socket io
interface ServerToClientEvents {
   noArg: () => void
   connected: () => void
   basicEmit: (a: number, b: string, c: Buffer) => void
   withAck: (d: string, callback: (e: number) => void) => void
}

interface ClientToServerEvents {
   setup: (id: string) => void
   joinChat: (id: string) => void
   newMessage: (newMessageReceived: typeMessage) => void
}

interface InterServerEvents {
   ping: () => void
}

interface SocketData {
   name: string
   age: number
   id: string
}

// creating socket io server
const io = new Server<
   ClientToServerEvents,
   ServerToClientEvents,
   InterServerEvents,
   SocketData
>(server, {
   pingTimeout: 60000,
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
})

io.on('connection', (socket) => {
   console.log('connected to socket .io')

   socket.on('setup', (id) => {
      socket.join(id)
      socket.emit('connected')
      console.log(id)
   })

   socket.on('joinChat', (id) => {
      socket.join(id)
      console.log('user joined room -->', id)
   })

   socket.on('newMessage', (newMessageReceived) => {})
})
