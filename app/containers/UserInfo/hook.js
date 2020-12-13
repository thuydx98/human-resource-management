import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
// import { selectContractListData } from './selectors';

export const USER_INFO_TABS = {
  personalTab: 'personalTab',
  bankAccountTab: 'bankAccountTab',
  contractTab: 'contractTab',
  insuranceTab: 'insuranceTab',
  reportTab: 'reportTab',
  projectTab: 'projectTab',
};

export const useHooks = () => {
  const [selectedTab, setSelectedTab] = useState(USER_INFO_TABS.personalTab);
  const updateUser = useCallback(() => {}, []);
  return {
    states: { selectedTab },
    handlers: { setSelectedTab, updateUser },
  };
};

export default useHooks;
