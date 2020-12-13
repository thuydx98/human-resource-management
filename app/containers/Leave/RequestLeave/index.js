import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  FormText,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function RequestLeave() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
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
                  defaultValue={get('gender', user)}
                  onChange={e => setUser({ ...user, gender: e.target.value })}
                  invalid={isSubmitted && !user.gender}
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Non-paid Leave">Non-paid Leave</option>
                </Input>
                <FormFeedback>Leave type is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col className="px-md-1" md="2">
              <Label>Remaining days</Label>
              <p className="p-2">5</p>
            </Col>
            <Col className="pl-md-1">
              <FormGroup>
                <Label>From</Label>
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
            <Col className="pl-md-1">
              <FormGroup>
                <Label>To</Label>
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
          </Row>
          <Row>
            <Col md={5} />
            <Col className="pr-md-1 pl-1" md="7">
              <FormGroup>
                <Label>Reason</Label>
                <Input
                  rows="4"
                  type="textarea"
                  defaultValue={get('firstname', user)}
                  placeholder="Please note your leave time here."
                  autoComplete="off"
                  onChange={e =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  invalid={isSubmitted && !user.firstname}
                />
                <FormFeedback>First name is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color="info"
          type="submit"
          className="float-right"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </CardFooter>
    </>
  );
}
