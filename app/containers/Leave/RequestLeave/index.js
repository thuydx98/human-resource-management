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
import moment from 'moment';
import get from 'lodash/fp/get';
import { getTotalWorkDays } from 'utils/datetime';
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

  const unPaidUsed = leaves
    ? leaves
        .filter(item => item.type === 'NON_PAID' && item.status !== 'CANCEL')
        .map(item => getTotalWorkDays(item.startDate, item.endDate))
        .reduce((a, b) => a + b, 0)
    : 0;
  const annualUsed = leaves
    ? leaves
        .filter(item => item.type === 'ANNUAL' && item.status !== 'CANCEL')
        .map(item => getTotalWorkDays(item.startDate, item.endDate))
        .reduce((a, b) => a + b, 0)
    : 0;

  const totalDates = type => {
    if (!payload.startDate || !payload.endDate) return undefined;
    const total = getTotalWorkDays(
      moment(payload.startDate),
      moment(payload.endDate),
    );
    if (type === 'NON_PAID')
      return total > 12 - annualUsed ? total - 12 + annualUsed : undefined;

    return total > 12 - annualUsed ? 12 - annualUsed : total;
  };

  return (
    <>
      <Notification ref={notificationRef} />
      <CardBody>
        <Form>
          <Row>
            <Col className="pr-md-1" md="4">
              <p className="p-2">
                Annual leaves:
                <span className="pl-5">{12 - annualUsed}</span>
                <span className="text-info pl-3">
                  {totalDates() > 0 && `- ${totalDates()}`}
                </span>
              </p>
              <p className="p-2">
                Non-paid leaves:
                <span className="pl-4">{30 - unPaidUsed}</span>
                <span className="text-info pl-3">
                  {totalDates('NON_PAID') && `- ${totalDates('NON_PAID')}`}
                </span>
              </p>
            </Col>
            <Col className="pl-md-1">
              <FormGroup>
                <Label>From</Label>
                <Input
                  type="date"
                  value={get('startDate', payload)}
                  onChange={e =>
                    setPayload({ ...payload, startDate: e.target.value })
                  }
                  min={moment().format('YYYY-MM-DD')}
                  invalid={isSubmitted && !payload.startDate}
                />
                <FormFeedback>Start date is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col className="pl-md-1">
              <FormGroup>
                <Label>To</Label>
                <Input
                  type="date"
                  min={get('startDate', payload)}
                  value={get('endDate', payload)}
                  onChange={e =>
                    setPayload({ ...payload, endDate: e.target.value })
                  }
                  invalid={isSubmitted && !payload.endDate}
                />
                <FormFeedback>End date is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4} />
            <Col className="pl-1" md={8}>
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
          onClick={() => onSubmit(totalDates(), totalDates('NON_PAID'))}
          disabled={annualUsed === 0 && unPaidUsed === 0}
        >
          Submit
        </Button>
      </CardFooter>
    </>
  );
}
