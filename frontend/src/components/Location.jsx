import React from 'react';
import '../assets/styles/location.css';
import inside from '../assets/images/store_inside.jpg';
import store from '../assets/images/store_front.jpg';
import { Row, Col, Container } from 'react-bootstrap';

const Location = () => {
  return (
    <Container className='location-container'>
        <Row className='location-title'>
            <h1>COME VISIT US</h1>
        </Row>

        <Row>
            <Col className='map-container'>
                <img src={store} alt="store front" />
                {/* <div style={{width: "100%"}}><iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=302%20Maple%20Ave%20W,%20Vienna%20VA%2022180+(Frame%20Coffee%20Roasters)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                <a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div> */}
            </Col>

            <Col className='address-container'>
                <h2>
                    302 MAPLE AVE W, VIENNA, VA 22180
                </h2>
            </Col>
        </Row>

        <Row>
            <Col className='storeHours-container'>
                <h3>M - F | 7 - 5</h3>
                <h3>S - S | 8 - 5</h3>
            </Col>

            <Col className='map-container'>
                <img src={inside} alt="store inside" />
            </Col>
        </Row>
    </Container>
  )
}

export default Location