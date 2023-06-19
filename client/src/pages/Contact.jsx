import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import AppSection from '../components/app-Section/AppSection'
import { Container } from 'reactstrap'
const Contact = () => {
  return (
    <Helmet title="lien-he">
      <AppSection />
      <Container>
        <div className="mt-3">
          <h2>Đặt đồ ăn trực tuyến </h2>
          <span>Chúng tôi chuyên </span>
        </div>
      </Container>
    </Helmet>
  )
}

export default Contact
