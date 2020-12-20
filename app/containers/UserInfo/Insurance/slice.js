import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  updateInsurance: {
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'updateInsurance',
  initialState,
  reducers: {
    updateInsurance(state) {
      return flow(
        set('updateInsurance.state', ACTION_STATUS.PENDING),
        set('updateInsurance.error', null),
      )(state);
    },
    updateInsuranceSuccess(state) {
      return flow(
        set('updateInsurance.state', ACTION_STATUS.SUCCESS),
        set('updateInsurance.error', null),
      )(state);
    },
    updateInsuranceFailed(state, action) {
      return flow(
        set('updateInsurance.state', ACTION_STATUS.FAILED),
        set('updateInsurance.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('updateInsurance', initialState.updateInsurance))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
