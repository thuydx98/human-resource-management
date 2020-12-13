import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function SummaryLeave() {
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
                name="gender"
                placeholder="Choose..."
                type="select"
                defaultValue={get('gender', user)}
                onChange={e => setUser({ ...user, gender: e.target.value })}
                invalid={isSubmitted && !user.gender}
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
                <th>Leave type</th>
                <th className="text-right">Total (days)</th>
                <th className="text-right">Taken (days)</th>
                <th className="text-right">Planned (days)</th>
                <th className="text-right">Remaining (days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Annual Leave</td>
                <td className="text-right">12</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <td>Non-paid Leave</td>
                <td className="text-right">30</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
