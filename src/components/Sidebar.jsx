import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../store/userSlice'

function Sidebar() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <NavLink to="/">
            <i className="fa fa-home"></i>
            <span className="nav-text">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/create-item">
            <i className="fa fa-plus"></i>
            <span className="nav-text">Create Item</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            <i className="fa fa-user"></i>
            <span className="nav-text">Profile</span>
          </NavLink>
        </li>
      </ul>

      <ul className="logout">
        <li onClick={handleLogout} style={{ cursor: "pointer", color: 'red' }}>
          <a>
            <i className="fa fa-power-off"></i>
            <span className="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar