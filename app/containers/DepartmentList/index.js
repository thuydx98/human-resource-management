import React from 'react';
import {
  Button,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function DepartmentList() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();

  return (
    <div className="content">
      <Row>
        <Col md={4}>
          <Input placeholder="Search.." />
        </Col>
        <Col>
          <Button size="sm" color="info" className="btn-simple float-right">
            <i className="tim-icons icon-simple-add" /> New
          </Button>
        </Col>
      </Row>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total members</th>
            <th>Created date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Neumann</td>
            <td>Top department of company</td>
            <th>100</th>
            <th>Aug 12 2018</th>
            <td className="text-right">
              <Button color="link" id="tooltip636901683" title="" type="button">
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip636901683"
                placement="right"
              >
                Edit department
              </UncontrolledTooltip>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
