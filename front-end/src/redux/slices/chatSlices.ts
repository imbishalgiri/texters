import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the login slice state
type TypeChat = { chatId: string }
// Define the initial state using above type
const initialState: TypeChat = {
   chatId: '',
}

export const chatSlice = createSlice({
   name: 'chat',
   // `createSlice` will infer the state type from the `initialState` argument
   initialState,
   reducers: {
      addChat: (state: TypeChat, action: PayloadAction<TypeChat>) => {
         state.chatId = action.payload.chatId
      },
   },
})

export const { addChat } = chatSlice.actions

export default chatSlice.reducer
