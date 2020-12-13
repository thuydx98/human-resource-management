import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  departmentList: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'departmentList',
  initialState,
  reducers: {
    getDepartmentList(state) {
      return flow(
        set('departmentList.data', []),
        set('departmentList.state', ACTION_STATUS.PENDING),
        set('departmentList.error', null),
      )(state);
    },
    getDepartmentListSuccess(state, action) {
      return flow(
        set('departmentList.data', action.payload),
        set('departmentList.state', ACTION_STATUS.SUCCESS),
        set('departmentList.error', null),
      )(state);
    },
    setDepartmentList(state, action) {
      return flow(set('departmentList.data', action.payload))(state);
    },
    getDepartmentListFailed(state, action) {
      return flow(
        set('departmentList.state', ACTION_STATUS.FAILED),
        set('departmentList.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('departmentList', initialState.departmentList))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
