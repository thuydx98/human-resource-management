import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import get from 'lodash/fp/get';
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
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(USER_INFO_TABS.personalTab);
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(params);
  }, [params]);

  const updateUser = useCallback(() => {}, []);
  return {
    states: { selectedTab },
    handlers: { setSelectedTab, updateUser },
  };
};

export default useHooks;
