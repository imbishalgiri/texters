import { Schema, model } from 'mongoose'
import { typesChat } from '../types'

// data architecture for chat model -->
const schema = new Schema<typesChat>(
   {
      chatName: { type: String, required: true, trim: true },
      isGroupChat: { type: Boolean, default: false },
      users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      recentMessage: { type: String, required: true },
      image: { type: String, required: false },
      admin: { type: Schema.Types.ObjectId, ref: 'User' },
   },
   { timestamps: true }
)

// creating our main model and exporting it
const Chat = model('Chat', schema)
export default Chat
