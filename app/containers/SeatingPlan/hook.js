import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions as userActions } from 'containers/UserList/slice';
import { actions } from './slice';
import { selectListSeatData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('1');
  const seats = useSelector(selectListSeatData);
  const { getListSeat, getUserList } = useActions(
    {
      getListSeat: actions.getListSeat,
      getUserList: userActions.getUserList,
    },
    [actions],
  );

  useEffect(() => {
    if (!seats || seats.length === 0) {
      getListSeat();
    }
  }, [getListSeat]);

  const toggleUpdateModal = useCallback((isOpen, user) => {
    setIsOpenUpdateModal(isOpen);
  }, []);

  // const updateDepartmentInList = useCallback(
  //   user => {
  //     const users = DepartmentList.map(item =>
  //       user.employee_id === item.employee_id ? user : item,
  //     );
  //     setDepartmentList(users);
  //   },
  //   [DepartmentList, setDepartmentList],
  // );

  return {
    states: {
      isOpenAddModal,
      isOpenUpdateModal,
      seats,
      selectedFloor,
    },
    handlers: {
      toggleAddModal,
      toggleUpdateModal,
      setSelectedFloor,
      // updateDepartmentInList,
    },
  };
};

export default useHooks;
