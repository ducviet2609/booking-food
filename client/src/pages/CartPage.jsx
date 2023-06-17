import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

// import { cartActions } from '../store/shopping-cart/CartSlice';
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'

import '../pages/page-style/CartPage.css'

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart && state.cart.cartItems)
  const totalAmount = useSelector(
    (state) => state.cart && state.cart.totalAmount,
  )

  return (
    <Helmet title="gio-hang">
      <AppSection title="Giỏ hàng" />
      <section className="mt-5">
        <Container>
          <Row>
            <Col lg="12">
              {cartItems && cartItems.length === 0 ? (
                <h5 className="mt-5 text-center">
                  Không có sản phẩm trong giỏ hàng
                </h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr className="tr_class">
                      <th>Sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems &&
                      cartItems.map((item) => <Tr item={item} key={item.id} />)}
                  </tbody>
                </table>
              )}

              <div className="mt-4 mb-5">
                <h6>
                  Tổng cộng:&ensp;
                  <span className="cartpage_subtotal">{totalAmount}đ</span>
                </h6>

                <div className="cartpage_btn mt-5">
                  <button className="addtoCart_btn me-4">
                    <Link to="/foods">Tiếp tục mua hàng</Link>
                  </button>
                  <button className="addtoCart_btn">
                    <Link to="/thanh-toan ">Thanh toán đơn hàng</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item
  const dispatch = useDispatch()

  // const deleteItem =()=>{
  //   dispatch(cartActions.deleteItem(id))
  // }
  return (
    <tr>
      <td className="text-center cart_page_img_box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">{price}đ</td>
      <td className="text-center">{quantity}</td>

      <td className="text-center cartpage_delete_btn">
        <i
          class="ri-delete-bin-line"
          // onClick={deleteItem}
        ></i>
      </td>
    </tr>
  )
}

export default CartPage
