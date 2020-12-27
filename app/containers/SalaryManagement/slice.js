import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  salaryList: {
    data: [],
    state: null,
    error: null,
  },
  saveListSalary: {
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'salaries',
  initialState,
  reducers: {
    setSalaryList(state, action) {
      return flow(
        set('salaryList.data', action.payload),
        set('saveListSalary', initialState.salaryList),
      )(state);
    },
    getSalaryList(state) {
      return flow(
        set('saveListSalary', initialState.salaryList),
        set('salaryList.data', []),
        set('salaryList.state', ACTION_STATUS.PENDING),
        set('salaryList.error', null),
      )(state);
    },
    getSalaryListSuccess(state, action) {
      return flow(
        set('salaryList.data', action.payload),
        set('salaryList.state', ACTION_STATUS.SUCCESS),
        set('salaryList.error', null),
      )(state);
    },
    getSalaryListFailed(state, action) {
      return flow(
        set('salaryList.state', ACTION_STATUS.FAILED),
        set('salaryList.error', action.payload),
      )(state);
    },
    saveListSalary(state) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.PENDING),
        set('saveListSalary.error', null),
      )(state);
    },
    saveListSalarySuccess(state) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.SUCCESS),
        set('saveListSalary.error', null),
      )(state);
    },
    saveListSalaryFailed(state, action) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.FAILED),
        set('saveListSalary.error', action.payload),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
