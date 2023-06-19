import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input } from 'antd'
import './CardModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, clearStateProduct } from '../../action/ProductAction'
const CardModal = (props) => {
  const { item, openCardModal, setOpenCardModal } = props
  const user = useSelector((state) => state.authReducer.authData)

  const { isAddToCartSuccess } = useSelector((state) => state.productReducer)
  const dispatch = useDispatch()

  const [numberProduct, setNumberProduct] = useState(1)
  const handleClose = () => {
    setOpenCardModal(false)
  }

  console.log('isAddToCartSuccess', isAddToCartSuccess)
  useEffect(() => {
    if (isAddToCartSuccess) {
      setOpenCardModal(false)
    }
  }, [isAddToCartSuccess])

  const handleChangeNumber = (type) => {
    if (type === 'subtraction') {
      if (numberProduct > 1) {
        return setNumberProduct((prev) => prev - 1)
      }
      return setNumberProduct(1)
    }
    if (type === 'plus') {
      if (numberProduct < item.number) {
        return setNumberProduct((prev) => prev + 1)
      }
      return setNumberProduct(item.number)
    }
  }

  const handleAddtoCart = () => {
    const newDataRequest = {
      title: item.title,
      productId: item._id,
      userId: user.user._id,
      number: numberProduct,
      price: item.price,
    }
    dispatch(addProductToCart(newDataRequest))
  }

  return (
    <Drawer
      title="Thêm vào giỏ hàng"
      width={520}
      onClose={() => handleClose()}
      open={openCardModal}
    >
      <div className="d-flex flex-column h-100">
        <div className="card-icon d-flex flex-column justify-content-center">
          <div className="card-image d-flex justify-content-center">
            <img src={item.image.url} alt="" />
          </div>
          <strong className="d-flex justify-content-center mt-1 ">
            {item.title}
          </strong>
          <div className="d-flex justify-content-around mt-3">
            <span className="fw-600">
              Giá tiền: <b>{item.price}đ</b>
            </span>
            <span>
              Số lượng trong kho: <b>{item.number}</b>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
          <Button onClick={() => handleChangeNumber('subtraction')}>-</Button>
          {/* <Input
            type="number"
            value={numberProduct}
            min={1}
            max={item.number}
          /> */}
          <strong className="mr-2 ml-2">{numberProduct}</strong>
          <Button onClick={() => handleChangeNumber('plus')}>+</Button>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-auto">
          <Button onClick={() => handleClose()} type="primary" danger>
            Huỷ
          </Button>
          <Button type="primary" onClick={() => handleAddtoCart()}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CardModal
