import React from 'react'
import '../assets/styles/homecontact.css'
import { Container, Row, Col } from 'react-bootstrap'
import EmailPrompt from './EmailPrompt'

const HomeContact = () => {

  return (
    <>
        <Container>
            <Row>
                <Col className='contact-page' sm>
                    <h1>Contact us</h1>
                    <EmailPrompt/>
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