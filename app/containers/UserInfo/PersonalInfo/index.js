import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Notification from 'components/Notification';
import AuthUtils from 'utils/authentication';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function PersonalInfo(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { personalInfo, isSubmitted, notificationRef, departments } = states;
  const { onSubmit, setPersonalInfo } = handlers;
  const { role } = AuthUtils.getAuthInfo();

  return (
    <>
      <Notification ref={notificationRef} />
      <Card>
        <CardHeader>
          <h4 className="description">
            Personal detail
            <Button
              color="info"
              type="submit"
              className="float-right btn-sm float-right"
              onClick={onSubmit}
            >
              Update
            </Button>
          </h4>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="pr-md-1" md="5">
                <FormGroup>
                  <Label>Email address</Label>
                  <Input defaultValue={get('email', personalInfo)} disabled />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="3">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input
                    name="gender"
                    placeholder="Choose..."
                    type="select"
                    value={get('gender', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        gender: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.gender}
                  >
                    <option value="">None</option>
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
                  defaultValue={get('phone', personalInfo)}
                  onChange={e =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                  invalid={isSubmitted && !personalInfo.phone}
                />
                <FormFeedback>Phone is required</FormFeedback>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <Label>Employee code</Label>
                  <Input
                    defaultValue={get('employee_code', personalInfo)}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    defaultValue={get('firstname', personalInfo)}
                    placeholder="First name"
                    autoComplete="off"
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        firstname: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.firstname}
                  />
                </FormGroup>
                <FormFeedback>First name is required</FormFeedback>
              </Col>
              <Col className="pl-md-1" md="4">
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    autoComplete="off"
                    placeholder="Last name"
                    defaultValue={get('lastname', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        lastname: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.lastname}
                  />
                  <FormFeedback>Last name is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="8" className="pr-1">
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    placeholder="Address"
                    autoComplete="off"
                    defaultValue={get('address', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        address: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.address}
                  />
                  <FormFeedback>Address is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col className="pl-1" md="4">
                <FormGroup>
                  <Label>Identity Card</Label>
                  <Input
                    name="identity_card"
                    type="number"
                    autoComplete="off"
                    placeholder="Identity number"
                    value={get('identity_card', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        identity_card: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.identity_card}
                  />
                  <FormFeedback>ID number is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="4">
                <FormGroup>
                  <Label>Birthday</Label>
                  <Input
                    name="birthday"
                    type="date"
                    value={moment(get('birthday', personalInfo)).format(
                      'YYYY-MM-DD',
                    )}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        birthday: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !personalInfo.birthday}
                  />
                  <FormFeedback>Birthday is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col className="px-1" md="4">
                <FormGroup>
                  <Label>Department</Label>
                  <Input
                    type="select"
                    disabled={
                      role !== 'Admin' ||
                      get('permission', personalInfo) === 'Admin'
                    }
                    value={get('departmentId', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        departmentId: e.target.value,
                      })
                    }
                  >
                    <option value="">Choose...</option>
                    {departments &&
                      departments.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col className="pl-1" md="4">
                <FormGroup>
                  <Label>Role</Label>
                  <Input
                    type="select"
                    disabled={
                      role !== 'Admin' ||
                      get('permission', personalInfo) === 'Admin'
                    }
                    value={get('roleId', personalInfo)}
                    onChange={e =>
                      setPersonalInfo({
                        ...personalInfo,
                        roleId: +e.target.value,
                      })
                    }
                  >
                    {get('permission', personalInfo) === 'Admin' && (
                      <option>Admin</option>
                    )}
                    <option value="2">Manager</option>
                    <option value="3">Employee</option>
                    <option value="4">Deputy</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
