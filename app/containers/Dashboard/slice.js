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
};

const slice = createSlice({
  name: 'dashboard',
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
    getListLeaveFailed(state, action) {
      return flow(
        set('leaves.state', ACTION_STATUS.FAILED),
        set('leaves.error', action.payload),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
