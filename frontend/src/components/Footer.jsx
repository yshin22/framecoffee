import React from 'react'
import '../assets/styles/footer.css'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
        <footer>
            <Container>
                <Row className='py-4 px-3'>
                    <Col className='contact-us'>
                        <h1>CONTACT US <h4>(571) 340-3851</h4></h1>
                        <h2>Locations</h2>
                        <h3>302 Maple Ave W, Vienna VA 22180</h3>
                        <h2>Hours</h2>
                        <h3>M - F 7 - 5 | S - S 8 - 5</h3>

                        
                    </Col>
                    <Col className="text-center py-3">

                        <p>Frame &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
  )
}

export default Footer