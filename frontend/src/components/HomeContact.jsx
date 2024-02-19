import React from 'react'
import '../assets/styles/homecontact.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EmailPrompt from './EmailPrompt'

const HomeContact = () => {

  return (
    <>
        <Container className='contact-wrapper'>
            <Row className='contact-container'>
                <Col className='contact-page' sm={true}>
                    <EmailPrompt/>
                </Col>
                <div className='vert-splitter'></div>
                <div className='horz-splitter'></div>
                <Col className='wholesale-page' sm={true}>
                    <div>
                        <h1>WHOLESALE</h1>
                        <p>Interested in what we have to offer? <br/>
                        We would love to work with you!
                        </p>
                        {/* <p>Coming soon...</p> */}
                        <Link className='wholesale-btn' to='/wholesale'>Click Here</Link>
                    </div>
                    {/* <button className='wholesale-btn'>Coming Soon...</button> */}
                </Col>
            </Row>
        

        </Container>
    </>
  )
}

export default HomeContact