import React, { createContext, useState, useEffect, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { IsAuthenticated } from "../Services/AuthService"
import { dataFetchReducer } from "../Reducers/reducer"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const initialState = {
    Loading: false,
    isError: null,
    user: null,
    users: [],
    articles: [],
    topics: [],
    message: [],
  }

  const [store, dispatch] = useReducer(dataFetchReducer, initialState)

  useEffect(() => {
    let didCancel = false
    const getStatus = async () => {
      await IsAuthenticated(dispatch, didCancel).then((response) => {
        setIsAuthenticated(response.data.isAuthenticated)
        navigate("/dashboard")
      })
    }
    getStatus()
    return () => {
      didCancel = true
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        dispatch,
        store,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
