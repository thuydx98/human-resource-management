import { useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import {
  selectListDepartment,
  selectListDepartmentStatus,
  selectUserListData,
  selectUserListState,
} from './selectors';

export const useHooks = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const departments = useSelector(selectListDepartment);
  const getDepartmentStatus = useSelector(selectListDepartmentStatus);
  const users = useSelector(selectUserListData);
  const getUserState = useSelector(selectUserListState);

  const { getListDepartment, getUserList } = useActions(
    {
      getListDepartment: actions.getListDepartment,
      getUserList: actions.getUserList,
    },
    [actions],
  );

  useEffect(() => {
    getListDepartment();
    getUserList();
  }, [getListDepartment, getUserList]);

  useEffect(() => {
    if (
      getDepartmentStatus === ACTION_STATUS.SUCCESS &&
      departments.length > 0
    ) {
      setSelectedDepartment(departments[0].id);
    }
  }, [getDepartmentStatus]);

  return {
    states: {
      selectedDepartment,
      departments,
      users,
      getDepartmentStatus,
      getUserState,
    },
    handlers: {
      setSelectedDepartment,
    },
  };
};

export default useHooks;
