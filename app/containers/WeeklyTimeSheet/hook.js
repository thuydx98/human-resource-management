import { useCallback, useEffect, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';

export const useHooks = props => {
  const { monday, data, loadStatus } = props;
  const [tasks, setTasks] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (data && data.tasks && data.details) {
      setTasks(data.tasks);
      setDetails(data.details);
    }
  }, [data]);

  const getWorkingHour = useCallback(
    (taskId, date) => {
      const detail = details.find(
        item =>
          item.taskId === taskId &&
          item.workingDate === date.format('YYYY-MM-DD'),
      );
      return detail ? detail.workingHour : null;
    },
    [details],
  );

  const updateWorkingHour = useCallback(
    (taskId, date, e) => {
      let value = +e.target.value.replace(/[^0-9]/g, '');
      if (
        value &&
        (value < 0 || value > 24 || Number.isNaN(parseFloat(e.target.value)))
      )
        return;
      value = value === 0 ? null : value;
      let detail = details.find(
        item =>
          item.taskId === taskId &&
          item.workingDate === date.format('YYYY-MM-DD'),
      );
      if (detail) {
        detail = { ...detail };
        detail.workingHour = value;
        setDetails(
          details.map(item => (item.id === detail.id ? detail : item)),
        );
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

  return {
    states: {
      monday,
      tasks,
      details,
      loadStatus,
    },
    handlers: { getWorkingHour, updateWorkingHour },
  };
};

export default useHooks;
