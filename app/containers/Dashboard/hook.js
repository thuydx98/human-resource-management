import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectContractListData } from './selectors';

export const useHooks = () => {
  const [isOpenAddModal, toggleAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const contractList = useSelector(selectContractListData);
  const { getContractList, setContractList } = useActions(
    {
      getContractList: actions.getContractList,
      setContractList: actions.setContractList,
    },
    [actions],
  );

  useEffect(() => {
    getContractList();
    return undefined;
  }, []);

  const toggleUpdateModal = useCallback((isOpen, user) => {
    setSelectedContract(user);
    setIsOpenUpdateModal(isOpen);
  }, []);

  const updateContractInList = useCallback(
    user => {
      const contracts = contractList.map(item =>
        user.employee_id === item.employee_id ? user : item,
      );
      setContractList(contracts);
    },
    [contractList, setContractList],
  );

  return {
    states: {
      contractList,
      isOpenAddModal,
      isOpenUpdateModal,
      selectedContract,
    },
    handlers: {
      toggleAddModal,
      toggleUpdateModal,
      getContractList,
      updateContractInList,
    },
  };
};

export default useHooks;
