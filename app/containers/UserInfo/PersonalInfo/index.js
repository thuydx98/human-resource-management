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
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function PersonalInfo() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Personal detail</h4>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="pr-md-1" md="5">
                <FormGroup>
                  <Label>Email address</Label>
                  <Input defaultValue={get('email', user)} disabled />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="3">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input
                    name="gender"
                    placeholder="Choose..."
                    type="select"
                    defaultValue={get('gender', user)}
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
              <Col className="pl-md-1" md="4">
                <Label>Phone Number</Label>
                <Input
                  name="phoneNumber"
                  type="number"
                  autoComplete="off"
                  placeholder="Phone number"
                  defaultValue={get('phone', user)}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                  invalid={isSubmitted && !user.phone}
                />
                <FormFeedback>Phone is required</FormFeedback>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    defaultValue={get('firstname', user)}
                    placeholder="First name"
                    autoComplete="off"
                    onChange={e =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    invalid={isSubmitted && !user.firstname}
                  />
                </FormGroup>
                <FormFeedback>First name is required</FormFeedback>
              </Col>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    autoComplete="off"
                    placeholder="Last name"
                    defaultValue={get('lastname', user)}
                    onChange={e =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                    invalid={isSubmitted && !user.lastname}
                  />
                  <FormFeedback>Last name is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    name="gender"
                    placeholder="Address"
                    autoComplete="off"
                    defaultValue={get('address', user)}
                    onChange={e =>
                      setUser({ ...user, address: e.target.value })
                    }
                    invalid={isSubmitted && !user.address}
                  />
                  <FormFeedback>Address is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
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
              <Col className="px-md-1" md="6">
                <FormGroup>
                  <Label>Birthday</Label>
                  <Input
                    name="birthday"
                    type="date"
                    placeholder="Birthday"
                    value={get('birthday', user)}
                    onChange={e =>
                      setUser({ ...user, birthday: e.target.value })
                    }
                    invalid={isSubmitted && !user.birthday}
                  />
                  <FormFeedback>Birthday is required</FormFeedback>
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
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
