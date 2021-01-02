import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useActions from 'utils/hooks/useActions';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import {
  selectUserInfoData,
  uploadAvatarState,
  uploadAvatarData,
  selectUserInfoState,
} from './selectors';

export const USER_INFO_TABS = {
  personalTab: 'personalTab',
  bankAccountTab: 'bankAccountTab',
  contractTab: 'contractTab',
  insuranceTab: 'insuranceTab',
  reportTab: 'reportTab',
  projectTab: 'projectTab',
};

export const useHooks = () => {
  const params = useParams();
  const fileInput = useRef(null);
  const [selectedTab, setSelectedTab] = useState(USER_INFO_TABS.personalTab);
  const selectUserInfo = useSelector(selectUserInfoData);
  const getUserInfoState = useSelector(selectUserInfoState);
  const selectUploadAvatarState = useSelector(uploadAvatarState);
  const selectUploadAvatarData = useSelector(uploadAvatarData);
  const { getUser, setUser, uploadAvatar, resetState } = useActions(
    {
      getUser: actions.getUser,
      setUser: actions.setUser,
      uploadAvatar: actions.uploadAvatar,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const { userId } = params;
    resetState();
    getUser(userId || 'me');
  }, [params]);

  useEffect(() => {
    if (selectUploadAvatarState === ACTION_STATUS.SUCCESS) {
      setUser({ ...selectUserInfo, avatar: selectUploadAvatarData.url });
    }
  }, [selectUploadAvatarState, selectUploadAvatarData, selectUserInfo]);

  const handleUploadAvatar = useCallback(
    event => {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0];
        const { userId } = params;
        uploadAvatar({ image, userId: userId || 'me' });
      }
    },
    [uploadAvatar, params],
  );

  return {
    states: { selectedTab, selectUserInfo, fileInput, getUserInfoState },
    handlers: { setSelectedTab, setUser, handleUploadAvatar },
  };
};

export default useHooks;
