import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const tempUser = { ...user };
    setContracts(tempUser.contracts);
  }, [user]);

  return {
    states: { contracts },
    handlers: {},
  };
};

export default useHooks;
