import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';

export const useHooks = props => {
  const { user, updateUser } = props;
  const [feedBacks, setFeedBacks] = useState([]);
  const [isOpenModal, toggleModal] = useState(false);

  useEffect(() => {
    const tempUser = { ...user };
    setFeedBacks(tempUser.feedBacks);
  }, [user]);

  const updateList = useCallback(
    feedback => {
      const newList = [...feedBacks];
      newList.push(feedback);
      updateUser({ ...user, feedBacks: newList });
    },
    [feedBacks],
  );

  return {
    states: { feedBacks, isOpenModal, user },
    handlers: { updateList, toggleModal },
  };
};

export default useHooks;
