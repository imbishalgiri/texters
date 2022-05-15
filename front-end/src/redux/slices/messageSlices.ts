import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the login slice state
export type TypeMessage = {
   message: { _id: string; message: string; sender: any; chat: string }[]
}
// Define the initial state using above type
const initialState: TypeMessage = {
   message: [
      {
         _id: '',
         message: '',
         sender: {},
         chat: '',
      },
   ],
}

export const chatSlice = createSlice({
   name: 'chat',
   // `createSlice` will infer the state type from the `initialState` argument
   initialState,
   reducers: {
      addMessage: (state: TypeMessage, action: PayloadAction<TypeMessage>) => {
         state.message = action.payload.message
      },
   },
})

export const { addMessage } = chatSlice.actions

export default chatSlice.reducer
