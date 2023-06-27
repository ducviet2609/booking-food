import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'
import { Container, Row, Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

import '../pages/page-style/Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../action/AuthAction'
import Loading from '../components/Loading/Loading'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)

  const { loading, errMessage, isAuthSuccess } = useSelector(
    (state) => state.authReducer,
  )
  const navigate = useNavigate()

  const baseRequest = {
    email: '',
    password: '',
  }
  const [dataRequest, setDataRequest] = useState(baseRequest)

  useEffect(() => {
    if (user) {
      navigate('/trang-chu')
    }
  }, [user])

  const handleChange = (e) => {
    setDataRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn(dataRequest))
  }
  return (
    <Helmet>
      <AppSection />
      <section>
        <Container className="login_login">
          <Row>
            <Col lg="6" md="6" sm="12" className=" m-auto text-center">
              <form
                className="login_form mt-5 mb-5 "
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <button type="submit" className="addtoCart_btn mb-4">
                  Đăng nhập
                </button>
              </form>

              <Link className="register_button mt-2 " to="/dang-ky">
                Bạn chưa có tài khoản? Tạo ngay
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  )
}

export default Login
