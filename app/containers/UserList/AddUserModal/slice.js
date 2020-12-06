import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  addUser: {
    status: null,
    error: null,
  },
};

const authenticationSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    addUser(state) {
      return flow(
        set('addUser.status', ACTION_STATUS.PENDING),
        set('addUser.error', null),
      )(state);
    },
    addUserSuccess(state) {
      return flow(
        set('addUser.status', ACTION_STATUS.SUCCESS),
        set('addUser.error', null),
      )(state);
    },
    addUserFailed(state, action) {
      return flow(
        set('addUser.status', ACTION_STATUS.FAILED),
        set('addUser.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('addUser', initialState.addUser))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
