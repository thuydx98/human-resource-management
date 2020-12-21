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
  Row,
  Col,
} from 'reactstrap';
import moment from 'moment';
import Notification from 'components/Notification';
import useHooks from './hook';

export const ContractModal = props => {
  const { states, handlers } = useHooks(props);
  const { isOpenModal, payload, notificationRef, isSubmitted } = states;
  const { handleCloseModal, onSubmit, setPayload } = handlers;

  return (
    <>
      <Notification ref={notificationRef} />
      <Modal
        isOpen={isOpenModal}
        toggle={handleCloseModal}
        className="card"
        size="lg"
      >
        <div className="modal-header">
          <h4 className="modal-title">Contract</h4>
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
            <Col md={6}>
              <FormGroup>
                <Label>Contract No.</Label>
                <Input
                  placeholder="Contract No."
                  autoComplete="off"
                  value={payload.contractNo}
                  onChange={e =>
                    setPayload({ ...payload, contractNo: e.target.value })
                  }
                  invalid={isSubmitted && !payload.contractNo}
                />
                <FormFeedback>Contract No is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Joining date</Label>
                <Input
                  type="date"
                  value={
                    payload.joinDate
                      ? moment(payload.joinDate).format('YYYY-MM-DD')
                      : null
                  }
                  onChange={e =>
                    setPayload({ ...payload, joinDate: e.target.value })
                  }
                  invalid={isSubmitted && !payload.joinDate}
                />
                <FormFeedback>Joining date is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Probation status</Label>
                <Input
                  type="select"
                  value={payload.probationStatus}
                  onChange={e =>
                    setPayload({ ...payload, probationStatus: e.target.value })
                  }
                >
                  <option value="In progress">In progress</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>End probation date</Label>
                <Input
                  type="date"
                  value={
                    payload.endProbationDate
                      ? moment(payload.endProbationDate).format('YYYY-MM-DD')
                      : null
                  }
                  onChange={e =>
                    setPayload({ ...payload, endProbationDate: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Start date</Label>
                <Input
                  type="date"
                  autoComplete="off"
                  value={
                    payload.startDate
                      ? moment(payload.startDate).format('YYYY-MM-DD')
                      : null
                  }
                  onChange={e =>
                    setPayload({ ...payload, startDate: e.target.value })
                  }
                  invalid={isSubmitted && !payload.startDate}
                />
                <FormFeedback>Start date is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>End date</Label>
                <Input
                  type="date"
                  value={
                    payload.endDate
                      ? moment(payload.endDate).format('YYYY-MM-DD')
                      : null
                  }
                  onChange={e =>
                    setPayload({ ...payload, endDate: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
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

export default memo(ContractModal);
