import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

// import { cartActions } from '../store/shopping-cart/CartSlice';
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'

import '../pages/page-style/CartPage.css'
import { getCartByUser } from '../action/ProductAction'
import { Button, Checkbox, Table } from 'antd'

const CartPage = () => {
  const user = useSelector((state) => state.authReducer.authData)
  const { listCart } = useSelector((state) => state.productReducer)
  const cartItems = useSelector((state) => state.cart && state.cart.cartItems)
  // const totalAmount = useSelector(
  //   (state) => state.cart && state.cart.totalAmount,
  // )
  const dispatch = useDispatch()

  const [orderList, setOrderList] = useState([])
  const [totalAmount, setToTalAmount] = useState(0)
  useEffect(() => {
    if (user) {
      dispatch(getCartByUser(user.user._id))
    }
  }, [user])

  const handleChecked = (e, record) => {
    let newOrderList = orderList
    if (e.target.checked) {
      newOrderList.push(record)
      setToTalAmount(
        (prev) => prev + Number(record.price) * Number(record.number),
      )
      setOrderList(newOrderList)
    }
    if (!e.target.checked) {
      newOrderList = newOrderList.filter((item) => item.id !== record.id)
      setOrderList(newOrderList)
    }
  }

  const columns = [
    {
      title: 'Lựa chọn',
      align: 'center',
      // dataIndex: 'title',
      key: 'action',
      render: (record) => {
        return <Checkbox onChange={(e) => handleChecked(e, record)} />
      },
    },
    {
      title: 'Tên sản phẩm',
      align: 'center',
      dataIndex: 'title',
      key: 'title',
    },
    {
      align: 'center',
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      align: 'center',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Thao tác',
      align: 'center',
      // dataIndex: 'address',
      key: 'actions',
      render: (record) => {
        return (
          <div>
            <div className="d-flex justify-content-center gap-1">
              {/* <Button
                onClick={() => {
                  console.log('record', record)
                }}
              >
                Sửa
              </Button> */}
              <Button>Xóa</Button>
            </div>
          </div>
        )
      },
    },
  ]

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
                <Table
                  dataSource={(listCart && listCart.data) || []}
                  columns={columns}
                  pagination={false}
                />
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
                  {/* <Button onClick={() => console.log('orderList', orderList)}>
                    Đặt hàng
                  </Button> */}
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
