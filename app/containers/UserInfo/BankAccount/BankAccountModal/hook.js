import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import {
  selectSaveBankAccountState,
  selectBankList,
  selectSaveBankAccountData,
} from '../selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { bankAccount, isOpen, toggleModal, user, updateList } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payload, setPayload] = useState({});

  const saveBankAccountState = useSelector(selectSaveBankAccountState);
  const saveBankAccountData = useSelector(selectSaveBankAccountData);
  const bankList = useSelector(selectBankList);

  const { saveBankAccount, getBankList, resetState } = useActions(
    {
      saveBankAccount: actions.saveBankAccount,
      getBankList: actions.getBankList,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    if (isOpen && bankList.length === 0) {
      getBankList();
    }
  }, [isOpen]);
  useEffect(() => setPayload(bankAccount), [bankAccount]);
  useEffect(() => setIsOpenModal(isOpen), [isOpen]);
  useEffect(() => {
    if (saveBankAccountState === ACTION_STATUS.SUCCESS) {
      const bank = bankList.find(
        item => item.id === saveBankAccountData.bankId,
      );
      updateList({ ...saveBankAccountData, bankName: bank.name });
      handleCloseModal();
      notificationRef.current.notifySuccess('Save bank account succeeded');
    }
  }, [saveBankAccountData, saveBankAccountState, bankList]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    setIsSubmitted(false);
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      if (payload.bankId && payload.accountNumber && payload.accountName) {
        saveBankAccount({ ...payload, userId: user.id });
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
      bankList,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setPayload,
    },
  };
};

export default useHooks;
