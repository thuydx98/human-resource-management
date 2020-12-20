import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import get from 'lodash/fp/get';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function ProjectInfo(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { projects } = states;

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Project information</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Start from</th>
                <th>To</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(item => (
                <tr>
                  <td>{item.project}</td>
                  <td>{item.client || '-'}</td>
                  <td>
                    {item.startDate
                      ? moment(item.startDate).format('MMMM DD YYYY')
                      : '-'}
                  </td>
                  <td>
                    {item.endDate
                      ? moment(item.endDate).format('MMMM DD YYYY')
                      : '-'}
                  </td>
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
                      placement="right"
                    >
                      Edit
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
