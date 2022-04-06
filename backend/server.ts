import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import UserRoutes from './routes/userRoutes'
import AuthRoutes from './routes/authRoutes'

// setting up constants
const port = process.env.PORT || 4000

const app: Application = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// database connection code
import './config/database'

// registering routes in here
app.use('/api/auth/', AuthRoutes)
app.use('/api/user', UserRoutes)

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World this is endpoint /')
})

// running main server right here
app.listen(port, () => {
   return console.log(`Server started on port ${port}`)
})
