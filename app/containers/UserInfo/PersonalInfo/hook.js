import { useCallback, useEffect, useRef, useState } from 'react';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { selectUpdatePersonalState } from './selectors';

export const useHooks = props => {
  const notificationRef = useRef();
  const { user, updateUser } = props;
  const [personalInfo, setPersonalInfo] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updatePersonalState = useSelector(selectUpdatePersonalState);

  const { updatePersonalInfo, resetState } = useActions(
    {
      updatePersonalInfo: actions.updatePersonalInfo,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => setPersonalInfo({ ...user }), [user]);

  useEffect(() => {
    if (updatePersonalState === ACTION_STATUS.SUCCESS) {
      updateUser(personalInfo);
      notificationRef.current.notifySuccess('Save personal info succeeded');
    }
    return () => resetState();
  }, [updatePersonalState, personalInfo]);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (
      personalInfo.firstname &&
      personalInfo.lastname &&
      personalInfo.birthday &&
      personalInfo.phone &&
      personalInfo.address &&
      personalInfo.identity_card &&
      personalInfo.gender
    ) {
      updatePersonalInfo({
        ...personalInfo,
        firstName: personalInfo.firstname,
        lastName: personalInfo.lastname,
        identityCard: personalInfo.identity_card,
      });
    }
  }, [personalInfo, updateUser]);

  return {
    states: { personalInfo, isSubmitted, notificationRef },
    handlers: { onSubmit, setPersonalInfo },
  };
};

export default useHooks;
