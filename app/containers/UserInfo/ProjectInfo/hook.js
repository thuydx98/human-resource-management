import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const tempUser = { ...user };
    setProjects(tempUser.projects);
  }, [user]);

  return {
    states: { projects },
    handlers: {},
  };
};

export default useHooks;
