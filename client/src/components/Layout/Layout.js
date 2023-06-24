import React from 'react'
import Routes from '../../routes/Router'
import Cart from '../Cart/Cart'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'

const Layout = () => {
  const user = useSelector((state) => state.authReducer.authData)
  const showCart = useSelector(
    (state) => state.cartUi && state.cartUi.cartIsVisible,
  )
  // console.log(user)
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
