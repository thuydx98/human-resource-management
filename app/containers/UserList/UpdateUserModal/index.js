/* eslint-disable camelcase */
import get from 'lodash/fp/get';
import React, { memo } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap';
import useHooks from './hook';
import saga from './saga';
import { sliceKey, reducer } from './slice';

export const UpdateUserModal = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { states, handlers } = useHooks(props);
  const { isOpen, user, isSubmitted } = states;
  const { handleCloseModal, onSubmit, setUser } = handlers;

  return (
    <Modal isOpen={isOpen} toggle={handleCloseModal} size="lg">
      <div className="modal-header">
        <h4 className="modal-title">Update User</h4>
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
        <Row>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>Email address</Label>
              <Input value={get('email', user)} disabled />
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>First Name</Label>
              <Input
                placeholder="First name"
                name="firstName"
                autoComplete="off"
                value={get('firstname', user)}
                onChange={e => setUser({ ...user, firstname: e.target.value })}
                invalid={isSubmitted && !user.firstname}
              />
              <FormFeedback>First name is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                autoComplete="off"
                placeholder="Last name"
                value={get('lastname', user)}
                onChange={e => setUser({ ...user, lastname: e.target.value })}
                invalid={isSubmitted && !user.lastname}
              />
              <FormFeedback>Last name is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>Birthday</Label>
              <Input
                name="birthday"
                type="date"
                placeholder="Birthday"
                value={get('birthday', user)}
                onChange={e => setUser({ ...user, birthday: e.target.value })}
                invalid={isSubmitted && !user.birthday}
              />
              <FormFeedback>Birthday is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                type="number"
                autoComplete="off"
                placeholder="Phone number"
                value={get('phone', user)}
                onChange={e => setUser({ ...user, phone: e.target.value })}
                invalid={isSubmitted && !user.phone}
              />
              <FormFeedback>Phone is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>ID</Label>
              <Input
                name="identity_card"
                type="number"
                autoComplete="off"
                placeholder="Identity number"
                value={get('identity_card', user)}
                onChange={e =>
                  setUser({ ...user, identity_card: e.target.value })
                }
                invalid={isSubmitted && !user.identity_card}
              />
              <FormFeedback>ID number is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="4">
            <FormGroup>
              <Label>Gender</Label>
              <Input
                name="gender"
                placeholder="Choose..."
                type="select"
                value={get('gender', user)}
                onChange={e => setUser({ ...user, gender: e.target.value })}
                invalid={isSubmitted && !user.gender}
              >
                <option value="null">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
              <FormFeedback>Gender is required</FormFeedback>
            </FormGroup>
          </Col>
          <Col className="pr-md-1" md="8">
            <FormGroup>
              <Label>Address</Label>
              <Input
                name="gender"
                placeholder="Address"
                autoComplete="off"
                value={get('address', user)}
                onChange={e => setUser({ ...user, address: e.target.value })}
                invalid={isSubmitted && !user.address}
              />
              <FormFeedback>Address is required</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button color="info" onClick={onSubmit}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(UpdateUserModal);
