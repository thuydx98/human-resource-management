import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  data: null,
  state: null,
  error: null,
};

const slice = createSlice({
  name: 'requestLeave',
  initialState,
  reducers: {
    requestLeave(state) {
      return flow(
        set('data', {}),
        set('state', ACTION_STATUS.PENDING),
        set('error', null),
      )(state);
    },
    requestLeaveSuccess(state, action) {
      return flow(
        set('data', action.payload),
        set('state', ACTION_STATUS.SUCCESS),
        set('error', null),
      )(state);
    },
    requestLeaveFailed(state, action) {
      return flow(
        set('state', ACTION_STATUS.FAILED),
        set('error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(
        set('data', null),
        set('state', null),
        set('error', null),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
