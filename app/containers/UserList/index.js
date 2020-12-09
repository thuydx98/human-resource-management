import React from 'react';
import { Button, CardTitle, Table } from 'reactstrap';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import AddUserModal from './AddUserModal/Loadable';
import UpdateUserModal from './UpdateUserModal/Loadable';

export default function UserList() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { isOpenAddModal, isOpenUpdateModal, userList, selectedUser } = states;
  const {
    toggleAddModal,
    toggleUpdateModal,
    getUserList,
    updateUserInfo,
  } = handlers;

  return (
    <div className="content">
      <CardTitle tag="h2">
        User Management
        <Button
          className="ml-3"
          color="info"
          size="sm"
          onClick={() => toggleAddModal(true)}
        >
          Add new
        </Button>
      </CardTitle>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th className="text-center">Birthday</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map(item => (
              <tr key={item.employee_id}>
                <td>{`${item.firstname || ''} ${item.lastname || ''}`}</td>
                <td>{`${item.department_name || ''} ${item.position ||
                  ''}`}</td>
                <td>{item.email}</td>
                <td className="text-center">
                  {item.birthday
                    ? moment(item.birthday).format('YYYY-MM-DD')
                    : ''}
                </td>
                <td className="text-right">
                  <Button
                    className="btn-icon mr-3"
                    color="info"
                    size="sm"
                    onClick={() => toggleUpdateModal(true, item)}
                  >
                    <i className="fa fa-edit" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <AddUserModal
        isOpen={isOpenAddModal}
        toggleModal={toggleAddModal}
        reloadList={getUserList}
      />
      <UpdateUserModal
        isOpen={isOpenUpdateModal}
        toggleModal={toggleUpdateModal}
        selectedUser={selectedUser}
        updateUserInfo={updateUserInfo}
      />
    </div>
  );
}
