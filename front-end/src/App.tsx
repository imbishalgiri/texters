import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from 'pages/HomePage/index'
import ChatPage from 'pages/ChatPage'

function App() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<ChatPage />} />
      </Routes>
   )
}

export default App
