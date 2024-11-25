import '../assets/styles/screens/aboutscreen.css';
import {Container, Row, Col} from 'react-bootstrap';
import coffee from '../assets/images/frame_beans.jpg';
import latte from '../assets/images/latte-art.jpeg';
import woven from '../assets/images/hat_music.jpg';
import Footer from '../components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AboutScreen = () => {

  
  return (
    <>
      <Container className='about-container'>

        <Row className='page-title'>
          <h1>ABOUT US</h1>
        </Row>

        <Row className='sub-title py-2'>
          <h2>Life happens, <span className='selectWord'>coffee</span> helps.</h2>
        </Row>

        <Row className='image-row py-4'>
          <Col className='img-container' sm={true}>
            <LazyLoadImage
              key={1}
              src={coffee}
              alt={`Image 1`}
              effect="blur"
              className="w-100 shadow-1-strong rounded"
            />
          </Col>
          <Col className='txt-container' sm={true}>
            <h1>
              <span className='selectWord'>Coffee</span> is one of the world’s most popular beverages. 
              Some claim it is the most widely consumed liquid in 
              the world aside from water.
            </h1>
          </Col>
        </Row>
        <Row className='image-row py-4'>
          <Col className='txt-container' xs={{span: 12, order:'2'}} sm={{span: 6, order:'1'}}>
            <h1>
            <span className='selectWord'>Coffee</span> is more than a beverage, however. It is a memory, 
            an anticipation, a lifetime of consoling moments of modest 
            pleasure woven into our lives.
            </h1>
          </Col>
          <Col className='img-container' xs={{span: 12, order: '1'}} sm={{span: 6, order: '2'}}>
            <LazyLoadImage
                  key={2}
                  src={woven}
                  alt={`Image 2`}
                  effect="blur"
                  className="w-100 shadow-1-strong rounded"
                />
          </Col>
        </Row>
        <Row className='image-row py-4'>
          <Col className='img-container' sm={true}>
            <LazyLoadImage
                  key={3}
                  src={latte}
                  alt={`Image 3`}
                  effect="blur"
                  className="w-100 shadow-1-strong rounded"
                />
          </Col>
          <Col className='txt-container' sm={true}>
            <h1>
            Having a good cup of <span className='selectWord'>coffee</span> in a good place, that is what 
            we love to share with you.
            </h1>
          </Col>
        </Row>
      </Container>
      <Footer/>

    </>
  )
}

export default AboutScreen