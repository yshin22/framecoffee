import React from 'react'
import '../assets/styles/homecontact.css'
import { Container, Row, Col } from 'react-bootstrap'
import EmailPrompt from './EmailPrompt'

const HomeContact = () => {

  return (
    <>
        <Container className='homecontact-container'>
            <Row>
                <Col className='contact-page' sm>
                    <EmailPrompt/>
                </Col>
                <div className='vert-splitter'></div>
                <div className='horz-splitter'></div>
                <Col className='wholesale-page' sm>
                    <div>
                        <h1>WHOLESALE</h1>
                        <p>Interested in what we have to offer? <br/>
                        We would love to work with you!
                        </p>
                        {/* <p>Coming soon...</p> */}
                        <button className='wholesale-btn'>Coming Soon...</button>

                    </div>
                    {/* <button className='wholesale-btn'>Coming Soon...</button> */}
                </Col>
            </Row>

        </Container>
    </>
  )
}

export default HomeContact