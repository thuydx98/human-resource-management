import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { selectUpdateUserStatus } from './selectors';

export const useHooks = props => {
  const { isOpen, toggleModal, selectedUser, updateUserInfo } = props;
  const [user, setUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const updateUserState = useSelector(selectUpdateUserStatus);

  const { updateUser, resetState } = useActions(
    {
      updateUser: actions.updateUser,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => setUser(selectedUser), [isOpen, selectedUser]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    resetState();
    setIsSubmitted(false);
  }, [toggleModal]);

  useEffect(() => {
    if (updateUserState === ACTION_STATUS.SUCCESS) {
      updateUserInfo(user);
      handleCloseModal();
    }
  }, [updateUserState, user]);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (
      user.firstname &&
      user.lastname &&
      user.birthday &&
      user.phone &&
      user.address &&
      user.identity_card &&
      user.gender
    ) {
      updateUser({
        ...user,
        firstName: user.firstname,
        lastName: user.lastname,
        identityCard: user.identity_card,
      });
    }
  }, [user]);

  return {
    states: {
      isOpen,
      user,
      isSubmitted,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setUser,
    },
  };
};

export default useHooks;
