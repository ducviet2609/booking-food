import { Radio, Space, Tabs } from 'antd';
import { useState } from 'react';
import OrderMage from '../components/OrderManage/OrderMage';
import ProDuctManage from '../components/productManage/ProDuctManage';
import RevenueManage from '../components/revenueManage/RevenueManage';


const Admin = () => {

  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  }
  const items =[
    {
        key: '1',
        label: `Quản lý sản phẩm`,
        children: <ProDuctManage/>
      },
    {
        key: '2',
        label: `Quản lý đơn hàng`,
        children: <OrderMage/>
      },

      {
        key: '3',
        label: `Thống kê doanh thu`,
        children: <RevenueManage/>,
      },
  ]
  return (
    <>
    <h1 className='mt-5'>Admin</h1>
      <Space className=' mb-5'
        style={{
          marginBottom: 24,
        }}
      >
        
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          
        </Radio.Group>
      </Space>
      <Tabs
        tabPosition={tabPosition}
        items={items}
      />
    </>
  )
}

export default Admin