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
import AuthUtils from 'utils/authentication';
import Loading from 'components/Loading';
import { ACTION_STATUS } from 'utils/constants';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks from './hook';
import AddUserModal from './AddUserModal/Loadable';
import './styles/style.scss';

export default function UserList() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const history = useHistory();
  const { states, handlers } = useHooks();
  const {
    isOpenAddModal,
    userList,
    pageIndex,
    search,
    searchResult,
    getUserListState,
  } = states;

  const { toggleAddModal, getUserList, setPageIndex, handleSearch } = handlers;
  const { role } = AuthUtils.getAuthInfo();

  const renderItems = () => {
    const users = search ? searchResult : userList;
    const skip = (pageIndex - 1) * 10;
    const elements = [];
    for (let i = skip; i < skip + 10; i += 1) {
      if (!users[i]) break;
      elements.push(
        <tr key={users[i].id}>
          <td className="d-flex">
            <div className="user-avatar">
              <img
                src={
                  users[i].avatar || require('assets/img/default-avatar.png')
                }
              />
            </div>
            <div className="ml-4">
              <div className="user-name">
                {`${users[i].firstname || ''} ${users[i].lastname || ''}`}
              </div>
              {/* <div className="user-title">Software Engineering</div> */}
              <div className="user-title">{users[i].employee_code}</div>
            </div>
          </td>
          <td>
            <div className="title">Department</div>
            <div className="value">{users[i].department || '-'}</div>
            <div className="title">Role</div>
            <div className="value">{users[i].permission || '-'}</div>
          </td>
          <td>
            <div className="detail">
              <i className="tim-icons icon-tablet-2" />
              {users[i].phone ? `0${users[i].phone}` : '-'}
            </div>
            <div className="detail">
              <i className="tim-icons icon-email-85" />
              {users[i].email || '-'}
            </div>
            <div className="detail">
              <i className="tim-icons icon-calendar-60" />
              {users[i].birthday
                ? moment(users[i].birthday).format('MMM DD YYYY')
                : '-'}
            </div>
          </td>
          {role === 'Manager' && (
            <td className="text-right">
              <Button
                color="link"
                id={`tooltip${users[i].id}`}
                onClick={() => history.push(`/information/${users[i].id}`)}
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                target={`tooltip${users[i].id}`}
                placement="right"
              >
                Edit User
              </UncontrolledTooltip>
            </td>
          )}
        </tr>,
      );
    }

    return elements;
  };

  return (
    <div className="content directory">
      <Row>
        <Col md={4}>
          <Input
            placeholder="Search.."
            onChange={e => handleSearch(e.target.value)}
          />
        </Col>

        {role === 'Manager' && (
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
        )}
      </Row>
      <Table>
        <thead>
          <tr>
            <th />
            <th width="250" />
            <th />
            {role === 'Manager' && <th width="30" />}
          </tr>
        </thead>
        <tbody>{userList && renderItems()}</tbody>
      </Table>

      {getUserListState === ACTION_STATUS.PENDING && <Loading />}

      <Pagination
        total={get('length', search ? searchResult : userList)}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />

      <AddUserModal
        isOpen={isOpenAddModal}
        toggleModal={toggleAddModal}
        reloadList={getUserList}
      />
    </div>
  );
}
