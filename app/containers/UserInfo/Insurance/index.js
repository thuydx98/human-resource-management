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
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function Insurance(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { insurance, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
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
                      setUser({ ...insurance, effectiveDate: e.target.value })
                    }
                    invalid={isSubmitted && !insurance.effectiveDate}
                  />
                  <FormFeedback>Effective Date is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="7">
                <FormGroup>
                  <Label>Social insurance book No.</Label>
                  <Input
                    defaultValue={get('bookNo', insurance)}
                    placeholder="First name"
                    autoComplete="off"
                    onChange={e =>
                      setUser({ ...insurance, bookNo: e.target.value })
                    }
                    invalid={isSubmitted && !insurance.bookNo}
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
                    placeholder="Thu Duc hospital"
                    autoComplete="off"
                    defaultValue={get('hospital', insurance)}
                    onChange={e =>
                      setUser({ ...insurance, hospital: e.target.value })
                    }
                    invalid={isSubmitted && !insurance.hospital}
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
