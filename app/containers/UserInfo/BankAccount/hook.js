import { useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const tempUser = { ...user };
    setBankAccounts(tempUser.bankAccounts);
  }, [user]);

  return {
    states: { bankAccounts },
    handlers: {},
  };
};

export default useHooks;
