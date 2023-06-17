import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { cartActions } from '../../store/shopping-cart/CartSlice'

import '../product-card/ProductCard.css'

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item

  const dispatch = useDispatch()

  // const addtoCart= () =>{
  //   dispatch(cartActions.addItem({
  //     id,
  //     title,
  //     image01,
  //     price
  //   }))
  // }

  return (
    <div className="product_item">
      <div className="product_image">
        <img src={image01} alt="product___image" className="w-50" />
      </div>
      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className="d-flex align-items-content justify-content-between ">
          <span className="product__price">{price}đ</span>
          <button
            className="addtoCart_btn"
            //  onClick={addtoCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
