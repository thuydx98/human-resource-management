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
};

const slice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getDepartmentList(state) {
      return flow(
        set('departments.data', []),
        set('departments.state', ACTION_STATUS.PENDING),
        set('departments.error', null),
      )(state);
    },
    getDepartmentListSuccess(state, action) {
      return flow(
        set('departments.data', action.payload),
        set('departments.state', ACTION_STATUS.SUCCESS),
        set('departments.error', null),
      )(state);
    },
    setDepartmentList(state, action) {
      return flow(set('departments.data', action.payload))(state);
    },
    getDepartmentListFailed(state, action) {
      return flow(
        set('departments.state', ACTION_STATUS.FAILED),
        set('departments.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('departments', initialState.departments))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
