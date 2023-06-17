import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import Helmet from '../components/Helmet/Helmet.js'
import AppSection from '../components/app-Section/AppSection'

import products from '../assets/data/products'
import ProductCard from '../components/product-card/ProductCard'

import '../pages/page-style/Foods.css'
import '../pages/page-style/paginate.css'
import { getProduct } from '../action/ProductAction.js'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading/Loading.js'

const Foods = () => {
  const dispatch = useDispatch()
  const listProduct = useSelector((state) => state.productReducer.listProduct)
  const { loading } = useSelector((state) => state.productReducer)

  const baseRequest = {
    title: '',
    page: 1,
    size: 8,
  }
  const [searchItem, setsearchItem] = useState('')
  const [dataRequest, setDataRquest] = useState(baseRequest)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(
      getProduct({
        ...dataRequest,
      }),
    )
  }, [])

  // const searchedProduct = products.filter((item) => {
  //   if (searchItem.value === '') {
  //     return item
  //   }
  //   if (item.title.toLowerCase().includes(searchItem.toLowerCase())) {
  //     return item
  //   } else {
  //     return console.log('not found')
  //   }
  // })

  // const productPerPage = 8
  // const visitedPage = pageNumber * productPerPage
  // const displayPage = searchedProduct.slice(
  //   visitedPage,
  //   visitedPage + productPerPage,
  // )

  // const pageCount = Math.ceil(searchedProduct.length / productPerPage)

  const handleSearch = () => {
    const newDataRequest = {
      ...dataRequest,
      title: searchItem,
    }
    dispatch(
      getProduct({
        ...newDataRequest,
      }),
    )
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (
    <Helmet title="san-pham">
      <AppSection title="Tất cả sản phẩm" />

      <section className="mt-5">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search_widget d-flex align-items-center justify-content-between w-50">
                <input
                  type="text"
                  placeholder="Nhập món cần tìm"
                  value={searchItem}
                  onChange={(e) => setsearchItem(e.target.value)}
                />

                <span onClick={() => handleSearch()}>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" className="mb-5">
              <div className="sorting_widget text-end">
                <select className="w-50">
                  <option>Sắp xếp theo: Mặc định</option>
                  <option value="ascending">Sắp xếp theo: A-Z</option>
                  <option value="disascending">Sắp xếp theo: Z-A</option>
                  <option value="high-price">Sắp xếp theo: Giá cao</option>
                  <option value="low-price">Sắp xếp theo: Giá thấp</option>
                </select>
              </div>
            </Col>

            {listProduct &&
              listProduct.data.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))}

            <div className="panigation-icon"></div>
          </Row>
        </Container>
      </section>
      <Loading isLoading={loading} />
    </Helmet>
  )
}

export default Foods
