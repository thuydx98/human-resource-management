import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from 'utils/hooks/useActions';
import { ACTION_STATUS } from 'utils/constants';
import get from 'lodash/fp/get';
import { selectUpdateInsuranceState } from './selectors';
import { actions } from './slice';

export const useHooks = props => {
  const notificationRef = useRef();
  const { user, updateUser } = props;
  const [insurance, setInsurance] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateInsuranceState = useSelector(selectUpdateInsuranceState);

  const { updateInsurance, resetState } = useActions(
    {
      updateInsurance: actions.updateInsurance,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const tempUser = { ...user };
    setInsurance(tempUser.insurance || {});
  }, [user]);

  useEffect(() => {
    if (updateInsuranceState === ACTION_STATUS.SUCCESS) {
      updateUser({ ...user, insurance });
      notificationRef.current.notifySuccess('Update insurance succeeded');
    }
    return () => resetState();
  }, [updateInsuranceState, insurance, user]);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (insurance.bookNo && insurance.hospital && insurance.effectiveDate) {
      updateInsurance({ ...insurance, userId: get('id', user) });
    }
  }, [insurance, user, updateUser]);

  return {
    states: { insurance, isSubmitted, notificationRef },
    handlers: { setInsurance, onSubmit },
  };
};

export default useHooks;
