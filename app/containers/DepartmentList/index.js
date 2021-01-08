import React from 'react';
import { Button, Col, Row, Table, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function DepartmentList() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { departments } = states;

  return (
    <div className="content">
      <Row>
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
            <th>Location</th>
            <th>Created date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments &&
            departments.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <th>{moment(item.createdAt).format('YYYY-MM-DD')}</th>
                <td className="text-right">
                  <Button
                    color="link"
                    id="tooltip636901683"
                    title=""
                    type="button"
                  >
                    <i className="tim-icons icon-pencil" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip636901683"
                    placement="top"
                  >
                    Edit
                  </UncontrolledTooltip>
                  <Button
                    color="link"
                    id={`tooltip${item.id}_delete`}
                    title=""
                    type="button"
                  >
                    <i className="tim-icons icon-trash-simple" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target={`tooltip${item.id}_delete`}
                    placement="top"
                  >
                    Delete
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
