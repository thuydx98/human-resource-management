/* eslint-disable no-alert */
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import get from 'lodash/fp/get';
import { useParams } from 'react-router-dom';
import {
  selectListLeaveData,
  selectSelectedYear,
  selectCancelData,
  selectCancelState,
} from '../selectors';
import { actions } from '../slice';

export const useHooks = () => {
  const params = useParams();
  const notificationRef = useRef();
  const leaves = useSelector(selectListLeaveData);
  const selectedYear = useSelector(selectSelectedYear);
  const cancelState = useSelector(selectCancelState);
  const cancelData = useSelector(selectCancelData);

  const {
    getListLeave,
    setListLeave,
    cancelRequest,
    resetCancelRequest,
  } = useActions(
    {
      getListLeave: actions.getListLeave,
      setListLeave: actions.setListLeave,
      cancelRequest: actions.cancelRequest,
      resetCancelRequest: actions.resetCancelRequest,
    },
    [actions],
  );

  useEffect(() => {
    getListLeave({
      year: selectedYear || moment().year(),
      userId: get('userId', params) || 'me',
    });
  }, [params, selectedYear]);

  useEffect(() => {
    if (cancelState === ACTION_STATUS.SUCCESS) {
      notificationRef.current.notifySuccess('Cancel leave succeeded');
      const list = leaves.map(item =>
        item.id === cancelData.id ? { ...item, status: 'CANCEL' } : item,
      );
      resetCancelRequest();
      setListLeave(list);
    }
    return undefined;
  }, [leaves, cancelState, cancelData]);

  const handleCancelRequest = useCallback(requestId => {
    if (window.confirm('Are you sure want to cancel this request?')) {
      cancelRequest({
        leaveId: requestId,
        userId: get('userId', params) || 'me',
      });
    }
  }, []);

  return {
    states: { leaves, notificationRef },
    handlers: { handleCancelRequest },
  };
};

export default useHooks;
