import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import AppSection from '../components/app-Section/AppSection'
import Helmet from '../components/Helmet/Helmet'

import '../pages/page-style/Checkout.css'

const Checkout = () => {

  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterAddress, setEnterAddress] = useState("");


  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30000;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      address: enterAddress,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
  };

  return (
    
    <Helmet title ='thanh-toan'>
      <AppSection title='Thanh toán đơn hàng'/>
      <section>
        <Container>
          <Row>
            <Col lg ='8' md='6' className='mt-5'>
              <h6 className='mb-4'>Địa chỉ nhận hàng</h6>
              <form   className="checkout__form" onSubmit={submitHandler}>
              <div className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Địa chỉ email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Điện thoại"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>

                <button type="submit" className="addtoCart_btn">
                  Thanh toán
                </button>
              </form>
            </Col>
            <Col lg='4' md='6'>

            </Col>

            <Col lg="4" md="6" className='mt-5'>
              <div className="checkout_bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>{shippingCost}đ</span>
                </h6>
                <div className="checkout_total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>{totalAmount}đ</span>
                  </h5>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout