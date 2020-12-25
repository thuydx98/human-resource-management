import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectListSeatData } from './selectors';

export const useHooks = () => {
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [isOpenModal, toggleModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({});

  const seats = useSelector(selectListSeatData);

  const { getListSeat, getUserList, setListSeat } = useActions(
    {
      getListSeat: actions.getListSeat,
      getUserList: actions.getUserList,
      setListSeat: actions.setListSeat,
    },
    [actions],
  );

  useEffect(() => {
    if (!seats || seats.length === 0) {
      getListSeat();
      getUserList();
    }
  }, [getListSeat, getUserList]);

  const handleOpenModal = useCallback(
    (seat = {}) => {
      setSelectedSeat(seat);
      toggleModal(true);
    },
    [setSelectedSeat, toggleModal],
  );

  const updateList = useCallback(
    seat => {
      let list = [...seats];
      if (seat.employeeId) {
        list = list.map(item =>
          item.employeeId === seat.employeeId
            ? { ...item, firstname: null, lastname: null, employeeId: null }
            : item,
        );
      }

      if (selectedSeat.id) {
        list = list.map(item => (item.id === selectedSeat.id ? seat : item));
      } else {
        list.push(seat);
      }

      setListSeat(list);
    },
    [seats, selectedSeat],
  );

  return {
    states: {
      seats,
      selectedFloor,
      selectedSeat,
      isOpenModal,
    },
    handlers: {
      setSelectedFloor,
      setSelectedSeat,
      toggleModal,
      handleOpenModal,
      updateList,
    },
  };
};

export default useHooks;
