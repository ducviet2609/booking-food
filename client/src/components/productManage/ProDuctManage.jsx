import { Button, Pagination, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalAddProduct from './ModalAddProduct'
import { useDispatch, useSelector } from 'react-redux'
import { clearStateProduct, getProduct } from '../../action/ProductAction'
import Loading from '../Loading/Loading'
import ModalEditProduct from './ModalEditProduct'

const ProDuctManage = (props) => {
  const dispatch = useDispatch()
  const listProduct = useSelector((state) => state.productReducer.listProduct)
  const { isCreateProductSucces, loading } = useSelector(
    (state) => state.productReducer,
  )

  const baseRequest = {
    page: 1,
    size: 5,
  }
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [dataRequest, setDataRquest] = useState(baseRequest)
  const [itemProduct, setItemProduct] = useState({})

  useEffect(() => {
    setIsOpenModal(false)
    dispatch(clearStateProduct())
    dispatch(
      getProduct({
        ...baseRequest,
      }),
    )
  }, [isCreateProductSucces])

  useEffect(() => {
    dispatch(clearStateProduct())
    dispatch(
      getProduct({
        ...dataRequest,
      }),
    )
  }, [])

  const openModal = () => {
    setIsOpenModal(true)
  }

  const handleOpenModalEdit = (item) => {
    setItemProduct(item)
    setIsOpenModalEdit(true)
  }

  const columns = [
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
      title: 'Danh mục',
      align: 'center',

      // dataIndex: 'category',
      key: 'category',
      render: (record) => {
        if (record.category === 'food') {
          return <span>Đồ ăn</span>
        }
        if (record.category === 'drink') {
          return <span>Đồ uống</span>
        }
        if (record.category === 'orther') {
          return <span>Khác</span>
        }
        if (record.category === 'vegetarian_food') {
          return <span>Đồ chay</span>
        }
        if (record.category === 'cake') {
          return <span>Bánh</span>
        }
      },
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
              <Button
                onClick={() => {
                  handleOpenModalEdit(record)
                }}
              >
                Sửa
              </Button>
              <Button>Xóa</Button>
            </div>
          </div>
        )
      },
    },
  ]

  const handlePageChange = (page) => {
    const newDataRequest = {
      ...dataRequest,
      page,
    }
    setDataRquest(newDataRequest)
    dispatch(
      getProduct({
        ...newDataRequest,
      }),
    )
  }

  return (
    <div className="">
      <div>
        <Button type="primary" onClick={() => openModal()}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className="mt-1">
        <Table
          dataSource={listProduct && listProduct.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={dataRequest.page}
            pageSize={dataRequest.size}
            total={(listProduct && listProduct.totalElement) || 0}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
      {isOpenModal && (
        <ModalAddProduct
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      {isOpenModalEdit && (
        <ModalEditProduct
          isOpenModalEdit={isOpenModalEdit}
          setIsOpenModalEdit={setIsOpenModalEdit}
          itemProduct={itemProduct}
        />
      )}
      <Loading isLoading={loading} />
    </div>
  )
}

export default ProDuctManage
