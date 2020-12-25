/* eslint-disable indent */
import React from 'react';
import {
  Button,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Notification from 'components/Notification';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function RequestLeave() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { leaves, payload, isSubmitted, notificationRef } = states;
  const { onSubmit, setPayload } = handlers;

  const selectedType = get('type', payload) || 'ANNUAL';
  const totalUsed = leaves
    ? leaves.filter(
        item => item.type === selectedType && item.status !== 'CANCEL',
      ).length
    : 0;

  return (
    <>
      <Notification ref={notificationRef} />
      <CardBody>
        <Form>
          <Row>
            <Col className="pr-md-1" md="3">
              <FormGroup>
                <Label>Leave type</Label>
                <Input
                  name="gender"
                  placeholder="Choose..."
                  type="select"
                  value={get('type', payload) || 'ANNUAL'}
                  onChange={e =>
                    setPayload({ ...payload, type: e.target.value })
                  }
                >
                  <option value="ANNUAL">Annual Leave</option>
                  <option value="NON_PAID">Non-paid Leave</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="px-md-1" md="2">
              <Label>Remaining days</Label>
              <p className="p-2">
                {selectedType === 'ANNUAL' ? 12 - totalUsed : 30 - totalUsed}
              </p>
            </Col>
            <Col className="pl-md-1">
              <FormGroup>
                <Label>Leave date</Label>
                <Input
                  type="date"
                  value={get('date', payload)}
                  onChange={e =>
                    setPayload({ ...payload, date: e.target.value })
                  }
                  invalid={isSubmitted && !payload.date}
                />
                <FormFeedback>Leave date is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5} />
            <Col className="pr-md-1 pl-1" md="7">
              <FormGroup>
                <Label>Reason</Label>
                <Input
                  rows="4"
                  type="textarea"
                  value={get('reason', payload)}
                  placeholder="Please note your leave time & reason here."
                  autoComplete="off"
                  onChange={e =>
                    setPayload({ ...payload, reason: e.target.value })
                  }
                  invalid={isSubmitted && !payload.reason}
                />
                <FormFeedback>Reason is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color="info"
          type="submit"
          className="btn-sm float-right"
          onClick={onSubmit}
          disabled={
            selectedType === 'ANNUAL'
              ? 12 - totalUsed === 0
              : 30 - totalUsed === 0
          }
        >
          Submit
        </Button>
      </CardFooter>
    </>
  );
}
