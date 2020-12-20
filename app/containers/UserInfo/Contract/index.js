import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function Contract(props) {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks(props);
  const { contracts } = states;
  console.log(contracts);
  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="description">Contract</h4>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Contract No</th>
                <th>Joining Date</th>
                <th>Probation Status</th>
                <th>End Probation Date</th>
                <th>Start</th>
                <th>End</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(item => (
                <tr>
                  <td>{item.contractNo}</td>
                  <td>{moment(item.joinDate).format('MMM DD YYYY')}</td>
                  <td>{item.probationStatus}</td>
                  <td>
                    {item.endDate
                      ? moment(item.endProbationDate).format('MMM DD YYYY')
                      : '-'}
                  </td>
                  <td>
                    {item.endDate
                      ? moment(item.startDate).format('MMM DD YYYY')
                      : '-'}
                  </td>
                  <td>
                    {item.endDate
                      ? moment(item.endDate).format('MMM DD YYYY')
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
                      Edit Contract
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
