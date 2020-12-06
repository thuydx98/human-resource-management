import React, { memo } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import useHooks from './hook';

export const UpdateUserModal = props => {
  const { states, handlers } = useHooks(props);
  const { isOpenModal } = states;
  const { handleCloseModal } = handlers;

  return (
    <Modal isOpen={isOpenModal} toggle={handleCloseModal}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Modal title
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={handleCloseModal}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </div>
      <ModalBody>
        <p>Woohoo, reading this text in a modal!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button color="primary">Save changes</Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(UpdateUserModal);
