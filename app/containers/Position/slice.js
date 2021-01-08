import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  departments: {
    data: [],
    state: null,
    error: null,
  },
  users: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    getListDepartment(state) {
      return flow(
        set('departments.data', []),
        set('departments.state', ACTION_STATUS.PENDING),
        set('departments.error', null),
      )(state);
    },
    getListDepartmentSuccess(state, action) {
      return flow(
        set('departments.data', action.payload),
        set('departments.state', ACTION_STATUS.SUCCESS),
        set('departments.error', null),
      )(state);
    },
    getListDepartmentFailed(state, action) {
      return flow(
        set('departments.state', ACTION_STATUS.FAILED),
        set('departments.error', action.payload),
      )(state);
    },
    getUserList(state) {
      return flow(
        set('users.data', []),
        set('users.state', ACTION_STATUS.PENDING),
        set('users.error', null),
      )(state);
    },
    getUserListSuccess(state, action) {
      return flow(
        set('users.data', action.payload),
        set('users.state', ACTION_STATUS.SUCCESS),
        set('users.error', null),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
