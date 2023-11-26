import React from 'react'
import '../assets/styles/homecontact.css'
import { Container, Row, Col } from 'react-bootstrap'

const HomeContact = () => {
  return (
    <>
        <Container>
            <Row>
                <Col className='contact-page' sm>
                    <h1>Contact us</h1>
                </Col>

                <Col className='wholesale-page' sm>
                    <h1>Wholesale</h1>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default HomeContact