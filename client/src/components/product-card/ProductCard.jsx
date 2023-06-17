import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { cartActions } from '../../store/shopping-cart/CartSlice'

import '../product-card/ProductCard.css'

const ProductCard = (props) => {
  const { _id, title, image, price } = props.item

  const user = useSelector((state) => state.authReducer.authData)
  const navigate = useNavigate()
  console.log('user', user)
  const dispatch = useDispatch()

  // const addtoCart= () =>{
  //   dispatch(cartActions.addItem({
  //     id,
  //     title,
  //     image01,
  //     price
  //   }))
  // }

  const handleAddCart = () => {
    if (!user) {
      navigate('/dang-nhap')
    } else {
      console.log(_id)
    }
  }

  return (
    <div className="product_item">
      <div className="product_image">
        <img src={image && image.url} alt="product___image" className="w-50" />
      </div>
      <div className="product__content">
        <h5>
          <Link to={`/foods/${_id}`}>{title}</Link>
        </h5>
        <div className="d-flex align-items-content justify-content-between ">
          <span className="product__price">{price}đ</span>
          <button className="addtoCart_btn" onClick={() => handleAddCart()}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
