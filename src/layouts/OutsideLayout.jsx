import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'

import Navbar from '../components/Navbar'


function OutsideLayout() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return (
    isAuthenticated
      ? <Navigate to="/" />
      : (
          <>
            <Navbar />
            <Container className='my-5'>
              <Outlet />
            </Container>
          </>
        )
  )
}

export default OutsideLayout
