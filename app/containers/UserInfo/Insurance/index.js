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
import get from 'lodash/fp/get';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Notification from 'components/Notification';
import AuthUtils from 'utils/authentication';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function Insurance(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { insurance, isSubmitted, notificationRef } = states;
  const { onSubmit, setInsurance } = handlers;
  const { role } = AuthUtils.getAuthInfo();

  return (
    <>
      <Notification ref={notificationRef} />
      <Card>
        {role === 'Manager' && (
          <CardHeader>
            <h4 className="description">
              Insurance
              <Button
                color="info"
                type="submit"
                className="float-right btn-sm float-right"
                onClick={onSubmit}
              >
                Save
              </Button>
            </h4>
          </CardHeader>
        )}
        <CardBody>
          <Form>
            <Row>
              <Col className="pr-md-1" md="5">
                <FormGroup>
                  <Label>Effective date</Label>
                  <Input
                    type="date"
                    value={
                      insurance.effectiveDate
                        ? moment(insurance.effectiveDate).format('YYYY-MM-DD')
                        : null
                    }
                    onChange={e =>
                      setInsurance({
                        ...insurance,
                        effectiveDate: e.target.value,
                      })
                    }
                    invalid={isSubmitted && !insurance.effectiveDate}
                    disabled={role !== 'Manager'}
                  />
                  <FormFeedback>Effective Date is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="7">
                <FormGroup>
                  <Label>Social insurance book No.</Label>
                  <Input
                    value={get('bookNo', insurance)}
                    placeholder="Insurance book No."
                    autoComplete="off"
                    onChange={e =>
                      setInsurance({ ...insurance, bookNo: e.target.value })
                    }
                    invalid={isSubmitted && !insurance.bookNo}
                    disabled={role !== 'Manager'}
                  />
                  <FormFeedback>Book No is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Hospital</Label>
                  <Input
                    placeholder="Enter hospital"
                    autoComplete="off"
                    value={get('hospital', insurance)}
                    onChange={e =>
                      setInsurance({ ...insurance, hospital: e.target.value })
                    }
                    invalid={isSubmitted && !insurance.hospital}
                    disabled={role !== 'Manager'}
                  />
                  <FormFeedback>Hospital is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
