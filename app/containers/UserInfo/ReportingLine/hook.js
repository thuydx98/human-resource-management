import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [feedBacks, setFeedBacks] = useState([]);

  useEffect(() => {
    const tempUser = { ...user };
    setFeedBacks(tempUser.feedBacks);
  }, [user]);

  return {
    states: { feedBacks },
    handlers: {},
  };
};

export default useHooks;
