import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import { selectSaveFeedbackState, selectSaveFeedbackData } from '../selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { isOpen, toggleModal, user, updateList } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payload, setPayload] = useState({});

  const saveFeedbackState = useSelector(selectSaveFeedbackState);
  const saveFeedbackData = useSelector(selectSaveFeedbackData);

  const { saveFeedback, resetState } = useActions(
    {
      saveFeedback: actions.saveFeedback,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => setIsOpenModal(isOpen), [isOpen]);
  useEffect(() => {
    if (saveFeedbackState === ACTION_STATUS.SUCCESS) {
      updateList(saveFeedbackData);
      handleCloseModal();
      notificationRef.current.notifySuccess('Save feedback succeeded');
    }
  }, [saveFeedbackData, saveFeedbackState]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    setIsSubmitted(false);
    setPayload('');
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      if (payload.content) {
        saveFeedback({ ...payload, userId: user.id });
      }
    },
    [payload, user],
  );

  return {
    states: {
      isOpenModal,
      payload,
      notificationRef,
      isSubmitted,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setPayload,
    },
  };
};

export default useHooks;
