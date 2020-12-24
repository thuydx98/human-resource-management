import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  seats: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'seatingPlan',
  initialState,
  reducers: {
    getListSeat(state) {
      return flow(
        set('seats.data', []),
        set('seats.state', ACTION_STATUS.PENDING),
        set('seats.error', null),
      )(state);
    },
    getListSeatSuccess(state, action) {
      return flow(
        set('seats.data', action.payload),
        set('seats.state', ACTION_STATUS.SUCCESS),
        set('seats.error', null),
      )(state);
    },
    setListSeat(state, action) {
      return flow(set('seats.data', action.payload))(state);
    },
    getListSeatFailed(state, action) {
      return flow(
        set('seats.state', ACTION_STATUS.FAILED),
        set('seats.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('seats', initialState.seats))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
