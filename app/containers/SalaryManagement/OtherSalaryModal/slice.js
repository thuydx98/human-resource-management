import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  others: {
    data: [],
    status: null,
    error: null,
  },
};

const authenticationSlice = createSlice({
  name: 'otherSalaries',
  initialState,
  reducers: {
    update(state) {
      return flow(
        set('others.data', []),
        set('others.status', ACTION_STATUS.PENDING),
        set('others.error', null),
      )(state);
    },
    updateSuccess(state) {
      return flow(
        set('others.status', ACTION_STATUS.SUCCESS),
        set('others.error', null),
      )(state);
    },
    updateFailed(state, action) {
      return flow(
        set('others.status', ACTION_STATUS.FAILED),
        set('others.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('others', initialState.others))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
