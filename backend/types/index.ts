import { Types, Model } from 'mongoose'
import { Request } from 'express'

// type definition for chat model
export interface typesChat {
   chatName: string
   isGroupChat: boolean
   users: Array<Types.ObjectId>
   message: Types.ObjectId
   admin: Types.ObjectId
   recentMessage: string
}

// type definition for message model
export interface typeMessage {
   sender: Types.ObjectId
   message: string
   chat: Types.ObjectId
}

// type definition for user model
export interface typeUser {
   _id?: any
   name: string
   email: string
   password: string
   avatar?: string
   isValidPassword(
      candidatePassword: string,
      userPassword: string
   ): Promise<boolean>
}
export interface UserModel extends Model<typeUser> {}
