import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
// import { selectContractListData } from './selectors';

export const LEAVE_TABS = {
  requestTab: 'requestTab',
  summaryTab: 'summaryTab',
  historyTab: 'historyTab',
};

export const useHooks = () => {
  const [selectedTab, setSelectedTab] = useState(LEAVE_TABS.requestTab);
  const updateLeave = useCallback(() => {}, []);
  return {
    states: { selectedTab },
    handlers: { setSelectedTab, updateLeave },
  };
};

export default useHooks;
