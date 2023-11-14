import '../assets/styles/about.css';
import {Container, Row, Col} from 'react-bootstrap';
import coffee from '../assets/gallery/frame_beans.jpg';
import latte from '../assets/gallery/latte-art.jpeg';
import woven from '../assets/gallery/hat_music.jpg';
import Footer from '../components/Footer';

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
            <img src={coffee} alt='coffee pour'/>
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
          <Col xs={{span: 12, order:'2'}} sm={{span: 6, order:'1'}}>
            <h1>
            <span className='selectWord'>Coffee</span> is more than a beverage, however. It is a memory, 
            an anticipation, a lifetime of consoling moments of modest 
            pleasure woven into our lives.
            </h1>
          </Col>
          <Col className='img-container' xs={{span: 12, order: '1'}} sm={{span: 6, order: '2'}}>
            <img src={woven} alt=''/>
          </Col>
        </Row>
        <Row className='image-row py-4'>
          <Col className='img-container' sm={true}>
            <img src={latte} alt=''/>
          </Col>
          <Col sm={true}>
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