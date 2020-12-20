import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  updatePersonalInfo: {
    status: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    updatePersonalInfo(state) {
      return flow(
        set('updatePersonalInfo.status', ACTION_STATUS.PENDING),
        set('updatePersonalInfo.error', null),
      )(state);
    },
    updatePersonalInfoSuccess(state) {
      return flow(
        set('updatePersonalInfo.status', ACTION_STATUS.SUCCESS),
        set('updatePersonalInfo.error', null),
      )(state);
    },
    updatePersonalInfoFailed(state, action) {
      return flow(
        set('updatePersonalInfo.status', ACTION_STATUS.FAILED),
        set('updatePersonalInfo.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('updatePersonalInfo', initialState))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
