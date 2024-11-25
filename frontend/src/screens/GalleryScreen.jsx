import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../assets/styles/screens/galleryscreen.css';
import Footer from '../components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import image1 from '../assets/gallery/559525.webp';
import image2 from '../assets/gallery/Arch.webp';
import image3 from '../assets/gallery/chess.webp';
import image4 from '../assets/gallery/Construction.webp';
import image5 from '../assets/gallery/DeathValley.webp';
import image6 from '../assets/gallery/Direction.webp';
import image7 from '../assets/gallery/Fan.webp';
import image8 from '../assets/gallery/Freedom.webp';
import image9 from '../assets/gallery/Incoming.webp';
import image10 from '../assets/gallery/intotheframe.webp';
import image11 from '../assets/gallery/Joshua.webp';
import image12 from '../assets/gallery/Laundry.webp';
import image13 from '../assets/gallery/Lip.webp';
import image14 from '../assets/gallery/Mojave.webp';
import image15 from '../assets/gallery/NewYork.webp';
import image16 from '../assets/gallery/Red.webp';
import image17 from '../assets/gallery/Reflection.webp';
import image18 from '../assets/gallery/Room322.webp';
import image19 from '../assets/gallery/Room323.webp';
import image20 from '../assets/gallery/Summer.webp';
import image21 from '../assets/gallery/waitforme.webp';
import image22 from '../assets/gallery/Wall.webp';
import image23 from '../assets/gallery/wayoflight.webp';

const images = [
  image1, 
  image2, 
  image3, 
  image4, 
  image5, 
  image6, 
  image7,
  image8, 
  image9, 
  image10, 
  image11, 
  image12, 
  image13, 
  image14,
  image15, 
  image16, 
  image17, 
  image18, 
  image19, 
  image20, 
  image21,
  image22, 
  image23,
];

const splitIntoColumns = (images, columns) => {
  const cols = Array.from({ length: columns }, () => []);
  images.forEach((image, index) => {
    cols[index % columns].push(image);
  });
  return cols;
};

// const images = require.context('../assets/gallery', true);
// const imageList = images.keys().map(image => images(image));

const GalleryScreen = () => {
  const columns = splitIntoColumns(images, 3);
  return (
    <>
      <Container className="gallery-container">
        <Row className="page-title">
          <h1>GALLERY</h1>
        </Row>
        <Row className="sub-title py-2">
          <h2>
            LIFE IS THE BIGGEST <span className="selectWord">PHOTO</span> FRAME YOU’LL EVER BE IN
          </h2>
        </Row>
        <Row className="mt-4">
          {columns.map((column, colIndex) => (
            <Col key={colIndex} md={4} xs={12} className="mb-4">
              {column.map((image, imgIndex) => (
                <LazyLoadImage
                  key={imgIndex}
                  src={image}
                  alt={`Image ${imgIndex + 1}`}
                  effect="blur"
                  className="w-100 shadow-1-strong rounded mb-4"
                />
              ))}
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default GalleryScreen