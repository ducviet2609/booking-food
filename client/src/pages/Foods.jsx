import React from 'react'
import {useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import Helmet from '../components/Helmet/Helmet.js'
import AppSection from '../components/app-Section/AppSection'

import products from '../assets/data/products'
import ProductCard from '../components/product-card/ProductCard'

import '../pages/page-style/Foods.css'
import '../pages/page-style/paginate.css'

const Foods = () => {

  const [searchItem, setsearchItem] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const searchedProduct = products.filter((item) => {
    if (searchItem.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchItem.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };  
  return (
    <Helmet title = 'san-pham'>
      <AppSection title='Tất cả sản phẩm' />

      <section className='mt-5'>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search_widget d-flex align-items-center justify-content-between w-50">
                <input type="text" placeholder='Nhập món cần tìm'
                 value={searchItem}
                 onChange={(e) => setsearchItem(e.target.value)}
                />

                <span><i class="ri-search-line"></i></span>
              </div>
            </Col>

            <Col lg='6' md ='6' className='mb-5'>
              <div className="sorting_widget text-end">
                <select className='w-50'>
                  <option>Sắp xếp theo: Mặc định</option>
                  <option value="ascending">Sắp xếp theo: A-Z</option>
                  <option value="disascending">Sắp xếp theo: Z-A</option>
                  <option value="high-price">Sắp xếp theo: Giá cao</option>
                  <option value="low-price">Sắp xếp theo: Giá thấp</option>
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div className='panigation-icon'>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"<"}
                nextLabel={">"}
                containerClassName=" paginationBttns "
              />
            </div>

          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Foods