import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import DepartmentDashboard from './pages/DepartmentDashboard'
import DivisionDashboard from './pages/DivisionDashboard'
import AdminPanel from './pages/AdminPanel'
import Approvals from './pages/Approvals'
import AssignDepartment from './pages/AssignDepartment'
import AssignDivision from './pages/AssignDivision'
import Promotions from './pages/Promotions'
import Requests from './pages/Requests'

export default function App(){
  return (
    <AuthProvider>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/department" element={<ProtectedRoute><DepartmentDashboard /></ProtectedRoute>} />
          <Route path="/division" element={<ProtectedRoute><DivisionDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/approvals" element={<ProtectedRoute><Approvals /></ProtectedRoute>} />
          <Route path="/assign/department" element={<ProtectedRoute><AssignDepartment /></ProtectedRoute>} />
          <Route path="/assign/division" element={<ProtectedRoute><AssignDivision /></ProtectedRoute>} />
          <Route path="/promotions" element={<ProtectedRoute><Promotions /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
