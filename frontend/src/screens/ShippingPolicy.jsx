import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Footer from '../components/Footer';
import '../assets/styles/screens/shippingpolicyscreen.css';

const ShippingPolicy = () => {
  return (
    <>
    <Container className='shippingPolicy-container'>
        <Row className='page-title'>
          <h1>SHIPPING POLICY</h1>
        </Row>

        <div className='shipping-content-wrapper'>
        All orders will be processed and shipped out within 1 working business 
        day with UPS ground shipping for 3-5 day arrival.
        </div>
    </Container>
    <Footer/>
    </>
  )
}

export default ShippingPolicy