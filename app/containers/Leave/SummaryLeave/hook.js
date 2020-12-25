import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useActions from 'utils/hooks/useActions';
import get from 'lodash/fp/get';
import { useParams } from 'react-router-dom';
import { selectListLeaveData, selectSelectedYear } from '../selectors';
import { actions } from '../slice';

export const useHooks = () => {
  const params = useParams();
  const leaves = useSelector(selectListLeaveData);
  const selectedYear = useSelector(selectSelectedYear);
  const { getListLeave } = useActions(
    {
      getListLeave: actions.getListLeave,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    getListLeave({
      year: selectedYear || moment().year(),
      userId: get('userId', params) || 'me',
    });
  }, [params, selectedYear]);

  return {
    states: { leaves },
  };
};

export default useHooks;
