import React from "react"
import { Navigate, useLocation, Outlet } from "react-router-dom"

const ProtectedRoute = ({ children, isAuthenticated }) => {
  let location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
