import { connect } from 'mongoose'
// Database connection handeling right here
connect(`${process.env.MONGODB}`)
   .then((con) => console.log('connection successful to the database'))
   .catch((err) => console.log('failed to connect to the database', err))
