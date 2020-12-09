import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  updateUser: {
    status: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    updateUser(state) {
      return flow(
        set('updateUser.status', ACTION_STATUS.PENDING),
        set('updateUser.error', null),
      )(state);
    },
    updateUserSuccess(state) {
      return flow(
        set('updateUser.status', ACTION_STATUS.SUCCESS),
        set('updateUser.error', null),
      )(state);
    },
    updateUserFailed(state, action) {
      return flow(
        set('updateUser.status', ACTION_STATUS.FAILED),
        set('updateUser.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('updateUser', initialState.updateUser))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
