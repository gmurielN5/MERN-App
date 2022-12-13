import { useEffect, useContext } from "react"
import { Outlet, Routes, Route } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { getProfile } from "../Services/UserService"

import PrivateHomepage from "./PrivateHomepage"
import { NewArticle } from "./NewArticle"
import Profile from "./Profile"
import Settings from "./Settings"

const Dashboard = () => {
  const { store, dispatch } = useContext(AuthContext)

  useEffect(() => {
    let didCancel = false
    const fetchUser = async () => {
      await getProfile(store.user._id, dispatch, didCancel)
    }
    fetchUser()

    return () => {
      didCancel = true
    }
  }, [dispatch, store.user._id])

  return (
    <>
      <Routes>
        <Route index element={<PrivateHomepage />} />
        <Route path="/stories" element={<Profile />} />
        <Route path="/new" element={<NewArticle />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default Dashboard
