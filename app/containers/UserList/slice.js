import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  userList: {
    data: [],
    state: null,
    error: null,
  },
  deleteUser: {
    state: null,
    error: null,
  },
};

const authenticationSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getUserList(state) {
      return flow(
        set('userList.data', []),
        set('userList.state', ACTION_STATUS.PENDING),
        set('userList.error', null),
      )(state);
    },
    getUserListSuccess(state, action) {
      return flow(
        set('userList.data', action.payload),
        set('userList.state', ACTION_STATUS.SUCCESS),
        set('userList.error', null),
      )(state);
    },
    setUserList(state, action) {
      return flow(set('userList.data', action.payload))(state);
    },
    getUserListFailed(state, action) {
      return flow(
        set('userList.state', ACTION_STATUS.FAILED),
        set('userList.error', action.payload),
      )(state);
    },

    resetState(state) {
      return flow(set('userList', initialState.userList))(state);
    },
    deleteUser(state) {
      return flow(
        set('deleteUser.state', ACTION_STATUS.PENDING),
        set('deleteUser.error', null),
      )(state);
    },
    deleteUserSuccess(state) {
      return flow(
        set('deleteUser.state', ACTION_STATUS.SUCCESS),
        set('deleteUser.error', null),
      )(state);
    },
    deleteUserFailed(state, action) {
      return flow(
        set('deleteUser.state', ACTION_STATUS.FAILED),
        set('deleteUser.error', action.payload),
      )(state);
    },
    resetDeleteState(state) {
      return flow(set('deleteUser', initialState.deleteUser))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
