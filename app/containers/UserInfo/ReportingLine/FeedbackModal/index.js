import React, { memo } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  FormFeedback,
} from 'reactstrap';
import Notification from 'components/Notification';
import useHooks from './hook';

export const FeedbackModal = props => {
  const { states, handlers } = useHooks(props);
  const { isOpenModal, payload, notificationRef, isSubmitted } = states;
  const { handleCloseModal, onSubmit, setPayload } = handlers;

  return (
    <>
      <Notification ref={notificationRef} />
      <Modal isOpen={isOpenModal} toggle={handleCloseModal} className="card">
        <div className="modal-header">
          <h4 className="modal-title">Feedback</h4>
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
          <FormGroup>
            <Input
              type="textarea"
              placeholder="Feedback content"
              autoComplete="off"
              value={payload.content}
              onChange={e =>
                setPayload({ ...payload, content: e.target.value })
              }
              invalid={isSubmitted && !payload.content}
            />
            <FormFeedback>Content is required</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={onSubmit} className="ml-auto">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default memo(FeedbackModal);
