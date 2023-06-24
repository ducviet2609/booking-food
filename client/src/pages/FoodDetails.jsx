import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'

import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/product-card/ProductCard'
// import cartActions from '../store/shopping-cart/CartSlice'
import products from '../assets/data/products'
import '../pages/page-style/FoodDetails.css'
import { Button, Input, Tabs } from 'antd'
import CardModal from '../components/CardModal/CardModal'

const FoodDetails = () => {
  const user = useSelector((state) => state.authReducer.authData)
  const { state } = useLocation()
  const navigate = useNavigate()
  const [openCardModal, setOpenCardModal] = useState(false)

  // const product = products.find((product) => product.id === id)
  // const [previewImg, setPreviewImg] = useState(product.image01)
  // const { title, price, category, desc, image01 } = product

  // const relatedProduct = products.filter((item) => category === item.category) // same category product

  console.log(state)
  // const addItem = () => {
  //   dispatch(
  //     cartActions.addItem({
  //       id,
  //       title,
  //       price,
  //       image01,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   // setPreviewImg(product.image01)
  // }, [product])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [product])

  const handleGetCategory = (category) => {
    if (category === 'food') {
      return <b>Đồ ăn</b>
    }
    if (category === 'drink') {
      return <b>Đồ uống</b>
    }
    if (category === 'orther') {
      return <b>Khác</b>
    }
    if (category === 'vegetarian_food') {
      return <b>Đồ chay</b>
    }
    if (category === 'cake') {
      return <b>Bánh</b>
    }
  }

  const handleAddCart = () => {
    if (!user) {
      navigate('/dang-nhap')
    } else {
      setOpenCardModal(true)
    }
  }

  return (
    <>
      <div className="p-2 d-flex detail-product gap-2">
        <div className="img-product">
          <img src={state && state.product.image.url} alt="" />
        </div>
        <div className="info-product">
          <h3 className="text-center">{state && state.product.title}</h3>
          <div className="d-flex flex-column gap-2">
            <span className="fw-600">
              Số lượng: <b>{state && state.product.number}</b>
            </span>
            <span>
              Giá: <b>{state && state.product.price}</b>
            </span>
            <span>
              Loại: {handleGetCategory(state && state.product.category)}
            </span>
            <span>Mô tả: </span>
            <Input.TextArea
              rows={3}
              readOnly
              value={state && state.product.description}
              className="desc-input"
            />
          </div>
          <Button className="addtoCart_btn" onClick={() => handleAddCart()}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      {openCardModal && (
        <CardModal
          openCardModal={openCardModal}
          setOpenCardModal={setOpenCardModal}
          item={state.product}
        />
      )}
    </>
  )
}

export default FoodDetails
