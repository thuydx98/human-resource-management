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
  FormFeedback,
} from 'reactstrap';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { ACTION_STATUS } from 'utils/constants';
import get from 'lodash/fp/get';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export function LoginPage() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { payload, loginState, loginError, isSubmitted } = states;
  const { setPayload, onSubmit } = handlers;

  return (
    <>
      <Helmet>
        <title>HRM | Login</title>
      </Helmet>
      <Col lg={4} md={12} className="mx-auto mt-4">
        <Card>
          <CardBody>
            <h2 className="text-center">HRM Login</h2>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="email">Email address</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={payload.email}
                  onChange={e =>
                    setPayload({ ...payload, email: e.target.value })
                  }
                  invalid={isSubmitted && !payload.email}
                />
                <FormFeedback>Email is required</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={payload.password}
                  onChange={e =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                  invalid={isSubmitted && !payload.password}
                  autoComplete="off"
                />
                <FormFeedback>Password is required</FormFeedback>
              </FormGroup>
              <Label className="text-danger">
                {get('obj', loginError) === 'USER_OR_PASSWORD_INVALID'
                  ? 'Username or password is invalid'
                  : ''}
              </Label>
              <Button
                color="primary"
                type="submit"
                className="d-block w-50 mt-4 mx-auto"
                disabled={loginState === ACTION_STATUS.PENDING}
              >
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default memo(LoginPage);
