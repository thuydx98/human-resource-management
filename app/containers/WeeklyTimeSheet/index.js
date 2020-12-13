import React, { memo } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import './styles/style.scss';

const WeeklyTimeSheet = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();

  return (
    <Card className="weekly-time-sheet my-3">
      <CardBody>
        <h5 className="description">
          <span className="pt-4">Nov 30 - Dec 06</span>
          <Badge color="info" pill className="ml-3 description text-white">
            Submitted
          </Badge>
          <span className="float-right">
            Total hours: <span className="text-info">45.5</span>
          </span>
        </h5>
        <Table>
          <thead>
            <tr>
              <th>Client/ Project</th>
              <th>Activity</th>
              <th>Task</th>
              <th className="text-center" width="45">
                Mon <br />
                {'12/07'}
              </th>
              <th className="text-center" width="45">
                Tue <br />
                {'12/07'}
              </th>
              <th className="text-center" width="45">
                Wed <br />
                {'12/07'}
              </th>
              <th className="text-center" width="45">
                Thu <br />
                {'12/07'}
              </th>
              <th className="text-center" width="45">
                Fri <br />
                {'12/07'}
              </th>
              <th className="text-center text-warning" width="45">
                Sat <br />
                {'12/07'}
              </th>
              <th className="text-center text-warning" width="45">
                Sun <br />
                {'12/07'}
              </th>
              <th width="20" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input placeholder="Enter a project" />
              </td>
              <td>
                <Input placeholder="Enter an activity" />
              </td>
              <td>
                <Input placeholder="Enter your tasks" />
              </td>
              <td>
                <Input className="text-center" />
              </td>
              <td>
                <Input className="text-center" />
              </td>
              <td>
                <Input className="text-center" />
              </td>
              <td>
                <Input className="text-center" />
              </td>
              <td>
                <Input className="text-center" />
              </td>
              <td>
                <Input className="text-center text-warning" />
              </td>
              <td>
                <Input className="text-center text-warning" />
              </td>
              <td className="text-right">
                <Button
                  color="link"
                  id="tooltip636901683"
                  type="button"
                  className="px-0"
                >
                  <i className="tim-icons icon-trash-simple p-0 pt-2" />
                </Button>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip636901683"
                  placement="right"
                >
                  Delete
                </UncontrolledTooltip>
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  size="sm"
                  color="info"
                  className="btn-simple mt-1"
                  // onClick={() => toggleAddModal(true)}
                >
                  + New task
                </Button>
              </td>
              <td />
              <td className="total-text">Total hours</td>
              <td>
                <Input className="text-center" value={8} disabled />
              </td>
              <td>
                <Input className="text-center" value={8} disabled />
              </td>
              <td>
                <Input className="text-center" value={8} disabled />
              </td>
              <td>
                <Input className="text-center" value={8} disabled />
              </td>
              <td>
                <Input className="text-center" value={8} disabled />
              </td>
              <td>
                <Input
                  className="text-center text-warning"
                  value={8}
                  disabled
                />
              </td>
              <td>
                <Input
                  className="text-center text-warning"
                  value={8}
                  disabled
                />
              </td>
              <td />
            </tr>
          </tbody>
        </Table>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color="primary"
          className="btn-sm float-right ml-2"
          // onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          color="info"
          className="btn-sm float-right"
          // onClick={onSubmit}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(WeeklyTimeSheet);
