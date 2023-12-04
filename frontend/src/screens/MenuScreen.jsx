import React, { useState } from 'react'
import '../assets/styles/menuscreen.css'
import Menu1 from '../assets/gallery/FALL_MENU_1.jpg';
import Menu2 from '../assets/gallery/FALL_MENU_2.jpg';
import Menu3 from '../assets/gallery/FALL_MENU_3.jpg';
import { Container, Row, Modal } from 'react-bootstrap';
import Footer from '../components/Footer';
import TextPath from '../components/TextPath'
import ModalCentered from '../components/ModalCentered';


const MenuScreen = () => {

  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState();

  return (
    <>
      <Container className='menu-container'>
        <Row className='page-title'>
          <h1>Menu</h1>
        </Row>

        <Row className='sub-title py-2'>
          <TextPath/>
        </Row>

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
          />
        </div>
      </Container>
      <Footer/>
    </>
  )
}

export default MenuScreen