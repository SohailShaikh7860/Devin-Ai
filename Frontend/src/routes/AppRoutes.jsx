import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import AuthMid from '../Auth/AuthMid'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthMid><Home /></AuthMid>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/:projectId" element={<AuthMid><Project /></AuthMid>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
