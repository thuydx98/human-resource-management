import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import { selectSaveContractState, selectSaveContractData } from '../selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { contract, isOpen, toggleModal, user, updateList } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payload, setPayload] = useState({});

  const saveContractState = useSelector(selectSaveContractState);
  const saveContractData = useSelector(selectSaveContractData);

  const { saveContract, resetState } = useActions(
    {
      saveContract: actions.saveContract,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => setPayload(contract), [contract]);
  useEffect(() => setIsOpenModal(isOpen), [isOpen]);
  useEffect(() => {
    if (saveContractState === ACTION_STATUS.SUCCESS) {
      updateList(saveContractData);
      handleCloseModal();
      notificationRef.current.notifySuccess('Save contract succeeded');
    }
  }, [saveContractData, saveContractState]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    setIsSubmitted(false);
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      if (
        payload.contractNo &&
        payload.startDate &&
        payload.joinDate &&
        payload.probationStatus &&
        payload.grossSalary
      ) {
        saveContract({ ...payload, userId: user.id });
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
