import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectUserListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const userList = useSelector(selectUserListData);
  const { getUserList, setUserList } = useActions(
    {
      getUserList: actions.getUserList,
      setUserList: actions.setUserList,
    },
    [actions],
  );

  useEffect(() => {
    getUserList();
    return undefined;
  }, []);

  const toggleUpdateModal = useCallback((isOpen, user) => {
    setSelectedUser(user);
    setIsOpenUpdateModal(isOpen);
  }, []);

  const updateUserInfo = useCallback(
    user => {
      const users = userList.map(item => (user.id === item.id ? user : item));
      setUserList(users);
    },
    [userList, setUserList],
  );

  return {
    states: {
      userList,
      isOpenAddModal,
      isOpenUpdateModal,
      selectedUser,
      pageIndex,
    },
    handlers: {
      toggleAddModal,
      toggleUpdateModal,
      getUserList,
      updateUserInfo,
      setPageIndex,
    },
  };
};

export default useHooks;
