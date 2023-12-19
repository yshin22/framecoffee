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
                    {/* <div style={{width: "100%"}}><iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=302%20Maple%20Ave%20W,%20Vienna%20VA%2022180+(Frame%20Coffee%20Roasters)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        <a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div> */}
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