import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Admin from '../pages/Admin'
import CartPage from '../pages/CartPage'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import FoodDetails from '../pages/FoodDetails'
import Foods from '../pages/Foods'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useSelector } from 'react-redux'

const Router = () => {
  const user = useSelector((state) => state.authReducer.authData)
  console.log(user)
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trang-chu" />} />
      <Route path="/trang-chu" element={<Home />} />
      <Route path="/foods" element={<Foods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/dang-ky" element={<Register />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/thanh-toan" element={user ? <Checkout /> : <Login />} />
      <Route path="/lien-he" element={<Contact />} />
      <Route path="/gio-hang" element={user ? <CartPage /> : <Login />} />

      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default Router
