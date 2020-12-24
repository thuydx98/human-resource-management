import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  userInfo: {
    data: null,
    state: null,
    error: null,
  },
  uploadAvatar: {
    data: null,
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUser(state) {
      return flow(
        set('userInfo.data', null),
        set('userInfo.state', ACTION_STATUS.PENDING),
        set('userInfo.error', null),
      )(state);
    },
    getUserSuccess(state, action) {
      return flow(
        set('userInfo.data', action.payload),
        set('userInfo.state', ACTION_STATUS.SUCCESS),
        set('userInfo.error', null),
      )(state);
    },
    setUser(state, action) {
      return flow(
        set('userInfo.data', action.payload),
        set('uploadAvatar', initialState.uploadAvatar),
      )(state);
    },
    getUserFailed(state, action) {
      return flow(
        set('userInfo.state', ACTION_STATUS.FAILED),
        set('userInfo.error', action.payload),
      )(state);
    },
    uploadAvatar(state) {
      return flow(
        set('uploadAvatar.data', null),
        set('uploadAvatar.state', ACTION_STATUS.PENDING),
      )(state);
    },
    uploadAvatarSuccess(state, action) {
      return flow(
        set('uploadAvatar.data', action.payload),
        set('uploadAvatar.state', ACTION_STATUS.SUCCESS),
      )(state);
    },
    uploadAvatarFailed(state, action) {
      return flow(
        set('uploadAvatar.state', ACTION_STATUS.FAILED),
        set('uploadAvatar.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('userInfo', initialState.userInfo))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
