import { useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import AuthUtils from 'utils/authentication';
import { actions } from './slice';
import {
  selectListLeaveData,
  selectListTaskData,
  selectListTaskState,
  selectSaveTaskState,
  selectSubmitTaskState,
  selectUserListData,
  selectUserListState,
} from './selectors';

export const useHooks = () => {
  const monday = moment().startOf('isoweek');
  const [assignees, setAssignees] = useState([]);
  const leaves = useSelector(selectListLeaveData);
  const taskData = useSelector(selectListTaskData);
  const getTaskState = useSelector(selectListTaskState);
  const saveTaskState = useSelector(selectSaveTaskState);
  const submitTaskState = useSelector(selectSubmitTaskState);
  const users = useSelector(selectUserListData);
  const getUserState = useSelector(selectUserListState);
  const {
    getListLeave,
    getListTask,
    saveTask,
    submitTask,
    resetState,
    getUserList,
  } = useActions(
    {
      getListLeave: actions.getListLeave,
      getListTask: actions.getListTask,
      saveTask: actions.saveTask,
      submitTask: actions.submitTask,
      resetState: actions.resetState,
      getUserList: actions.getUserList,
    },
    [actions],
  );

  useEffect(() => {
    getListLeave({
      year: moment().year(),
      userId: 'me',
    });
    getUserList();
  }, []);

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
      getListTask({
        times: monday.format('YYYY-MM-DD'),
        userId:
          listUsers.length > 0 ? listUsers.map(i => i.id).join(',') : 'me',
      });
    }
  }, [getUserState]);

  return {
    states: {
      leaves,
      taskData,
      getTaskState,
      monday,
      saveTaskState,
      submitTaskState,
      assignees,
    },
    handlers: { saveTask, submitTask, resetState },
  };
};

export default useHooks;
