import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useSelector
} from 'react-redux';
import useActions from 'utils/hooks/useActions';
import {
  ACTION_STATUS
} from 'utils/constants';
import {
  actions
} from './slice';
import {
  selectUpdateStatus
} from './selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const {
    isOpen,
    toggleModal
  } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [others, setOthers] = useState({});

  const updateState = useSelector(selectUpdateStatus);

  const {
    update,
    resetState
  } = useActions({
      update: actions.update,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const {
      others
    } = props;
    setIsOpenModal(isOpen);
    setIsSubmitted(false);
    setOthers(others);
  }, [isOpen]);

  useEffect(() => {
    if (updateState === ACTION_STATUS.SUCCESS) {
      const {
        updateList
      } = props;
      updateList();
      handleCloseModal();
      notificationRef.current.notifySuccess('Update succeeded');
    }
  }, [updateState]);

  const handleCloseModal = useCallback(() => {
    toggleModal(false);
    resetState();
  }, [toggleModal]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setIsSubmitted(true);
      const list = others.filter(item => item.amount && item.description);
      if (others.length > list.length) return;

      update(others.filter(item => item.id && item.amount && item.description));
    },
    [others],
  );

  return {
    states: {
      isOpenModal,
      others,
      notificationRef,
      updateState,
      isSubmitted,
    },
    handlers: {
      handleCloseModal,
      onSubmit,
      setOthers,
    },
  };
};

export default useHooks;
