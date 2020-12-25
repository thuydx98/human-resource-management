import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import {
  selectUserListData,
  selectSaveSeatData,
  selectSaveSeatState,
} from '../selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { isOpen, toggleModal, seat, updateList, selectedFloor } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payload, setPayload] = useState({});

  const users = useSelector(selectUserListData);
  const saveSeatData = useSelector(selectSaveSeatData);
  const saveSeatState = useSelector(selectSaveSeatState);

  const { saveSeat, resetState } = useActions(
    {
      saveSeat: actions.saveSeat,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    setIsOpenModal(isOpen);
    setPayload(seat);
  }, [isOpen]);

  useEffect(() => {
    if (saveSeatState === ACTION_STATUS.SUCCESS) {
      if (saveSeatData.employeeId) {
        const { firstname, lastname, department } = users.find(
          item => item.id === saveSeatData.employeeId,
        );
        updateList({ ...saveSeatData, firstname, lastname, department });
      } else {
        updateList({ ...saveSeatData });
      }
      handleCloseModal();
      notificationRef.current.notifySuccess('Save seat succeeded');
    }
  }, [saveSeatData, saveSeatState, users]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    setIsSubmitted(false);
    setPayload({});
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      if (payload.seat) {
        saveSeat({ ...payload, floor: selectedFloor });
      }
    },
    [payload, selectedFloor],
  );

  return {
    states: {
      isOpenModal,
      payload,
      notificationRef,
      isSubmitted,
      users,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setPayload,
    },
  };
};

export default useHooks;
