import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectDepartmentListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const departments = useSelector(selectDepartmentListData);
  const { getDepartmentList, setDepartmentList } = useActions(
    {
      getDepartmentList: actions.getDepartmentList,
      setDepartmentList: actions.setDepartmentList,
    },
    [actions],
  );

  useEffect(() => {
    getDepartmentList();
    return undefined;
  }, []);

  const toggleUpdateModal = useCallback((isOpen, user) => {
    setSelectedDepartment(user);
    setIsOpenUpdateModal(isOpen);
  }, []);

  const updateDepartmentInList = useCallback(
    user => {
      const users = departments.map(item =>
        user.employee_id === item.employee_id ? user : item,
      );
      setDepartmentList(users);
    },
    [departments, setDepartmentList],
  );

  return {
    states: {
      departments,
      isOpenAddModal,
      isOpenUpdateModal,
      selectedDepartment,
    },
    handlers: {
      toggleAddModal,
      toggleUpdateModal,
      getDepartmentList,
      updateDepartmentInList,
    },
  };
};

export default useHooks;
