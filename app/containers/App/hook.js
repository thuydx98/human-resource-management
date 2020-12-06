import { useSelector } from 'react-redux';
import { makeSelectIsAuthenticated } from './selectors';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  return {
    selectors: { isAuthenticated },
  };
};

export default useHooks;
