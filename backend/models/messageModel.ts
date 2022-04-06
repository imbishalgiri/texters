import { Schema, model, Types } from "mongoose";

// type definition for message model
interface typeMessage {
  sender: Types.ObjectId;
  message: string;
  chat: Types.ObjectId;
}

// data architecture for message model -->
const messageSchema = new Schema<typeMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

// creating our main model and exporting it
const Message = model("Message", messageSchema);
export default Message;
