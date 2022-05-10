import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'

// Define a type for the login slice state
interface AuthState {
   user: {
      name: string
      email: string
      isLoggedIn: boolean
      avatar: string
      id: string
   }
}

// Define the initial state using above type
const initialState: AuthState = {
   user: { isLoggedIn: false, name: '', email: '', avatar: '', id: '' },
}

export const loginSlice = createSlice({
   name: 'auth',
   // `createSlice` will infer the state type from the `initialState` argument
   initialState,
   reducers: {
      login: (state, action: PayloadAction<AuthState>) => {
         state.user = action.payload.user
      },
      logout: (state) => {
         localStorage.removeItem('chatAppToken')
         state.user = {
            isLoggedIn: false,
            name: '',
            email: '',
            avatar: '',
            id: '',
         }
      },
   },
})

export const { login, logout } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth

export default loginSlice.reducer
