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
import moment from 'moment';
import Notification from 'components/Notification';
import useHooks from './hook';

export const ProjectInfoModal = props => {
  const { states, handlers } = useHooks(props);
  const {
    isOpenModal,
    payload,
    notificationRef,
    isSubmitted,
    projectList,
  } = states;
  const { handleCloseModal, onSubmit, setPayload } = handlers;

  return (
    <>
      <Notification ref={notificationRef} />
      <Modal isOpen={isOpenModal} toggle={handleCloseModal} className="card">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            Project Information
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
            <Label>Project</Label>
            <Input
              autoComplete="off"
              type="select"
              value={payload.projectId}
              onChange={e =>
                setPayload({ ...payload, projectId: e.target.value })
              }
              invalid={isSubmitted && !payload.projectId}
            >
              <option value="">Choose...</option>
              {projectList &&
                projectList.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Input>
            <FormFeedback>Project is required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Start date</Label>
            <Input
              type="date"
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

export default memo(ProjectInfoModal);
