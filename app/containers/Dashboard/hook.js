import { useEffect } from 'react';
import useActions from 'utils/hooks/useActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import {
  selectListLeaveData,
  selectListTaskData,
  selectListTaskState,
} from './selectors';

export const useHooks = () => {
  const monday = moment().startOf('isoweek');
  const leaves = useSelector(selectListLeaveData);
  const taskData = useSelector(selectListTaskData);
  const getTaskState = useSelector(selectListTaskState);
  const { getListLeave, getListTask } = useActions(
    {
      getListLeave: actions.getListLeave,
      getListTask: actions.getListTask,
    },
    [actions],
  );

  useEffect(() => {
    getListLeave({
      year: moment().year(),
      userId: 'me',
    });
    getListTask({
      times: monday.format('YYYY-MM-DD'),
      userId: 'me',
    });
  }, []);

  return {
    states: { leaves, taskData, getTaskState, monday },
  };
};

export default useHooks;
