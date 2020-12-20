import { useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectUserListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const userList = useSelector(selectUserListData);
  const { getUserList } = useActions({ getUserList: actions.getUserList }, [
    actions,
  ]);

  useEffect(() => {
    getUserList();
    return undefined;
  }, []);

  return {
    states: {
      userList,
      isOpenAddModal,
      pageIndex,
    },
    handlers: {
      toggleAddModal,
      getUserList,
      setPageIndex,
    },
  };
};

export default useHooks;
