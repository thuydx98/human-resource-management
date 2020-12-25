import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useActions from 'utils/hooks/useActions';
import get from 'lodash/fp/get';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from '../slice';
import { actions as requestActions } from './slice';
import { selectListLeaveData } from '../selectors';
import { selectRequestLeaveData, selectRequestLeaveState } from './selectors';

export const useHooks = () => {
  const params = useParams();
  const notificationRef = useRef();
  const [payload, setPayload] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const leaves = useSelector(selectListLeaveData);
  const requestData = useSelector(selectRequestLeaveData);
  const requestState = useSelector(selectRequestLeaveState);

  const {
    getListLeave,
    resetState,
    setListLeave,
    requestLeave,
    resetRequestState,
  } = useActions(
    {
      getListLeave: actions.getListLeave,
      resetState: actions.resetState,
      setListLeave: actions.setListLeave,
      requestLeave: requestActions.requestLeave,
      resetRequestState: requestActions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    resetState();
    setIsSubmitted(false);
    getListLeave({
      year: moment().year(),
      userId: get('userId', params) || 'me',
    });
  }, [params]);

  useEffect(() => {
    if (requestState === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Request leave succeeded');
      setIsSubmitted(false);
      setListLeave([...leaves, requestData]);
    }
    return () => resetRequestState();
  }, [requestState, leaves, setIsSubmitted, setListLeave, setPayload]);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (!payload.date || !payload.reason) return;

    requestLeave({
      ...payload,
      type: payload.type || 'ANNUAL',
      userId: get('userId', params) || 'me',
    });
  }, [payload, params]);

  return {
    states: { payload, leaves, isSubmitted, notificationRef },
    handlers: { setPayload, onSubmit },
  };
};

export default useHooks;
