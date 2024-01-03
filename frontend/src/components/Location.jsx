import React from 'react';
import '../assets/styles/location.css';
import inside from '../assets/images/store_inside.jpg';
import store from '../assets/images/store_front.jpg';
import { Row, Col, Container } from 'react-bootstrap';

const Location = () => {
    
  return (
    <Container className='location-container'>
        <div className='location-wrapper'>
            <Row className='location-title'>
                <h1>COME VISIT</h1>
            </Row>

            <Row className='location-row'>

                <Col className='map-container'sm={6}>
                    <img src={store} alt="store front" />
                    {/* <div style={{width: "100%"}}><iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=302%20Maple%20Ave%20W,%20Vienna%20VA%2022180+(Frame%20Coffee%20Roasters)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    <a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div> */}
                </Col>

                <Col className='address-container'>
                    <div className='location-address-title'>
                        <h2>LOCATIONS</h2>
                    </div>
                    <div className='location-address'>
                        <h3>
                            <a href="https://maps.app.goo.gl/kL6TWRwvUyfgpmCX8">
                                Vienna, VA
                            </a>
                        </h3>
                    </div>
                </Col>
             
            </Row>

            <Row className='location-row'>

                <Col className='storeHours-container' xs={{span: 12, order:'2'}} sm={{span: 6, order:'1'}}>
                    <div className='open-hours-title'>
                        <h2>OPEN HOURS</h2>
                    </div>
                    <div className='open-hours'>
                        <h3>M - F | 7 - 5</h3>
                        <h3>S - S | 8 - 5</h3>
                    </div>
                </Col>

                <Col className='map-container' xs={{span: 12, order: '1'}} sm={{span: 6, order: '2'}}>
                    <img src={inside} alt="store inside" />
                </Col>
            </Row>

        </div>
    </Container>
  )
}

export default Location