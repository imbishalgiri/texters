import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { typeUser, UserModel } from '../types'

// data architecture of user model
const userSchema = new Schema<typeUser>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: {
         type: String,
         required: true,
         default: 'https://picsum.photos/119',
      },
   },
   { timestamps: true }
)

// pre save hook to hash password
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()

   this.password = await bcrypt.hash(this.password, 12)
   return next()
})

// password verification mongoose model
userSchema.methods.isValidPassword = async function (
   candidatePassword: string,
   userPassword: string
): Promise<boolean> {
   return await bcrypt.compare(candidatePassword, userPassword)
}

// creating and exporting user model
const User = model<typeUser, UserModel>('User', userSchema)
export default User
