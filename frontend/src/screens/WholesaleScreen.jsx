import React from 'react'
import '../assets/styles/screens/wholesalescreen.css';
import { Container, Form, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';

const WholesaleScreen = () => {
  return (
    <>
      <Container className='wholeSale-container'>
        <Row>
          <Col>
            <p>Welcome to our wholesale page!</p>
          </Col>
          <Col>
            <Form>
              <Form.Group>
                <Form.Control
                  placeholder='Business Name'
                  // onChange={handleStateChange}
                  name='business_name'
                  // value={mailerState.name}
                  required
                >
          
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder='Type of Business'
                  // onChange={handleStateChange}
                  name='tob'
                  // value={mailerState.name}
                  required
                >
          
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder='Email'
                  // onChange={handleStateChange}
                  name='email'
                  // value={mailerState.name}
                  required
                >
          
                </Form.Control>
              </Form.Group>
            </Form>
          
          </Col>
        </Row>      
      </Container>
      <Footer/>
    </>
    
  )
}

export default WholesaleScreen