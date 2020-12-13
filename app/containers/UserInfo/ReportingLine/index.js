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
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function ReportingLine() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Reporting line</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Full name</th>
                <th>Title</th>
                <th>Report date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00001</td>
                <td>Dao Xuan Thuy</td>
                <td>Principle Engineering Management</td>
                <td>Aug 12 2020</td>
                <td className="text-right">
                  <Button
                    color="link"
                    id="tooltip636901683"
                    title=""
                    type="button"
                  >
                    <i className="tim-icons icon-bulb-63" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip636901683"
                    placement="right"
                  >
                    View comment
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
