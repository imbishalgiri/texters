import express, { Application, Request, Response } from 'express'

import cors from 'cors'
import passport from 'passport'

import UserRoutes from './routes/userRoutes'
import AuthRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'

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
app.use('/api/chat/', chatRoutes)
app.get('/', (req: Request, res: Response) => {
   res.send('Hello World this is endpoint /')
})
// --------------------------------------------

// running main server right here
app.listen(port, () => {
   return console.log(`Server started on port ${port}`)
})
