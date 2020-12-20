import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
// import { selectContractListData } from './selectors';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [insurance, setInsurance] = useState({});

  useEffect(() => {
    const tempUser = { ...user };
    setInsurance(tempUser.insurance);
  }, [user]);
  return {
    states: { insurance },
    handlers: { setInsurance },
  };
};

export default useHooks;
