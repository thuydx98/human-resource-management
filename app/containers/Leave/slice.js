import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  leaves: {
    data: [],
    state: null,
    error: null,
  },
  selectedYear: null,
  cancel: {
    data: null,
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'userLeave',
  initialState,
  reducers: {
    getListLeave(state) {
      return flow(
        set('leaves.data', []),
        set('leaves.state', ACTION_STATUS.PENDING),
        set('leaves.error', null),
      )(state);
    },
    getListLeaveSuccess(state, action) {
      return flow(
        set('leaves.data', action.payload),
        set('leaves.state', ACTION_STATUS.SUCCESS),
        set('leaves.error', null),
      )(state);
    },
    setListLeave(state, action) {
      return flow(set('leaves.data', action.payload))(state);
    },
    getListLeaveFailed(state, action) {
      return flow(
        set('leaves.state', ACTION_STATUS.FAILED),
        set('leaves.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('leaves', initialState.leaves))(state);
    },
    setSelectedYear(state, action) {
      return flow(set('selectedYear', action.payload))(state);
    },
    cancelRequest(state) {
      return flow(
        set('cancel.data', null),
        set('cancel.state', ACTION_STATUS.PENDING),
        set('cancel.error', null),
      )(state);
    },
    resetCancelRequest(state) {
      return flow(set('cancel', initialState.cancel))(state);
    },
    cancelRequestSuccess(state, action) {
      return flow(
        set('cancel.data', action.payload),
        set('cancel.state', ACTION_STATUS.SUCCESS),
        set('cancel.error', null),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
