import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ACTION_STATUS } from 'utils/constants';
import AuthUtils from 'utils/authentication';
import { actions } from './slice';
import {
  selectSaveTaskState,
  selectSubmitTaskState,
  selectTaskListData,
  selectTaskListState,
  selectUserListData,
  selectUserListState,
} from './selectors';

export const useHooks = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [assignees, setAssignees] = useState([]);
  const [mondays, setMondays] = useState([]);
  const tasks = useSelector(selectTaskListData);
  const loadStatus = useSelector(selectTaskListState);
  const saveTaskStates = useSelector(selectSaveTaskState);
  const submitTaskStates = useSelector(selectSubmitTaskState);
  const users = useSelector(selectUserListData);
  const getUserState = useSelector(selectUserListState);

  const {
    getTaskList,
    setState,
    saveTask,
    submitTask,
    resetState,
    getUserList,
  } = useActions(
    {
      getTaskList: actions.getTaskList,
      setState: actions.setState,
      saveTask: actions.saveTask,
      submitTask: actions.submitTask,
      resetState: actions.resetState,
      getUserList: actions.getUserList,
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
    getUserList();

    setState({
      tasks: weeks.map(() => ({ tasks: [], details: [] })),
      save: weeks.map(() => ({ state: null, error: null })),
      submit: weeks.map(() => ({ state: null, error: null })),
    });
  }, [selectedMonth]);

  useEffect(() => {
    if (getUserState === ACTION_STATUS.SUCCESS) {
      let listUsers = [];
      const { role, departmentId } = AuthUtils.getAuthInfo();

      if (role === 'Admin') {
        listUsers = users;
      } else if (role === 'Manager' || role === 'Deputy') {
        listUsers = users.filter(item => item.departmentId === departmentId);
      }

      setAssignees(listUsers);
      getTaskList({
        data: mondays.map(() => ({ tasks: [], details: [] })),
        times: mondays,
        userId:
          listUsers.length > 0 ? listUsers.map(i => i.id).join(',') : 'me',
      });
    }
  }, [getUserState]);

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
      assignees,
    },
    handlers: { setSelectedMonth, handleSave, handleSubmit, handleResetState },
  };
};

export default useHooks;
