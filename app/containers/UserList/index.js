import React from 'react';
import { Button, Table } from 'reactstrap';
import useHooks from './hook';
import UserModal from './UserModal/Loadable';

export default function UserList() {
  const { states, handlers } = useHooks();
  const { isOpenAddEditModal } = states;
  const { toggleAddEditModal } = handlers;

  return (
    <div className="content">
      <h3>User Management</h3>
      <Table>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Name</th>
            <th>Job Position</th>
            <th className="text-center">Since</th>
            <th className="text-right">Salary</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">3</td>
            <td>Alex Mike</td>
            <td>Designer</td>
            <td className="text-center">2012</td>
            <td className="text-right">€ 99,201</td>
            <td className="text-right">
              <Button
                className="btn-icon btn-simple mr-2"
                color="success"
                size="sm"
                onClick={() => toggleAddEditModal(true)}
              >
                <i className="fa fa-edit" />
              </Button>
              <Button className="btn-icon btn-simple" color="danger" size="sm">
                <i className="fa fa-times" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <UserModal isOpen={isOpenAddEditModal} toggleModal={toggleAddEditModal} />
    </div>
  );
}
