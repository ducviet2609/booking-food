import React from 'react'
import {useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet.js'
import {Container, Row, Col} from 'reactstrap'
import heroImg from '../assets/image/hero.png'
import {Link} from 'react-router-dom'


import '../pages/page-style/Home.css'
import '../components/Helmet/Helmet.css'

import Category from '../components/Category/Category.jsx'
import products from '../assets/data/products.js'
import ProductCard from '../components/product-card/ProductCard.jsx'

import productCategoryImg01 from '../assets/image/hamburger.png'
import productCategoryImg02 from '../assets/image/pizza.png'
import productCategoryImg03 from '../assets/image/bread.png'

const Home = () => {

  const [category, setCategory] = useState('Tất cả')
  const [allProducts, setallProducts] = useState(products)

  useEffect(()=>{
    if(category === 'Tất cả'){
      setallProducts(products)
    }

    if(category=== 'Đồ ăn'){
      const filteredProducts = products.filter(item =>item.category=== 'Đồ ăn')
      setallProducts(filteredProducts)
    }
    if(category=== 'Bánh'){
      const filteredProducts = products.filter(item =>item.category=== 'Bánh')
      setallProducts(filteredProducts)
    }

    if(category=== 'Món chay'){
      const filteredProducts = products.filter(item =>item.category=== 'Món chay')
      setallProducts(filteredProducts)
    }

    if(category=== 'Đồ uống'){
      const filteredProducts = products.filter(item =>item.category=== 'Đồ uống')
      setallProducts(filteredProducts)
    }
  },[category])


  return (
    <Helmet title='trang-chu'>
      <section>
        <Container>
          <Row>
            <Col lg='6' md ='6'>
              <div className="hero_content">
                <h5><span>Deal Ngập Tràn </span></h5>
                <h1><span>Thỏa sức đặt món</span></h1>
              </div>
              <div className='hero_button d-flex align-items-center gap-3 '>
                <button className='footer_order_btn d-flex align-items-center justify-content-between'
                >Đặt hàng ngay</button>

                <button className='all_food_btn'><Link to='/foods' >Tất cả món</Link></button>
              </div>

              <div className='hero_service mt-5'>
                <p className='d-flex align-items-center gap-2'><span className='shipping_icon'><i class="ri-car-line"></i>Miễn phí vận chuyển đơn hàng từ 500k</span></p>

                <p className=''><span className='shipping_icon'><i class="ri-car-line"></i>Miễn phí vận chuyển đơn hàng từ 500k</span></p>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className="hero_img">
                <img src={heroImg} alt="hero__image" className='w-100' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Category/>
      </section>

      <section>
        <Container>
        <Row>
          <Col lg='12' className='text-center mt-5'> 
            <h2>Sản phẩm bán chạy</h2>
          </Col>

          <Col lg='12'>
            <div className="food__category d-flex align-items-center justify-content-center gap-5">

              <button className={`all_food_btnn ${category==='Tất cả' ? 'food_btn_active' :''}`} onClick={()=>
                setCategory('Tất cả')}>Tất cả</button>

              <button className={`d-flex align-items-center gap2 ${category==='Đồ ăn' ?'food_btn_active':''} `} onClick={()=>
                setCategory('Đồ ăn')}><img src={productCategoryImg01} alt="" />Đồ ăn</button>

              <button className={`d-flex align-items-center gap2 ${category==='Bánh' ?'food_btn_active':''} `}
              onClick={()=>
                setCategory('Bánh')} ><img src={productCategoryImg02} alt="" />Bánh</button>

              <button className={`d-flex align-items-center gap2 ${category==='Món chay' ?'food_btn_active':''} `} onClick={()=>
                setCategory('Món chay')} ><img src={productCategoryImg03} alt="" />Món chay</button>
              
              <button className={`d-flex align-items-center gap2 ${category==='Đồ uống' ?'food_btn_active':''} `} onClick={()=>
                setCategory('Đồ uống')} ><img src={productCategoryImg03} alt="" />Đồ uống</button>

            </div>
          </Col>

          { 
            allProducts.map((item)=>(
              <Col lg='3' md ='4' key={item.id} className='mt-5'>
                <ProductCard item ={item}/>
              </Col>
            ))

          }
        </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Home