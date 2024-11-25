import React, { useState } from 'react'
import '../assets/styles/screens/menuscreen.css'
import { Container, Row, Carousel} from 'react-bootstrap';
import Footer from '../components/Footer';
import TextPath from '../components/TextPath'
import ModalCentered from '../components/ModalCentered';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  useGetMenuImagesQuery
} from '../slices/uploadApiSlice';
import Loader from '../components/Loader'
import Message from '../components/Message'


const MenuScreen = () => {

  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState();

  const {data: menus, isLoading, error, refetch} = useGetMenuImagesQuery();

  return (
    <>
      <Container className='menu-container'>
        <Row className='page-title'>
          <h1>MENU</h1>
        </Row>

        <Row className='sub-title py-2'>
          <TextPath/>
        </Row>


        {isLoading ? (
                <Loader/>
                ) : error ? (
                    <div>
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                    </div>
                ) : 
                (
                  <div className='menu-carousel-container'>
                    <Carousel className='menu-carousel' variant='dark' slide={false} interval={null}>
                      {menus.image?.map((image, index) => (
                        <Carousel.Item className='menu-carousel-item'>
                        <LazyLoadImage
                        key={index}
                        src={`/uploads/` + image}
                        alt={`Image ${index + 1}`}
                        effect="blur"
                        className="w-100 shadow-1-strong rounded mb-4"
                        />
                          {/* <img src={`http://localhost:4000/uploads/` + i} alt="menu"/> */}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                )
          }
      </Container>
      <Footer/>
    </>

        /* 
        <div className='menu-box'>
          
          <div className='menu-wrapper'>
            <img src={Menu1} alt="Fall Menu 1" onClick={() => {setModalShow(true); setImage(1)}} />
          </div>
          <div className='menu-wrapper'>
            <img src={Menu2} alt="Fall Menu 2" onClick={() => {setModalShow(true); setImage(2)}}/>
          </div>
          <div className='menu-wrapper'>
            <img src={Menu3} alt="Fall Menu 3" onClick={() => {setModalShow(true); setImage(3)}}/>
          </div>
          

          <ModalCentered
            show={modalShow}
            onHide={() => setModalShow(false)}
            image={image}
          /
        </div> */
  )
}

export default MenuScreen