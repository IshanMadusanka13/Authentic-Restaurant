import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Payment from './pages/Payment/Payment'
import AdminDashboard from './pages/Admin/AdminDashboard'
import MyOrders from './components/MyOrders/MyOrders'
import Help from '../src/Context/Help'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/payment' element={<Payment />} />

          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/help' element={<Help />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

