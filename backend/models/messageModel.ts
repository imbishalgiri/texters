import { Schema, model } from 'mongoose'
import { typeMessage } from '../types'

// data architecture for message model -->
const messageSchema = new Schema<typeMessage>(
   {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      message: { type: String, trim: true },
      chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
   },
   { timestamps: true }
)

// creating our main model and exporting it
const Message = model('Message', messageSchema)
export default Message
