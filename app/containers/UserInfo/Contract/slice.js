import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  saveContract: {
    data: null,
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    saveContract(state) {
      return flow(
        set('saveContract.state', ACTION_STATUS.PENDING),
        set('saveContract.error', null),
      )(state);
    },
    saveContractSuccess(state, action) {
      return flow(
        set('saveContract.data', action.payload),
        set('saveContract.state', ACTION_STATUS.SUCCESS),
        set('saveContract.error', null),
      )(state);
    },
    saveContractFailed(state, action) {
      return flow(
        set('saveContract.state', ACTION_STATUS.FAILED),
        set('saveContract.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('saveContract', initialState.saveContract))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
