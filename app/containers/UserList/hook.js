import { useState } from 'react';

export const useHooks = () => {
  const [isOpenAddEditModal, toggleAddEditModal] = useState(false);

  return {
    states: {
      isOpenAddEditModal,
    },
    handlers: {
      toggleAddEditModal,
    },
  };
};

export default useHooks;
