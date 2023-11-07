import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateItem from "./pages/CreateItem"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import ItemDetails from "./pages/ItemDetails"
import UpdateItem from "./pages/UpdateItem"
import OutsideLayout from "./layouts/OutsideLayout"
import InsideLayout from "./layouts/InsideLayout"
import NeutralLayout from "./layouts/NeutralLayout"
import { fetchItems } from "./store/itemsSlice"
import { login } from "./store/userSlice"


function App() {
  const dispatch = useDispatch()

  // Check if user alredy logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userDetails = localStorage.getItem('userDetails')
    if (token && userDetails) {
      dispatch(login({ token, details: JSON.parse(userDetails) }))
    }
  }, [])

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<OutsideLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<InsideLayout />}>
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/update-item/:id" element={<UpdateItem />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<NeutralLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
