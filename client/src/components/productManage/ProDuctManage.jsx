import { Button, Table } from 'antd';
import React from 'react'

const ProDuctManage = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      price: 32,

      address: '10 Downing Street',
    },

  ];
  
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'Tên sản phẩm',
      key: 'product_name',
    },
    {
      title: 'Giá',
      dataIndex: 'age',
      key: 'product_price',
    },
    {
      title: 'Giá',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Giá',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Thao tác',
      // dataIndex: 'address',
      key: 'actions',
      render: (record) => {
        return (

          <div>
            <div>
              
            <Button onClick={()=> {console.log('record', record)}}>Sửa</Button>
            <Button>Xóa</Button>

            </div>
          </div>
        )
      }
    },
  ];
  
  return (
    <div className=''>
      <div>
        <button className='addtoCart_btn'>Thêm sản phẩm</button>
      </div>
      <div>
      <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  )
}

export default ProDuctManage