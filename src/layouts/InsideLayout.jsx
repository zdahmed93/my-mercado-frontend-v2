import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container } from "react-bootstrap"

import Sidebar from "../components/Sidebar"


function InsideLayout() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return (
    isAuthenticated
      ? (
          <>
            <Sidebar />
            <Container className="my-5">
              <Outlet />
            </Container>
          </>
        )
      : <Navigate to="/login" />
  )
}

export default InsideLayout
