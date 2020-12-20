import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isOpenModal, toggleModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});

  useEffect(() => {
    const tempUser = { ...user };
    setBankAccounts(tempUser.bankAccounts);
  }, [user]);

  const handleOpenModal = useCallback(
    (account = {}) => {
      setSelectedAccount(account);
      toggleModal(true);
    },
    [setSelectedAccount, toggleModal],
  );

  const updateList = useCallback(
    account => {
      let newList = [];
      if (selectedAccount.id) {
        newList = bankAccounts.map(item =>
          item.id === selectedAccount.id ? account : item,
        );
      } else {
        newList = [...bankAccounts];
        newList.push(account);
      }

      updateUser({ ...user, bankAccounts: newList });
    },
    [selectedAccount, bankAccounts],
  );

  return {
    states: { bankAccounts, selectedAccount, isOpenModal, user },
    handlers: { handleOpenModal, toggleModal, updateList },
  };
};

export default useHooks;
