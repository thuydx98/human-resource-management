import { useCallback, useEffect, useState } from 'react';

export const useHooks = props => {
  const { isOpen, toggleModal } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => setIsOpenModal(isOpen), [isOpen]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
  }, [toggleModal]);

  return {
    states: {
      isOpenModal,
    },
    handlers: {
      handleCloseModal,
    },
  };
};

export default useHooks;
