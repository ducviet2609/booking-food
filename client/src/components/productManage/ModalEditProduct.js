import { Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStateProduct, updateProduct } from '../../action/ProductAction'

const ModalEditProduct = (props) => {
  const { isOpenModalEdit, setIsOpenModalEdit, itemProduct } = props

  const dispatch = useDispatch()
  // const loading = useSelector((state) => state.productReducer.loading)
  const { isUpdateProductSucces } = useSelector((state) => state.productReducer)

  const [dataRequest, setDataRquest] = useState({
    productId: itemProduct._id,
    title: itemProduct.title || '',
    // image: itemProduct.image || null,
    description: itemProduct.description || '',
    price: itemProduct.price || '',
    number: itemProduct.number || 0,
    category: itemProduct.category || 'food',
  })

  useEffect(() => {
    if (isUpdateProductSucces) {
      handleCancel()
      dispatch(clearStateProduct())
    }
  }, [isUpdateProductSucces])

  const handleCancel = () => {
    setIsOpenModalEdit(false)
  }
  //   // hàm bắt giá trị khi chọn ảnh
  //   const handleUploadImg = (e) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(e.target.files[0])
  //     reader.onloadend = () => {
  //       setDataRquest({ ...dataRequest, image: reader.result })
  //     }
  //   }

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
    dispatch(updateProduct(dataRequest))
  }

  return (
    <Modal
      open={isOpenModalEdit}
      onCancel={() => handleCancel()}
      title="Thêm sản phẩm"
      okText="Thêm"
      cancelText="Hủy"
      onOk={() => handleCreateProduct()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Input
          name="title"
          value={dataRequest.title}
          placeholder="Nhập tên sản phẩm"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        {/* <Input type="file" onChange={(e) => handleUploadImg(e)} /> */}
        <Input.TextArea
          value={dataRequest.description}
          name="description"
          placeholder="Mô tả...."
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="price"
          value={dataRequest.price}
          placeholder="Nhập giá"
          type="number"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="number"
          value={dataRequest.number}
          type="number"
          placeholder="Số lượng"
          onChange={(e) => handleChange(e)}
        />
        <Select
          defaultValue="food"
          value={dataRequest.category}
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

export default ModalEditProduct
