import { useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectSelectedYear } from './selectors';

export const LEAVE_TABS = {
  requestTab: 'requestTab',
  summaryTab: 'summaryTab',
  historyTab: 'historyTab',
};

export const useHooks = () => {
  const [selectedTab, setSelectedTab] = useState(LEAVE_TABS.requestTab);
  const selectedYear = useSelector(selectSelectedYear);
  const { setSelectedYear } = useActions(
    {
      setSelectedYear: actions.setSelectedYear,
    },
    [actions],
  );

  return {
    states: { selectedTab, selectedYear },
    handlers: { setSelectedTab, setSelectedYear },
  };
};

export default useHooks;
