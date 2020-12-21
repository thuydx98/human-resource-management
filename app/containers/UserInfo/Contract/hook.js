import { useCallback, useEffect, useState } from 'react';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [contracts, setContracts] = useState([]);
  const [isOpenModal, toggleModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState({});

  useEffect(() => {
    const tempUser = { ...user };
    setContracts(tempUser.contracts);
  }, [user]);

  const handleOpenModal = useCallback(
    (contract = {}) => {
      setSelectedContract(contract);
      toggleModal(true);
    },
    [setSelectedContract, toggleModal],
  );

  const updateList = useCallback(
    contract => {
      let newList = [];
      if (selectedContract.id) {
        newList = contracts.map(item =>
          item.id === selectedContract.id ? contract : item,
        );
      } else {
        newList = [...contracts];
        newList.push(contract);
      }

      updateUser({ ...user, contracts: newList });
    },
    [selectedContract, contracts],
  );

  return {
    states: { contracts, selectedContract, isOpenModal, user },
    handlers: { updateList, handleOpenModal, toggleModal },
  };
};

export default useHooks;
