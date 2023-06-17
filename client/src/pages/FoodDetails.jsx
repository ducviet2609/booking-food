import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'

import { useDispatch } from 'react-redux'
import ProductCard from '../components/product-card/ProductCard'
// import cartActions from '../store/shopping-cart/CartSlice'
import products from '../assets/data/products'
import '../pages/page-style/FoodDetails.css'

const FoodDetails = () => {
  const [tab, setTab] = useState('desc')
  const [enteredName, setEnteredName] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [reviewMsg, setReviewMsg] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()

  const product = products.find((product) => product.id === id)
  const [previewImg, setPreviewImg] = useState(product.image01)
  const { title, price, category, desc, image01 } = product

  const relatedProduct = products.filter((item) => category === item.category) // same category product

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

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(enteredName, enteredEmail, reviewMsg)
  }

  useEffect(() => {
    setPreviewImg(product.image01)
  }, [product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return (
    <Helmet title="chi-tiet-san-phan">
      <AppSection title={title} />

      <section className="mt-5">
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {' '}
                  Giá: <span>{price}đ</span>
                </p>
                <p className="category mb-5">
                  Danh mục: <span>{category}</span>
                </p>

                <button
                  // onClick={addItem}
                  className="addtoCart_btn mt-5"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === 'desc' ? 'tab__active' : ''}`}
                  onClick={() => setTab('desc')}
                >
                  Mô tả
                </h6>
                <h6
                  className={` ${tab === 'review' ? 'tab__active' : ''}`}
                  onClick={() => setTab('review')}
                >
                  Đánh giá
                </h6>
              </div>

              {tab === 'desc' ? (
                <div className="tab__content">
                  <p>{desc}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Duc Viet</p>
                    <p className="user__email">ducviet260909@gmail.com</p>
                    <p className="feedback__text">Chất lượng tốt</p>
                  </div>

                  <div className="review pt-5">
                    <p className="user__name mb-0">Duc Viet</p>
                    <p className="user__email">ducviet260909@gmail.com</p>
                    <p className="feedback__text">Chất lượng tốt</p>
                  </div>
                  <div className="review pt-5">
                    <p className="user__name mb-0">Duc Viet</p>
                    <p className="user__email">ducviet260909@gmail.com</p>
                    <p className="feedback__text">Chất lượng tốt</p>
                  </div>

                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Thêm nhận xét"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addtoCart_btn">
                      Gửi đi
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Có thể bạn thích</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default FoodDetails
