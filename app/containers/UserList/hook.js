/* eslint-disable no-alert */
import { useCallback, useEffect, useRef, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import {
  selectUserListData,
  selectUserListState,
  selectDeleteState,
} from './selectors';

export const useHooks = () => {
  const notificationRef = useRef();
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const userList = useSelector(selectUserListData);
  const getUserListState = useSelector(selectUserListState);
  const deleteState = useSelector(selectDeleteState);
  const { getUserList, deleteUser, setUserList, resetDeleteState } = useActions(
    {
      getUserList: actions.getUserList,
      deleteUser: actions.deleteUser,
      setUserList: actions.setUserList,
      resetDeleteState: actions.resetDeleteState,
    },
    [actions],
  );

  useEffect(() => {
    getUserList();
    return undefined;
  }, []);

  useEffect(() => {
    if (deleteState === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Delete user succeeded');
      return () => resetDeleteState();
    }

    if (deleteState === ACTION_STATUS.FAILED) {
      notificationRef.current.notifyError('Delete user failed');
      return () => resetDeleteState();
    }
  }, [deleteState]);

  const handleSearch = useCallback(
    key => {
      setSearch(key);
      setPageIndex(1);
      if (key) {
        setSearchResult(
          userList.filter(
            item =>
              `${item.firstname} ${item.lastname}`
                .toLowerCase()
                .includes(key.toLowerCase()) ||
              item.email.startsWith(key) ||
              item.employee_code.toString().startsWith(key) ||
              `0${item.phone}`.startsWith(key),
          ),
        );
      }
    },
    [userList],
  );

  const handleDeleteUser = useCallback(
    userId => {
      if (window.confirm('Are you sure want to delete this user?')) {
        deleteUser(userId);
        setUserList(userList.filter(i => i.id !== userId));
      }
    },
    [userList],
  );

  return {
    states: {
      notificationRef,
      userList,
      isOpenAddModal,
      pageIndex,
      searchResult,
      search,
      getUserListState,
    },
    handlers: {
      toggleAddModal,
      getUserList,
      setPageIndex,
      handleSearch,
      handleDeleteUser,
    },
  };
};

export default useHooks;
