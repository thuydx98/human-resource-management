import { useEffect } from 'react';
import useActions from 'utils/hooks/useActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectListLeaveData } from './selectors';

export const useHooks = () => {
  const leaves = useSelector(selectListLeaveData);
  const { getListLeave } = useActions(
    {
      getListLeave: actions.getListLeave,
    },
    [actions],
  );

  useEffect(() => {
    getListLeave({
      year: moment().year(),
      userId: 'me',
    });
  }, []);

  return {
    states: { leaves },
  };
};

export default useHooks;
