import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

import'../pages/page-style/Login.css'
const Login = () => {

  const loginEmailRef = useRef()
  const loginPWRef = useRef()
  const submithandler = e=>{
    e.preventDefault()
  }
  return (
    <Helmet>
      <AppSection/>
      <section>
        <Container className='login_login'>
          <Row>
            <Col lg='6' md='6' sm='12' className=' m-auto text-center'>
              <form className="login_form mt-5 mb-5 ">
                <div className="form__group">
                  <input type="text" placeholder='Email' required ref={loginEmailRef} onSubmit={submithandler} />
                </div>
                <div className="form__group">
                  <input type="password" placeholder='Password' required ref={loginPWRef} onSubmit={submithandler}/>
                </div>
                <button type='submit' className='addtoCart_btn mb-4'>
                  Đăng nhập
                </button>
              </form>

              <Link className='register_button mt-2 ' to='/dang-ky'>
                Bạn chưa có tài khoản? Tạo ngay
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login