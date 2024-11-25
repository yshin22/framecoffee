import React from 'react';
import '../assets/styles/location.css';
import inside from '../assets/images/store_inside.webp';
import store from '../assets/images/store_front.webp';
import { Row, Col, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Location = () => {
    
  return (
    <Container className='location-container'>
        <div className='location-wrapper'>
            <Row className='location-title'>
                <h1>COME VISIT</h1>
            </Row>

            <Row className='location-row'>

                <Col className='location-image-container'sm={6}>
                    <LazyLoadImage
                    key={1}
                    src={store}
                    alt={`store front`}
                    effect="blur"
                    className="w-100 shadow-1-strong rounded"
                    />
                    {/* <div style={{width: "100%"}}><iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=302%20Maple%20Ave%20W,%20Vienna%20VA%2022180+(Frame%20Coffee%20Roasters)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    <a href="https://www.maps.ie/population/">Calculate population in area</a></iframe></div> */}
                </Col>

                <Col className='location-info-container' sm={6}>
                    <div className='location-address-title'>
                        <h2>LOCATIONS</h2>
                    </div>
                    <div className='location-address'>
                        <h3>
                            <a href="https://maps.app.goo.gl/B6xWVJHjEfDtPcQ58" target="_blank">
                                Vienna, VA
                            </a>
                        </h3>
                    </div>
                </Col>
             
            </Row>

            <Row className='location-row'>

                <Col className='location-info-container' xs={{span: 12, order:'2'}} sm={{span: 6, order:'1'}}>
                    <div className='open-hours-title'>
                        <h2>OPEN HOURS</h2>
                    </div>
                    <div className='open-hours'>
                        <h3>M - F | 7 - 5</h3>
                        <h3>S - S | 8 - 5</h3>
                    </div>
                </Col>

                <Col className='location-image-container' xs={{span: 12, order: '1'}} sm={{span: 6, order: '2'}}>
                <LazyLoadImage
                  key={2}
                  src={inside}
                  alt={`Inside Image`}
                  effect="blur"
                  className="w-100 shadow-1-strong rounded"
                />
                    {/* <img src={inside} alt="store inside" loading='lazy' /> */}
                </Col>
            </Row>

        </div>
    </Container>
  )
}

export default Location