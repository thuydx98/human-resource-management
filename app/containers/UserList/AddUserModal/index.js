import React, { memo } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export const AddUserModal = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { states, handlers } = useHooks(props);
  const { isOpenModal, payload } = states;
  const { handleCloseModal, onSubmit, setPayload } = handlers;

  return (
    <Modal isOpen={isOpenModal} toggle={handleCloseModal} className="card">
      <div className="modal-header">
        <h4 className="modal-title" id="exampleModalLabel">
          Add new user
        </h4>
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
          <Label>Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            onChange={e => setPayload({ ...payload, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={e => setPayload({ ...payload, password: e.target.value })}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          color="info"
          // disabled={!payload.email || !payload.password}
          onClick={onSubmit}
        >
          Add new
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(AddUserModal);