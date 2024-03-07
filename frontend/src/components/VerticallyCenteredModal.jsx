import {Modal, Button} from 'react-bootstrap';

export default function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.prod.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Origin</h4>
        <p>
          {props.prod.description}
        </p>
        <h4>Cupping Note</h4>
        <p>
          {props.prod.cuppingNote}
        </p>
        <h4>Roasting Level: {props.prod.roastingLevel}</h4>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}