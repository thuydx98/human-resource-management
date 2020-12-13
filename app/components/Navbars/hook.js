import { actions as authActions } from 'containers/App/slice';
import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [color, setColor] = useState('navbar-transparent');

  const { logout } = useActions(
    {
      logout: authActions.logout,
    },
    [authActions],
  );

  useEffect(() => {
    window.addEventListener('resize', updateColor);
    return () => window.removeEventListener('resize', updateColor);
  });

  const updateColor = useCallback(() => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor('bg-white');
    } else {
      setColor('navbar-transparent');
    }
  }, [collapseOpen]);

  // this function opens and closes the collapse on small devices
  const toggleCollapse = useCallback(() => {
    if (collapseOpen) {
      setColor('navbar-transparent');
    } else {
      setColor('bg-white');
    }
    setCollapseOpen(!collapseOpen);
  }, [collapseOpen]);

  // this function is to open the Search modal
  const toggleModalChangePassword = useCallback(
    () => setModalChangePassword(!modalChangePassword),
    [modalChangePassword],
  );

  return {
    states: { collapseOpen, modalChangePassword, color },
    handlers: { logout, toggleCollapse, toggleModalChangePassword },
  };
};

export default useHooks;
