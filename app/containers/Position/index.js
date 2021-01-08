import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import UserCard from 'components/UserCard';
import Loading from 'components/Loading';
import { ACTION_STATUS } from 'utils/constants';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';

export default function SeatingPlan() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const {
    selectedDepartment,
    departments,
    users,
    getDepartmentStatus,
    getUserState,
  } = states;
  const { setSelectedDepartment } = handlers;

  const selectedUsers = users
    ? users.filter(item => item.departmentId === selectedDepartment)
    : [];
  let managers = selectedUsers.filter(item => item.permission === 'Manager');
  const deputies = selectedUsers.filter(item => item.permission === 'Deputy');
  const employees = selectedUsers.filter(
    item => item.permission === 'Employee',
  );

  managers = managers.length > 0 ? managers : [{ permission: 'Manager' }];

  return (
    <div className="content">
      <Row>
        <Col md={3}>
          <Input
            placeholder="Choose..."
            type="select"
            className="ml-3"
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
          >
            {departments &&
              departments.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Input>
        </Col>
      </Row>

      {selectedDepartment && (
        <>
          <Row className="justify-content-center">
            {managers.map(item => (
              <UserCard key={item.id} color="info" user={item} />
            ))}
          </Row>
          <Row className="justify-content-center">
            {deputies.map(item => (
              <UserCard key={item.id} color="primary" user={item} />
            ))}
          </Row>
          <Row className="justify-content-center">
            {employees.map(item => (
              <UserCard key={item.id} user={item} />
            ))}
          </Row>
        </>
      )}

      {(getUserState === ACTION_STATUS.PENDING ||
        getDepartmentStatus === ACTION_STATUS.PENDING) && <Loading />}
    </div>
  );
}
