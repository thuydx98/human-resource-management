import { useEffect } from 'react';
import useActions from 'utils/hooks/useActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import {
  selectListLeaveData,
  selectListTaskData,
  selectListTaskState,
  selectSaveTaskState,
  selectSubmitTaskState,
} from './selectors';

export const useHooks = () => {
  const monday = moment().startOf('isoweek');
  const leaves = useSelector(selectListLeaveData);
  const taskData = useSelector(selectListTaskData);
  const getTaskState = useSelector(selectListTaskState);
  const saveTaskState = useSelector(selectSaveTaskState);
  const submitTaskState = useSelector(selectSubmitTaskState);
  const {
    getListLeave,
    getListTask,
    saveTask,
    submitTask,
    resetState,
  } = useActions(
    {
      getListLeave: actions.getListLeave,
      getListTask: actions.getListTask,
      saveTask: actions.saveTask,
      submitTask: actions.submitTask,
      resetState: actions.resetState,
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
    states: {
      leaves,
      taskData,
      getTaskState,
      monday,
      saveTaskState,
      submitTaskState,
    },
    handlers: { saveTask, submitTask, resetState },
  };
};

export default useHooks;
