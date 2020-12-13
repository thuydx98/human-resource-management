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

export default function Insurance() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Insurance</h4>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="pr-md-1" md="5">
                <FormGroup>
                  <Label>Effective date</Label>
                  <Input
                    type="date"
                    value={get('birthday', user)}
                    onChange={e =>
                      setUser({ ...user, birthday: e.target.value })
                    }
                    invalid={isSubmitted && !user.birthday}
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="7">
                <FormGroup>
                  <Label>Social insurance book No.</Label>
                  <Input
                    defaultValue={get('firstname', user)}
                    placeholder="First name"
                    autoComplete="off"
                    onChange={e =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    invalid={isSubmitted && !user.firstname}
                  />
                  <FormFeedback>Gender is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Hospital</Label>
                  <Input
                    name="gender"
                    placeholder="Thu Duc hospital"
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
