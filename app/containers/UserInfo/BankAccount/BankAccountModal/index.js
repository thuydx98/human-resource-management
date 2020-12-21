import React, { memo } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import Notification from 'components/Notification';
import useHooks from './hook';

export const BankAccountModal = props => {
  const { states, handlers } = useHooks(props);
  const {
    isOpenModal,
    payload,
    notificationRef,
    isSubmitted,
    bankList,
  } = states;
  const { handleCloseModal, onSubmit, setPayload } = handlers;

  return (
    <>
      <Notification ref={notificationRef} />
      <Modal isOpen={isOpenModal} toggle={handleCloseModal} className="card">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            Bank account
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
            <Label>Bank</Label>
            <Input
              autoComplete="off"
              type="select"
              value={payload.bankId}
              onChange={e => setPayload({ ...payload, bankId: e.target.value })}
              invalid={isSubmitted && !payload.bankId}
            >
              {bankList &&
                bankList.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Input>
            <FormFeedback>Bank is required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Account number</Label>
            <Input
              placeholder="Account number"
              autoComplete="off"
              value={payload.accountNumber}
              onChange={e =>
                setPayload({ ...payload, accountNumber: e.target.value })
              }
              invalid={isSubmitted && !payload.accountNumber}
            />
            <FormFeedback>Account number is required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Account name</Label>
            <Input
              placeholder="Account name"
              autoComplete="off"
              value={payload.accountName}
              onChange={e =>
                setPayload({ ...payload, accountName: e.target.value })
              }
              invalid={isSubmitted && !payload.accountName}
            />
            <FormFeedback>Account name is required</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button color="info" onClick={onSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default memo(BankAccountModal);
