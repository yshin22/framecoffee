import React from 'react'
import { useState } from 'react';
import '../assets/styles/screens/wholesalescreen.css';
import { Container, Form, Row, Col,} from 'react-bootstrap';
import Footer from '../components/Footer';

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
    const response = await fetch("http://localhost:3000/wholesale/send", {
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
  //auto scroll after pressing button
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      <Container className='wholeSale-container'>
        <Row>
          <h1>WHOLESALE</h1>
        </Row>
        <Row className='wholeSale-wrapper'>
          <Col>
            <p>Welcome to our wholesale page!</p>
          </Col>
          <Col>
            <Form onSubmit={submitEmail}>
              <Row>
                <Col>
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
                <Col>
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
                <Col>
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
              <button className='contact-btn' type="submit" onClick={topFunction()}>Submit</button>
            </Form>
          
          </Col>
        </Row>      
      </Container>
      <Footer/>
    </>
    
  )
}

export default WholesaleScreen