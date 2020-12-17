/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import moment from 'moment';
import get from 'lodash/fp/get';
import { useHistory } from 'react-router-dom';
import Pagination from 'components/TablePagination';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import AddUserModal from './AddUserModal/Loadable';
import UpdateUserModal from './UpdateUserModal/Loadable';
import './styles/style.scss';

export default function UserList() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const history = useHistory();
  const { states, handlers } = useHooks();
  const {
    isOpenAddModal,
    isOpenUpdateModal,
    userList,
    selectedUser,
    pageIndex,
  } = states;

  const {
    toggleAddModal,
    toggleUpdateModal,
    getUserList,
    updateUserInfo,
    setPageIndex,
  } = handlers;

  const renderItems = () => {
    const skip = (pageIndex - 1) * 10;
    const elements = [];
    for (let i = skip; i < skip + 10; i += 1) {
      if (!userList[i]) break;
      elements.push(
        <tr key={userList[i].id}>
          <td className="d-flex">
            <div className="user-avatar">
              <img src="https://hr.kms-technology.com/api/employees/photo/2491/320" />
            </div>
            <div className="ml-2">
              <div className="user-name">
                {`${userList[i].firstname || ''} ${userList[i].lastname || ''}`}
              </div>
              <div className="user-title">Software Engineering</div>
              <div className="user-title">ID.2097</div>
            </div>
          </td>
          <td>
            <div className="title">Department</div>
            <div className="value">{userList[i].department_name || '-'}</div>
            <div className="title">Role</div>
            <div className="value">{userList[i].permission || '-'}</div>
          </td>
          <td>
            <div className="detail">
              <i className="tim-icons icon-tablet-2" />
              {userList[i].phone ? `0${userList[i].phone}` : '-'}
            </div>
            <div className="detail">
              <i className="tim-icons icon-email-85" />
              {userList[i].email || '-'}
            </div>
            <div className="detail">
              <i className="tim-icons icon-calendar-60" />
              {userList[i].birthday
                ? moment(userList[i].birthday).format('MMM DD YYYY')
                : '-'}
            </div>
          </td>
          <td className="text-right">
            <Button
              color="link"
              id={`tooltip${userList[i].id}`}
              title=""
              type="button"
              onClick={() => history.push(`/information/${userList[i].id}`)}
            >
              <i className="tim-icons icon-pencil" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              target={`tooltip${userList[i].id}`}
              placement="right"
            >
              Edit User
            </UncontrolledTooltip>
          </td>
        </tr>,
      );
    }

    return elements;
  };

  return (
    <div className="content directory">
      <Row>
        <Col md={4}>
          <Input placeholder="Search.." />
        </Col>
        <Col>
          <Button
            size="sm"
            color="info"
            className="btn-simple float-right"
            onClick={() => toggleAddModal(true)}
          >
            <i className="tim-icons icon-simple-add" /> New
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th />
            <th width="250" />
            <th />
            <th width="30" />
          </tr>
        </thead>
        <tbody>{userList && renderItems()}</tbody>
      </Table>

      <Pagination
        total={get('length', userList)}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />

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
