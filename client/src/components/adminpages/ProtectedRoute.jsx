import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()

    // If not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If trying to access /admin but not a recruiter, redirect
    if (location.pathname.startsWith("/admin") && user.role !== "recruiter") {
        return <Navigate to="/jobs" replace />
    }

    // Authorized
    return children
}

export default ProtectedRoute
