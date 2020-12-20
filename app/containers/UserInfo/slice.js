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
      return flow(set('userInfo.data', action.payload))(state);
    },
    getUserFailed(state, action) {
      return flow(
        set('userInfo.state', ACTION_STATUS.FAILED),
        set('userInfo.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('userInfo', initialState.userInfo))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
