/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Input,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { ACTION_STATUS } from 'utils/constants';
import moment from 'moment';
import useHooks from './hook';
import './styles/style.scss';

const WeeklyTimeSheet = props => {
  const { states, handlers } = useHooks(props);
  const { monday, tasks, details, loadStatus } = states;
  const { getWorkingHour, updateWorkingHour } = handlers;
  const startDate = monday ? monday.format('MMMM DD') : '';
  const endDate = monday
    ? moment(monday)
        .endOf('isoweek')
        .format('MMMM DD')
    : '';
  const totalHours = details
    ? details.reduce((a, b) => a + b.workingHour, 0)
    : 0;

  return (
    <Card className="weekly-time-sheet my-3">
      {loadStatus === ACTION_STATUS.SUCCESS && (
        <>
          <CardBody>
            <h5 className="description">
              <span className="pt-4">
                {startDate} - {endDate}
              </span>
              {moment(monday).endOf('isoweek') <= moment() && (
                <Badge
                  color={
                    tasks && tasks.length > 0 && tasks[0].submitted
                      ? 'info'
                      : 'dander'
                  }
                  pill
                  className="ml-3 description text-white"
                >
                  {tasks && tasks.length > 0 && tasks[0].submitted
                    ? 'Submitted'
                    : 'Not-Submitted'}
                </Badge>
              )}
              <span className="float-right">
                Total hours: <span className="text-info">{totalHours}</span>
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
                    {monday.format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Tue <br />
                    {moment(monday)
                      .add('d', 1)
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Wed <br />
                    {moment(monday)
                      .add('d', 2)
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Thu <br />
                    {moment(monday)
                      .add('d', 3)
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Fri <br />
                    {moment(monday)
                      .add('d', 4)
                      .format('MM/DD')}
                  </th>
                  <th className="text-center text-warning" width="45">
                    {moment(monday)
                      .add('d', 5)
                      .format('MM/DD')}
                    {'12/07'}
                  </th>
                  <th className="text-center text-warning" width="45">
                    Sun <br />
                    {moment(monday)
                      .add('d', 6)
                      .format('MM/DD')}
                  </th>
                  <th width="20" />
                </tr>
              </thead>
              <tbody>
                {tasks &&
                  tasks.map(item => (
                    <tr key={item.id}>
                      <td>
                        <Input
                          placeholder="Enter a project"
                          value={item.project}
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Enter an activity"
                          value={item.activity}
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Enter your tasks"
                          value={item.task}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          value={getWorkingHour(item.id, monday)}
                          onChange={e => updateWorkingHour(item.id, monday, e)}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 1),
                          )}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 2),
                          )}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 3),
                          )}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 4),
                          )}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 5),
                          )}
                        />
                      </td>
                      <td>
                        <Input
                          className="text-center"
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add('d', 6),
                          )}
                        />
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
                  ))}
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
              disabled={
                !tasks ||
                tasks.length === 0 ||
                tasks[0].submitted ||
                moment(monday).endOf('isoweek') > moment()
              }
              // onClick={onSubmit}
            >
              Submit
            </Button>
            <Button
              color="info"
              className="btn-sm float-right"
              disabled={!tasks || (tasks.length > 0 && tasks[0].submitted)}
              // onClick={onSubmit}
            >
              Save
            </Button>
          </CardFooter>
        </>
      )}

      {loadStatus === ACTION_STATUS.PENDING && (
        <h5 className="w-100 text-center text-info my-3">
          <Spinner size="sm" color="info" className="mr-2" />
          Loading...
        </h5>
      )}
      {loadStatus === ACTION_STATUS.FAILED && (
        <h5 className="w-100 text-center text-danger">Load data failed</h5>
      )}
    </Card>
  );
};

export default memo(WeeklyTimeSheet);
