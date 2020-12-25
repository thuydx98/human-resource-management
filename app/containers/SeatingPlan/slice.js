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
  saveSeat: {
    data: {},
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
      return flow(set('saveSeat', initialState.saveSeat))(state);
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
    saveSeat(state) {
      return flow(
        set('saveSeat.data', {}),
        set('saveSeat.state', ACTION_STATUS.PENDING),
        set('saveSeat.error', null),
      )(state);
    },
    saveSeatSuccess(state, action) {
      return flow(
        set('saveSeat.data', action.payload),
        set('saveSeat.state', ACTION_STATUS.SUCCESS),
        set('saveSeat.error', null),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
