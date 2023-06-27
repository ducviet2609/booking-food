import { Radio, Space, Tabs } from 'antd'
import { useState } from 'react'
import OrderMage from '../components/OrderManage/OrderMage'
import ProDuctManage from '../components/productManage/ProDuctManage'

import { getListOrder, getProduct } from '../action/ProductAction'
import { useDispatch } from 'react-redux'

const Admin = () => {
  const dispatch = useDispatch()
  const [tabPosition, setTabPosition] = useState('left')

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value)
  }

  const items = [
    {
      key: '1',
      label: `Quản lý sản phẩm`,
      children: <ProDuctManage />,
    },
    {
      key: '2',
      label: `Quản lý đơn hàng`,
      children: <OrderMage />,
    },

    // {
    //   key: '3',
    //   label: `Thống kê doanh thu`,
    //   children: <RevenueManage/>,
    // },
  ]

  const handleChangeTabs = (tabs) => {
    if (tabs === '1') {
      dispatch(
        getProduct({
          page: 1,
          size: 5,
        }),
      )
    }
    if (tabs === '2') {
      dispatch(
        getListOrder({
          page: 1,
          size: 5,
        }),
      )
    }
  }

  return (
    <>
      <h1 className="mt-5">Admin</h1>
      <Space
        className=" mb-5"
        style={{
          marginBottom: 24,
        }}
      >
        <Radio.Group
          value={tabPosition}
          onChange={changeTabPosition}
        ></Radio.Group>
      </Space>
      <Tabs
        tabPosition={tabPosition}
        items={items}
        onChange={(tabs) => handleChangeTabs(tabs)}
      />
    </>
  )
}

export default Admin
