/* eslint-disable no-alert */
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ACTION_STATUS } from 'utils/constants';
import { useParams } from 'react-router-dom';
import get from 'lodash/fp/get';

export const useHooks = props => {
  const {
    monday,
    data,
    loadStatus,
    onSave,
    onSubmit,
    saveStatus,
    submitStatus,
    resetState,
  } = props;
  const params = useParams();
  const notificationRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (data && data.tasks && data.details) {
      setTasks(data.tasks);
      setDetails(data.details);
    }
  }, [data]);

  useEffect(() => {
    if (saveStatus === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Save time-sheet succeeded');
      resetState();
    }
    if (saveStatus === ACTION_STATUS.FAILED) {
      notificationRef.current.notifyError('Save time-sheet failed');
      resetState();
    }
    if (submitStatus === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Submit time-sheet succeeded');
      resetState();
    }
    if (submitStatus === ACTION_STATUS.FAILED) {
      notificationRef.current.notifyError('Submit time-sheet failed');
      resetState();
    }
  }, [saveStatus, submitStatus]);

  const handleCreateTask = useCallback(() => {
    const time = monday.format('YYYY-MM-DD');
    setTasks([...tasks, { id: uuid(), time }]);
  }, [tasks, monday]);

  const handleDeleteTask = useCallback(
    taskId => {
      setTasks(tasks.filter(item => item.id !== taskId));
      setDetails(details.filter(item => item.taskId !== taskId));
    },
    [tasks, details],
  );

  const handleUpdateTask = useCallback(
    task => {
      setTasks(tasks.map(item => (item.id === task.id ? task : item)));
    },
    [tasks],
  );

  const getWorkingHour = useCallback(
    (taskId, date) => {
      if (taskId) {
        const detail = details.find(
          item =>
            item.taskId === taskId &&
            item.workingDate === date.format('YYYY-MM-DD'),
        );
        return detail ? detail.workingHour : undefined;
      }

      return details.reduce(
        (a, b) =>
          a + (b.workingDate === date.format('YYYY-MM-DD') ? b.workingHour : 0),
        0,
      );
    },
    [details],
  );

  const updateWorkingHour = useCallback(
    (taskId, date, e) => {
      let value = e.target.value ? +e.target.value.replace(/[^0-9]/g, '') : 0;
      if (
        value &&
        (value < 0 || value > 24 || Number.isNaN(parseFloat(e.target.value)))
      )
        return;
      value = value === 0 ? undefined : value;
      let detail = details.find(
        item =>
          item.taskId === taskId &&
          item.workingDate === date.format('YYYY-MM-DD'),
      );
      if (detail) {
        detail = { ...detail };
        if (value === undefined) {
          setDetails(details.filter(item => item.id !== detail.id));
        } else {
          detail.workingHour = value;
          setDetails(
            details.map(item => (item.id === detail.id ? detail : item)),
          );
        }
      } else {
        detail = {
          id: uuid(),
          taskId,
          workingDate: date.format('YYYY-MM-DD'),
          workingHour: value,
        };
        setDetails([...details, detail]);
      }
    },
    [details],
  );

  const handleSave = useCallback(() => {
    const list = tasks.filter(
      item => item.project || item.activity || item.task,
    );
    setTasks(list);
    onSave({
      tasks: { tasks: list, details },
      userId: get('userId', params) || 'me',
    });
  }, [tasks, details]);

  const handleSubmit = useCallback(() => {
    if (window.confirm('Are you sure want to submit this time-sheet?')) {
      const list = tasks.filter(
        item => item.project || item.activity || item.task,
      );
      setTasks(list);
      onSubmit({
        tasks: { tasks: list, details },
        userId: get('userId', params) || 'me',
      });
    }
  }, [tasks, details]);

  return {
    states: {
      monday,
      tasks,
      details,
      loadStatus,
      notificationRef,
      saveStatus,
      submitStatus,
    },
    handlers: {
      getWorkingHour,
      updateWorkingHour,
      handleCreateTask,
      handleDeleteTask,
      handleUpdateTask,
      handleSave,
      handleSubmit,
      handleDeleteTask,
    },
  };
};

export default useHooks;
