import jwt from 'jwt-decode'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from 'pages/HomePage/index'
import ChatPage from 'pages/ChatPage'
import { useAppDispatch } from 'redux/hooks'
import { login } from 'redux/slices/authSlices'

function App() {
   // this is a main part to keep user data persistent all over the app
   // if we want some data never go away when app is refreshed..
   // right place to do that is here
   const token = localStorage.getItem('chatAppToken')
   const dispatch = useAppDispatch()
   if (token) {
      const decoded = jwt<{
         user: { name: string; email: string; _id: string; avatar: string }
      }>(token)
      dispatch(
         login({
            user: {
               isLoggedIn: true,
               name: decoded?.user?.name,
               email: decoded?.user?.email,
               id: decoded?.user?._id,
               avatar: decoded.user?.avatar,
            },
         })
      )
   }
   // ---------------------------------------------------
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
   )
}

export default App
