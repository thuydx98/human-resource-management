import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
  Row,
  Col,
  Input,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function LeaveHistory() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md={3}>
              <Input
                type="select"
                onChange={e => setUser({ ...user, gender: e.target.value })}
              >
                <option value="2020">2018</option>
                <option value="2020">2019</option>
                <option value="2020" selected>
                  2020
                </option>
                <option value="2020">2021</option>
              </Input>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Request</th>
                <th>Created date</th>
                <th>Leave type</th>
                <th>Status</th>
                <th>Reason</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nov 19 2020</td>
                <td>Nov 18 2020</td>
                <td>Annual Leave</td>
                <td>Taken</td>
                <td>13h - 17h: Receive a graduate certificate & Re ...</td>
                <td className="text-right">
                  <Button
                    color="link"
                    id="tooltip636901683"
                    title=""
                    type="button"
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip636901683"
                    placement="right"
                  >
                    Cancel
                  </UncontrolledTooltip>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
