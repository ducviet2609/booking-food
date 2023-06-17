import React from 'react'
import { ListGroupItem } from 'reactstrap'
// import productImg from '../../assets/image/product_01.1.jpg'

import { useDispatch } from 'react-redux'
// import { cartActions } from '../../store/shopping-cart/CartSlice'

import '../Cart/CartItem.css'
const CartItem = ({ item }) => {
  const { id, title, price, image01, quantity, totalPrice } = item

  const dispatch = useDispatch()

  // const increaseItem =()=>{
  //     dispatch(cartActions.addItem(
  //         {
  //             id,
  //             title,
  //             price,
  //             image01,
  //         }
  //     ))
  // }

  // const decreaseItem =()=>{
  //     dispatch(cartActions.removeItem(id))
  // }

  // const deleteItem =()=>{
  //     dispatch(cartActions.deleteItem(id))
  // }
  return (
    <ListGroupItem className="cart__item boder-0">
      <div className="cart_item_info d-flex gap-2">
        <img src={image01} alt="product_item" />
        <div className="cart_product_info d-flex align-items-center justify-content-between gap-4 w-100">
          <div>
            <h6 className="cart_product_title">{title}</h6>

            <p className="cart_product_price d-flex align-items-center gap-5">
              {quantity} x <span>{totalPrice}</span>
            </p>

            <div className="change_product_btn d-flex align-items-center justify-content-between gap-3">
              <span
                className="decrease_btn"
                //   onClick={decreaseItem}
              >
                <i class="ri-subtract-line"></i>
              </span>

              <span className="cart_quantity">{quantity}</span>

              <span
                className="increase_btn"
                //   onClick={increaseItem}
              >
                <i class="ri-add-fill"></i>
              </span>
            </div>
          </div>

          <span
            className="product_delete_btn"
            //   onClick={deleteItem}
          >
            {' '}
            <i class="ri-close-fill"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  )
}

export default CartItem
