import React from 'react';
import '../assets/styles/screens/artshowscreen.css';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import beans from '../assets/images/frame_beans.jpg';
import hat from '../assets/images/hat_music.jpg';
import latte from '../assets/images/latte-art.jpeg';
import Footer from '../components/Footer';

const ArtShowScreen = () => {
  return (
    <>
        <Container className='artShow-container'>
            {/* <div className='coming-soon'>
                <h1>ART SHOW</h1>
            </div> */}

            <Row className='page-title'>
              <h1>ART SHOW</h1>
            </Row>
            
            <Row>
              <Col className='carousel-container'>
                <Carousel className='artShow-carousel'>
                  <Carousel.Item>
                    <img src={beans} alt="yes" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={hat} alt="" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={latte} alt="" />
                  </Carousel.Item>
                </Carousel>
              </Col>

              <Col className='artist-container'>
                <div className='artist-desc'>
                  <h1>Jeremiah Kang <span>Freelance Photographer</span></h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam iste libero nesciunt temporibus itaque dignissimos doloremque. Quidem, a. Saepe, incidunt commodi! Nemo voluptas asperiores dicta commodi facere laborum non!
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et accusamus nesciunt eveniet, voluptatibus nisi rerum earum repellendus in atque dolores soluta dolorem magnam qui id sit est. Deleniti, itaque!
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et accusamus nesciunt eveniet, voluptatibus nisi rerum earum repellendus in atque dolores soluta dolorem magnam qui id sit est. Deleniti, itaque!
                  </p>
                </div>
                <div className='artist-social'>
                  <h3>@insta @twitter @youtube</h3>
                </div>
              </Col>
              
            </Row>
{/* 
            <Row>
              <Col className='artist-container'>
                <div className='artist-desc'>
                  <h1>Jeremiah Kang <span>Freelance Photographer</span></h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam iste libero nesciunt temporibus itaque dignissimos doloremque. Quidem, a. Saepe, incidunt commodi! Nemo voluptas asperiores dicta commodi facere laborum non!
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et accusamus nesciunt eveniet, voluptatibus nisi rerum earum repellendus in atque dolores soluta dolorem magnam qui id sit est. Deleniti, itaque!
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et accusamus nesciunt eveniet, voluptatibus nisi rerum earum repellendus in atque dolores soluta dolorem magnam qui id sit est. Deleniti, itaque!
                  </p>
                </div>
                <div className='artist-social'>
                  <h3>@insta @twitter @youtube</h3>
                </div>
              </Col>
            </Row> */}
        </Container>
        <Footer/>
    </>
  )
}

export default ArtShowScreen