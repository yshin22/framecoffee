import React from 'react';
import '../assets/styles/footer.css';
import logo from '../assets/frame-logo.png';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
        <footer>
            <Container>
                <Row>
                    <Col>
                        <Row className='pt-3 px-3'>
                            <Col className='contact-us'>
                                <h1>CONTACT US</h1>
                                <h3>(571) 340-3851</h3>
                        
                            </Col>
                        </Row>
                        <Row className='px-3'>
                            <Col className='locations'>
                                <h2>Locations</h2>
                                <h3>302 Maple Ave W, Vienna VA 22180</h3>
                            </Col>
                        </Row>
                        <Row className='px-3'>
                            <Col className='hours'>
                                <h2>Hours</h2>
                                <h3>M - F 7 - 5 | S - S 8 - 5</h3>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='pt-5'>
                        <Row className='frame-logo mx-auto py-5 px-5'>
                            <img src={logo} alt="frame logo"/>
                        </Row>
                        <Row className='text-center'>
                            <p>Frame &copy; {currentYear}</p>                     
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        </footer>
    </>
  )
}

export default Footer