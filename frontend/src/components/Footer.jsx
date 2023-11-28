import React from 'react';
import '../assets/styles/footer.css';
import logo from '../assets/frame-logo.png';
import {Container, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav} from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
            <Container className='footer-container'>
                <Row>
                    <Col>
                        <Row className='frame-logo mx-auto py-5 px-5'>
                            <img src={logo} alt="frame logo"/>
                        </Row>
                        {/* <Row className='text-center'>
                            <p>Frame &copy; {currentYear}</p>                     
                        </Row> */}
                    </Col>
                </Row>
                <Row className='policy-container'>
                    <Col>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Privacy Policy
                            </Nav.Link>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Refund Policy
                            </Nav.Link>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Terms of Service
                            </Nav.Link>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Shipping Policy
                            </Nav.Link>
                        </LinkContainer>
                    </Col>
                </Row>
                
            </Container>
    </footer>
  )
}

export default Footer