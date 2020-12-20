import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { selectAddUserStatus } from './selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { isOpen, toggleModal } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [payload, setPayload] = useState({});

  const addUserState = useSelector(selectAddUserStatus);

  const { addUser, resetState } = useActions(
    {
      addUser: actions.addUser,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => setIsOpenModal(isOpen), [isOpen]);

  useEffect(() => {
    if (addUserState === ACTION_STATUS.SUCCESS) {
      const { reloadList } = props;
      reloadList();
      handleCloseModal();
      notificationRef.current.notifySuccess('Create new user succeeded');
    }
  }, [addUserState]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      if (payload.email && payload.password) {
        addUser(payload);
      }
    },
    [payload],
  );

  return {
    states: {
      isOpenModal,
      payload,
      notificationRef,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setPayload,
    },
  };
};

export default useHooks;
