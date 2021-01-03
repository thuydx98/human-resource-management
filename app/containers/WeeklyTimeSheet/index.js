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
import Notification from 'components/Notification';
import SubmitButton from 'components/Buttons/SubmitButton';
import moment from 'moment';
import AuthUtils from 'utils/authentication';
import useHooks from './hook';
import './styles/style.scss';

const WeeklyTimeSheet = props => {
  const { states, handlers } = useHooks(props);
  const {
    monday,
    tasks,
    details,
    loadStatus,
    notificationRef,
    saveStatus,
    submitStatus,
  } = states;
  const {
    getWorkingHour,
    updateWorkingHour,
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask,
    handleSave,
    handleSubmit,
  } = handlers;
  const { role } = AuthUtils.getAuthInfo();
  const isAllow = role === 'Admin' || role === 'Manager';
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
      <Notification ref={notificationRef} />
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
                      : 'danger'
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
                      .add(1, 'd')
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Wed <br />
                    {moment(monday)
                      .add(2, 'd')
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Thu <br />
                    {moment(monday)
                      .add(3, 'd')
                      .format('MM/DD')}
                  </th>
                  <th className="text-center" width="45">
                    Fri <br />
                    {moment(monday)
                      .add(4, 'd')
                      .format('MM/DD')}
                  </th>
                  <th className="text-center text-warning" width="45">
                    Sat <br />
                    {moment(monday)
                      .add(5, 'd')
                      .format('MM/DD')}
                  </th>
                  <th className="text-center text-warning" width="45">
                    Sun <br />
                    {moment(monday)
                      .add(6, 'd')
                      .format('MM/DD')}
                  </th>
                  {isAllow && <th width="20" />}
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
                          disabled={!isAllow}
                          onChange={e =>
                            handleUpdateTask({
                              ...item,
                              project: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Enter an activity"
                          value={item.activity}
                          disabled={!isAllow}
                          onChange={e =>
                            handleUpdateTask({
                              ...item,
                              activity: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Enter your tasks"
                          value={item.task}
                          disabled={!isAllow}
                          onChange={e =>
                            handleUpdateTask({ ...item, task: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(item.id, monday)}
                          onChange={e => updateWorkingHour(item.id, monday, e)}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(1, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(1, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(2, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(2, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(3, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(3, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(4, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(4, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(5, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(5, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="text-center"
                          disabled={!isAllow}
                          value={getWorkingHour(
                            item.id,
                            moment(monday).add(6, 'd'),
                          )}
                          onChange={e =>
                            updateWorkingHour(
                              item.id,
                              moment(monday).add(6, 'd'),
                              e,
                            )
                          }
                        />
                      </td>
                      {isAllow && (
                        <td className="text-right">
                          <Button
                            color="link"
                            id={`tooltip${item.id}`}
                            type="button"
                            className="px-0"
                            onClick={() => handleDeleteTask(item.id)}
                          >
                            <i className="tim-icons icon-trash-simple text-info p-0 pt-2" />
                          </Button>
                          <UncontrolledTooltip
                            target={`tooltip${item.id}`}
                            placement="right"
                          >
                            Delete
                          </UncontrolledTooltip>
                        </td>
                      )}
                    </tr>
                  ))}
                <tr>
                  <td>
                    {isAllow &&
                      (!tasks || !tasks.length > 0 || !tasks[0].submitted) && (
                        <Button
                          size="sm"
                          color="info"
                          className="btn-simple mt-1"
                          onClick={handleCreateTask}
                          disabled={
                            tasks && tasks.length > 0 && tasks[0].submitted
                          }
                        >
                          + New task
                        </Button>
                      )}
                  </td>
                  <td />
                  <td className="total-text">Total hours</td>
                  <td>
                    <Input
                      className={`text-center ${getWorkingHour(null, monday) >
                        8 && 'text-warning'}`}
                      value={getWorkingHour(null, monday)}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className={`text-center ${getWorkingHour(
                        null,
                        moment(monday).add(1, 'd'),
                      ) > 8 && 'text-warning'}`}
                      value={getWorkingHour(null, moment(monday).add(1, 'd'))}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className={`text-center ${getWorkingHour(
                        null,
                        moment(monday).add(2, 'd'),
                      ) > 8 && 'text-warning'}`}
                      value={getWorkingHour(null, moment(monday).add(2, 'd'))}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className={`text-center ${getWorkingHour(
                        null,
                        moment(monday).add(3, 'd'),
                      ) > 8 && 'text-warning'}`}
                      value={getWorkingHour(null, moment(monday).add(3, 'd'))}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className={`text-center ${getWorkingHour(
                        null,
                        moment(monday).add(4, 'd'),
                      ) > 8 && 'text-warning'}`}
                      value={getWorkingHour(null, moment(monday).add(4, 'd'))}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="text-center text-warning"
                      value={getWorkingHour(null, moment(monday).add(5, 'd'))}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="text-center text-warning"
                      value={getWorkingHour(null, moment(monday).add(6, 'd'))}
                      disabled
                    />
                  </td>
                  {isAllow && <td />}
                </tr>
              </tbody>
            </Table>
          </CardBody>

          {isAllow && (!tasks || !tasks.length > 0 || !tasks[0].submitted) && (
            <CardFooter className="pt-0">
              <SubmitButton
                color="primary"
                className="btn-sm float-right ml-2"
                disabled={
                  !tasks ||
                  tasks.filter(
                    item => item.task || item.activity || item.project,
                  ).length === 0 ||
                  tasks[0].submitted ||
                  moment(monday).endOf('isoweek') > moment() ||
                  saveStatus === ACTION_STATUS.PENDING ||
                  submitStatus === ACTION_STATUS.PENDING
                }
                onClick={handleSubmit}
                loading={submitStatus === ACTION_STATUS.PENDING}
                btn="btn"
              >
                Submit
              </SubmitButton>
              <SubmitButton
                color="info"
                className="btn btn-sm float-right"
                disabled={
                  !tasks ||
                  (tasks.length > 0 && tasks[0].submitted) ||
                  saveStatus === ACTION_STATUS.PENDING ||
                  submitStatus === ACTION_STATUS.PENDING
                }
                onClick={handleSave}
                loading={saveStatus === ACTION_STATUS.PENDING}
                btn="btn"
              >
                Save
              </SubmitButton>
            </CardFooter>
          )}
        </>
      )}

      {(!loadStatus || loadStatus === ACTION_STATUS.PENDING) && (
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
