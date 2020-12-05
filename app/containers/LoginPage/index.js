import React, { memo } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Col,
  Form,
} from 'reactstrap';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

export function LoginPage() {
  useInjectSaga({ key: 'loginPage', saga });

  return (
    <div>
      <Helmet>
        <title>HRM | Login</title>
      </Helmet>
      <Col lg={4} md={12} className="mx-auto mt-4">
        <Card>
          <CardBody>
            <h2 className="text-center">HRM Login</h2>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email address</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  autoComplete="off"
                />
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                className="d-block w-50 mt-4 mx-auto"
              >
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default memo(LoginPage);
