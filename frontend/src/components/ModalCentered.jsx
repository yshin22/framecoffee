import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Menu1 from '../assets/images/FALL_MENU_1.jpg';
import Menu2 from '../assets/images/FALL_MENU_2.jpg';
import Menu3 from '../assets/images/FALL_MENU_3.jpg';

const ModalCentered = (props) => {

    console.log(props.image);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding: '0'}}>
        <img style={{maxWidth: '100%'}} src={(props.image === 1) ? 
            Menu1 : (props.image === 2) ?
             Menu2 : Menu3} alt="menu images" 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCentered