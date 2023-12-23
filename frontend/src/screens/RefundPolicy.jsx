import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Footer from '../components/Footer';
import '../assets/styles/screens/refundpolicyscreen.css';



const RefundPolicy = () => {
  return (
    <>
      <Container className='refund-container'>
        <Row className='page-title'>
          <h1>REFUND POLICY</h1>
        </Row>

        <div className='refund-content-wrapper'>
          <h2>ALL SALES ARE FINAL</h2>
          {/* <br />
          <br /> */}
          To be eligible for an exchange, your item must be in the same condition that you received it, 
          unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or 
          proof of purchase.
          <br />
          <br />
          You can always contact us with any questions at mainframe@framecoffee.net.
          <br />
          <br />
          <strong>Damages and issues</strong>
          <br />
          Please inspect your order upon reception and contact us immediately if the item is defective, 
          damaged or if you receive the wrong item so that we can evaluate the issue and make it right.
          <br />
          <br />
          <strong>Exceptions/ non-returnable items</strong>
          <br />
          Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), 
          custom products (such as special orders or personalized items), and personal care goods (such as beauty 
          products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please 
          get in touch if you have questions or concerns about your specific item.
          <br />
          <br />
          Unfortunately, we cannot accept returns on sale items or gift cards.
          <br />
          <br />
          <strong>Exchanges</strong>
          <br />
          The fastest way to ensure you get what you want is to return the item you have, and once the return is 
          accepted, make a separate purchase for the new item.

        </div>
        
      </Container>
      <Footer/>
    </>
  )
}

export default RefundPolicy