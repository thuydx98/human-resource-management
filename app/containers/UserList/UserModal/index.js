import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default function UserModal() {
  const toggleModalDemo = () => {};

  return (
    <Modal isOpen={false} toggle={toggleModalDemo}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Modal title
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={toggleModalDemo}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </div>
      <ModalBody>
        <p>Woohoo, reading this text in a modal!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModalDemo}>
          Close
        </Button>
        <Button color="primary">Save changes</Button>
      </ModalFooter>
    </Modal>
  );
}
