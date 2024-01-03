import React, { useState } from 'react'
import '../assets/styles/screens/menuscreen.css'
import Menu1 from '../assets/images/FALL_MENU_1.jpg';
import Menu2 from '../assets/images/FALL_MENU_2.jpg';
import Menu3 from '../assets/images/FALL_MENU_3.jpg';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import TextPath from '../components/TextPath'
import ModalCentered from '../components/ModalCentered';
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
                  <Row>
                    {menus.image?.map((i) => (
                      <Col>
                        {/* <img style={{height: '300px', width: '250px'}}src={`/uploads/` + i} alt="menu"/> */}
                        <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + i} alt="menu"/>
                      </Col>
                    ))}
                  </Row>
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