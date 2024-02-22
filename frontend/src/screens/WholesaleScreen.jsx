import React from 'react'
import { useState } from 'react';
import '../assets/styles/screens/wholesalescreen.css';
import { Container, Form, Row, Col,} from 'react-bootstrap';
import Footer from '../components/Footer';
import roaster from '../assets/images/roaster.jpg'

const WholesaleScreen = () => {

  const [mailerState, setMailerState] = useState({
    businessName: "",
    typeOfBusiness: "",
    email: "",
    phone: "",
    qty: 0,
    message: "",
    social: "",
  });

  function handleStateChange(e) {

    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });
    console.log(JSON.stringify({mailerState}));

    // Change URL in "fetch('URL')" to below when LIVE and not DEV
    // https://framecoffeeroasters.onrender.com/wholesale/send
    const response = await fetch("https://framecoffeeroasters.onrender.com/wholesale/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message sent successfully!\n\nWe will get back to you as soon as possible");
          console.log(resData.message);
        } else if (resData.status === "fail") {
          alert("Failed to send message: Something went wrong on our end...\n\nPlease shoot us a message to: mainframe@framecoffee.net");
        }
      })
      .then(() => {
        setMailerState({
          businessName: "",
          typeOfBusiness: "",
          email: "",
          phone: "",
          qty: 0,
          message: "",
          social: "",
        });
      });
  };

  return (
    <>
      <Container className='wholeSale-container'>
        <Row className='page-title'>
          <h1>WHOLESALE</h1>
        </Row>
        <Row className='wholeSale-wrapper'>
            <Row className='wholeSale-desc m-4'>
              <Col xs={12} lg={6} className='wholeSale-img mb-xs-4'>
                <img src={roaster} alt="frame roasted beans" />
              </Col>
              <Col className='wholeSale-text m-4'>
                <p className='wholeSale-welcome'>Welcome to our wholesale page!</p>
                <p>We are always looking to partner with people who share our values and taste for great coffee.</p>
                <p>Please fill out the wholesale information below and we'll get back to you shortly. Thanks, we look forward to working with you soon!</p>
              </Col>  
            </Row>
            <Row className='wholeSale-form m-4'>            
              <Form onSubmit={submitEmail}>
                <Row >
                  <Col md={6}>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                      <Form.Control
                        placeholder='Business Name'
                        onChange={handleStateChange}
                        name='businessName'
                        value={mailerState.businessName}
                        required
                      >
                    </Form.Control>
                  </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Type of Business</Form.Label>
                      <Form.Control
                        placeholder='Type of Business'
                        onChange={handleStateChange}
                        name='typeOfBusiness'
                        value={mailerState.typeOfBusiness}
                        required
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        placeholder='Email'
                        onChange={handleStateChange}
                        name='email'
                        value={mailerState.email}
                        required
                      >
                      </Form.Control>
                    </Form.Group>              
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        placeholder='Phone'
                        onChange={handleStateChange}
                        name='phone'
                        value={mailerState.phone}
                        required
                      >
                      </Form.Control>
                    </Form.Group>               
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Quantity | lbs/ month</Form.Label>               
                      <Form.Control
                        placeholder='Quantity'
                        onChange={handleStateChange}
                        name='qty'
                        type='number'
                        value={mailerState.qty}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Website/ Socials</Form.Label>
                      <Form.Control
                        placeholder='Website/ Socials'
                        onChange={handleStateChange}
                        name='social'
                        value={mailerState.social}
                      >
                      </Form.Control>
                    </Form.Group>               
                  </Col>
                </Row>             
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicTextArea">
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3}
                        onChange={handleStateChange}
                        name='message'
                        placeholder='Message'
                        value={mailerState.message}
                        required
                      />
                    </Form.Group>              
                  </Col>               
                </Row>
                <button className='contact-btn' type="submit">Submit</button>
              </Form>
            </Row>     
        </Row>      
      </Container>
      <Footer/>
    </>
    
  )
}

export default WholesaleScreen