import HomePage from './pages/HomePage'

import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css'
import NotFound from './pages/404'


function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    axios.get('/api/cart-items')
      .then((response) => {
        setCart(response.data);
      })
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
