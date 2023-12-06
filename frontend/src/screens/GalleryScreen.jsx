import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../assets/styles/screens/galleryscreen.css';
import Footer from '../components/Footer';

import image1 from '../assets/gallery/559525.jpg';
import image2 from '../assets/gallery/Arch.jpeg';
import image3 from '../assets/gallery/chess.jpeg';
import image4 from '../assets/gallery/Construction.jpeg';
import image5 from '../assets/gallery/DeathValley.jpeg';
import image6 from '../assets/gallery/Direction.jpeg';
import image7 from '../assets/gallery/Fan.jpg';
import image8 from '../assets/gallery/Freedom.jpeg';
import image9 from '../assets/gallery/Incoming.jpg';
import image10 from '../assets/gallery/intotheframe.jpeg';
import image11 from '../assets/gallery/Joshua.jpeg';
import image12 from '../assets/gallery/Laundry.jpeg';
import image13 from '../assets/gallery/Lip.jpeg';
import image14 from '../assets/gallery/Mojave.jpeg';
import image15 from '../assets/gallery/NewYork.jpeg';
import image16 from '../assets/gallery/Red.jpg';
import image17 from '../assets/gallery/Reflection.jpeg';
import image18 from '../assets/gallery/Room+322.jpeg';
import image19 from '../assets/gallery/Room+323.jpeg';
import image20 from '../assets/gallery/Summer.jpeg';
import image21 from '../assets/gallery/waitforme.jpeg';
import image22 from '../assets/gallery/Wall.jpg';
import image23 from '../assets/gallery/wayoflight.jpeg';

// const images = require.context('../assets/gallery', true);
// const imageList = images.keys().map(image => images(image));

const GalleryScreen = () => {

  return (
    <>
      <Container className='gallery-container'>

        <Row className='page-title'>
          <h1>GALLERY</h1>
        </Row>

        <Row className='sub-title py-2'>
          <h2>LIFE IS THE BIGGEST <span className='selectWord'>PHOTO</span> FRAME YOU’LL EVER BE IN</h2>
        </Row>

        <Row className='mt-4'>
          <Col className='col-md-4 col-12 mb-4 mb-lg-0'>
            <img class="w-100 shadow-1-strong rounded mb-4" src={image1} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image2} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image3} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image4} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image5} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image6} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image7} alt="" />

          </Col>

          <Col class="col-md-4 col-12 mb-4 mb-lg-0'">
            <img class="w-100 shadow-1-strong rounded mb-4" src={image8} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image9} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image10} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image11} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image12} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image13} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image14} alt="" />

          </Col>

          <Col className='col-md-4 col-12 mb-4 mb-lg-0'>
            <img class="w-100 shadow-1-strong rounded mb-4" src={image15} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image16} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image17} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image18} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image19} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image20} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image21} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image22} alt="" />
            <img class="w-100 shadow-1-strong rounded mb-4" src={image23} alt="" />


          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
    
  )
}

export default GalleryScreen