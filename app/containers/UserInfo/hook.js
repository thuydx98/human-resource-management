import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import get from 'lodash/fp/get';
import { actions } from './slice';
import { selectUserInfoData } from './selectors';

export const USER_INFO_TABS = {
  personalTab: 'personalTab',
  bankAccountTab: 'bankAccountTab',
  contractTab: 'contractTab',
  insuranceTab: 'insuranceTab',
  reportTab: 'reportTab',
  projectTab: 'projectTab',
};

export const useHooks = () => {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(USER_INFO_TABS.personalTab);
  const selectUserInfo = useSelector(selectUserInfoData);

  const { getUser, setUser, resetState } = useActions(
    {
      getUser: actions.getUser,
      setUser: actions.setUser,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const { userId } = params;
    resetState();
    getUser(userId || 'me');
  }, [params]);

  return {
    states: { selectedTab, selectUserInfo },
    handlers: { setSelectedTab, setUser },
  };
};

export default useHooks;
