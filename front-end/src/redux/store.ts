import { configureStore } from '@reduxjs/toolkit'
import auth from 'redux/slices/authSlices'
import chat from 'redux/slices/chatSlices'
// ...

export const store = configureStore({
   reducer: {
      auth,
      chat,
   },
})

//exporting store as default export
export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
