import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import get from 'lodash/fp/get';
import { actions } from './slice';
import {
  selectSaveTaskState,
  selectSubmitTaskState,
  selectTaskListData,
  selectTaskListState,
} from './selectors';

export const useHooks = () => {
  const params = useParams();
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [mondays, setMondays] = useState([]);
  const tasks = useSelector(selectTaskListData);
  const loadStatus = useSelector(selectTaskListState);
  const saveTaskStates = useSelector(selectSaveTaskState);
  const submitTaskStates = useSelector(selectSubmitTaskState);

  const {
    getTaskList,
    setState,
    saveTask,
    submitTask,
    resetState,
  } = useActions(
    {
      getTaskList: actions.getTaskList,
      setState: actions.setState,
      saveTask: actions.saveTask,
      submitTask: actions.submitTask,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const weeks = [];
    const monday = moment(selectedMonth.format('YYYY-MM-01')).day('Monday');
    const month = selectedMonth.month();
    do {
      weeks.push(moment(monday));
      monday.add(7, 'd');
    } while (month === monday.month());

    setMondays(weeks);
    getTaskList({
      data: weeks.map(() => ({ tasks: [], details: [] })),
      times: weeks,
      userId: get('userId', params) || 'me',
    });
    setState({
      tasks: weeks.map(() => ({ tasks: [], details: [] })),
      save: weeks.map(() => ({ state: null, error: null })),
      submit: weeks.map(() => ({ state: null, error: null })),
    });
  }, [selectedMonth]);

  const handleSave = useCallback(data => saveTask(data), []);
  const handleSubmit = useCallback(data => submitTask(data), []);
  const handleResetState = useCallback(index => resetState(index), []);

  return {
    states: {
      selectedMonth,
      mondays,
      tasks,
      loadStatus,
      saveTaskStates,
      submitTaskStates,
    },
    handlers: { setSelectedMonth, handleSave, handleSubmit, handleResetState },
  };
};

export default useHooks;
