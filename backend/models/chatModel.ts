import { Schema, model, Types } from "mongoose";

// type definition for chat model
interface typesChat {
  chatName: string;
  isGroupChat: boolean;
  users: Array<Types.ObjectId>;
  message: Types.ObjectId;
  admin: Types.ObjectId;
}

// data architecture for chat model -->
const schema = new Schema<typesChat>(
  {
    chatName: { type: String, required: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    message: { type: Schema.Types.ObjectId, ref: "Message" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// creating our main model and exporting it
const Chat = model("Chat", schema);
export default Chat;
