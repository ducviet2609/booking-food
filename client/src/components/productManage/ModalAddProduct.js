import React, { useState } from 'react'
import { Modal, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../action/ProductAction'

const ModalAddProduct = (props) => {
  const { isOpenModal, setIsOpenModal } = props
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.productReducer.loading)

  const [dataRequest, setDataRquest] = useState({
    title: '',
    image: null,
    description: '',
    price: '',
    number: 0,
    category: 'food',
  })

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  // hàm bắt giá trị khi chọn ảnh
  const handleUploadImg = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setDataRquest({ ...dataRequest, image: reader.result })
    }
  }

  // hàm bắt giá trị khi chọn select
  const handleChangeSelect = (value) => {
    console.log(value)
    const newDataRequest = {
      ...dataRequest,
      category: value,
    }
    setDataRquest(newDataRequest)
  }

  // hàm bắt giá trị khi nhập input text
  const handleChange = (e) => {
    const newDataRequest = {
      ...dataRequest,
      [e.target.name]: e.target.value,
    }
    setDataRquest(newDataRequest)
  }

  // hàm call api tạo sản phẩm
  const handleCreateProduct = () => {
    dispatch(createProduct(dataRequest))
  }

  return (
    <Modal
      open={isOpenModal}
      onCancel={() => handleCancel()}
      title="Thêm sản phẩm"
      okText="Thêm"
      cancelText="Hủy"
      onOk={() => handleCreateProduct()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Input
          name="title"
          placeholder="Nhập tên sản phẩm"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <Input type="file" onChange={(e) => handleUploadImg(e)} />
        <Input.TextArea
          name="description"
          placeholder="Mô tả...."
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="price"
          placeholder="Nhập giá"
          type="number"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="number"
          type="number"
          placeholder="Số lượng"
          onChange={(e) => handleChange(e)}
        />
        <Select
          defaultValue="food"
          //   style={{
          //     width: 120,
          //   }}
          //   onChange={handleChange}
          onChange={(value) => handleChangeSelect(value)}
          options={[
            {
              value: 'food',
              label: 'Đồ ăn',
            },
            {
              value: 'drink',
              label: 'Đồ uống',
            },
            {
              value: 'vegetarian_food',
              label: 'Món chay',
            },
            {
              value: 'cake',
              label: 'Bánh',
            },
            {
              value: 'orther',
              label: 'Khác',
            },
          ]}
        />
      </div>
    </Modal>
  )
}

export default ModalAddProduct
