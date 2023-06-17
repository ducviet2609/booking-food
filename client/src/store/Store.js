import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './shopping-cart/CartSlice'
import CartUiSlice from './shopping-cart/cartUISlice'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: CartUiSlice.reducer,
  },
})
export default store
