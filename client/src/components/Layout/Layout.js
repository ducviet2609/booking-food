import React from 'react'
import Routes from '../../routes/Router'
import Cart from '../Cart/Cart'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import { useSelector } from 'react-redux'

const Layout = () => {
  const user = {
    isAdmin: true,
  }
  const showCart = useSelector((state) => state.cartUi.cartIsVisible)

  return (
    <div>
      <Header />

      {showCart && <Cart />}

      <div>
        <Routes />
      </div>

      <Footer />
    </div>
  )
}
export default Layout
