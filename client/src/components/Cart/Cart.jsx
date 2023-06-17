import React from 'react'
import {Link} from 'react-router-dom'
import { ListGroup } from 'reactstrap'
import CartItem from './CartItem'

import {cartUiActions} from '../../store/shopping-cart/cartUISlice'
import { useDispatch, useSelector} from 'react-redux'


import '../Cart/Cart.css'
// import products from '../../assets/data/products'
  
  const Cart = () => {

  const dispatch=useDispatch();
  
  const toggleCart =()=>
  {
    dispatch(cartUiActions.toggle())
  }

  const cartProducts = useSelector(state=>state.cart.cartItems)

  const totalAmount = useSelector(state=>state.cart.totalAmount )
  return (
    <div className="cart_container">
        <ListGroup className='list_group_cart'>
            <div className="close_cart" onClick={toggleCart}>
                <span><i class="ri-close-fill"></i></span>
            </div>

            <div className='cart_item_list'>
                {
                    cartProducts.length === 0 ? <h6 className='text-center mt-2'>Không có sản phẩm trong giỏ hàng</h6> : cartProducts.map((item,index)=>
                    (  <CartItem item={item} key ={index}/>)
                    ) 
                }
            </div>

            <div className="cart_bottom d-flex align-items-center justify-content-between">
                <h6>Tổng: <span>{totalAmount}đ</span></h6>
                <button><Link to='/thanh-toan'>Thanh toán</Link></button>
            </div>
        </ListGroup>
    </div>
  )
}

export default Cart