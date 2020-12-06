import { useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectUserListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [isOpenUpdateModal, toggleUpdateModal] = useState(false);
  const userList = useSelector(selectUserListData);
  const { getUserList } = useActions(
    {
      getUserList: actions.getUserList,
    },
    [actions],
  );

  useEffect(() => {
    getUserList();
    return undefined;
  }, []);

  return {
    states: {
      userList,
      isOpenAddModal,
      isOpenUpdateModal,
    },
    handlers: {
      toggleAddModal,
      toggleUpdateModal,
      getUserList,
    },
  };
};

export default useHooks;
