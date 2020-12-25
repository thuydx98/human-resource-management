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

export const SeatModal = props => {
  const { states, handlers } = useHooks(props);
  const { isOpenModal, payload, notificationRef, isSubmitted, users } = states;
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
              placeholder="Enter seat code"
              autoComplete="off"
              value={payload.seat}
              onChange={e => setPayload({ ...payload, seat: e.target.value })}
              invalid={isSubmitted && !payload.seat}
            />
            <FormFeedback>Seat code is required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              value={payload.employeeId}
              onChange={e =>
                setPayload({ ...payload, employeeId: e.target.value })
              }
            >
              <option value="">Choose...</option>
              {users &&
                users.map(item => (
                  <option key={item.id} value={item.id}>
                    {`${item.employee_code} - ${item.firstname} ${
                      item.lastname
                    }`}
                  </option>
                ))}
            </Input>
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

export default memo(SeatModal);
