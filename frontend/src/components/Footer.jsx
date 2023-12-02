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
                <div className='frame-logo-container'>
                    <div className='frame-logo mx-auto py-3 px-3'>
                        <img src={logo} alt="frame logo"/>
                    </div>
                    {/* <Row className='text-center'>
                        <p>Frame &copy; {currentYear}</p>                     
                    </Row> */}
                </div>
                <div className='policy-container'>
                    <div className='policy-item'>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Privacy Policy
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                    <div className='policy-item'>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Refund Policy
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                    <div className='policy-item'>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Terms of Service
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                    <div className='policy-item'>
                        <LinkContainer to='/privacypolicy'>
                            <Nav.Link> 
                                Shipping Policy
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                </div> 
                
            </Container>
    </footer>
  )
}

export default Footer