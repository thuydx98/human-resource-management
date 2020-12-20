import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  saveBankAccount: {
    data: null,
    state: null,
    error: null,
  },
  bankList: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {
    saveBankAccount(state) {
      return flow(
        set('saveBankAccount.state', ACTION_STATUS.PENDING),
        set('saveBankAccount.error', null),
      )(state);
    },
    saveBankAccountSuccess(state, action) {
      return flow(
        set('saveBankAccount.data', action.payload),
        set('saveBankAccount.state', ACTION_STATUS.SUCCESS),
        set('saveBankAccount.error', null),
      )(state);
    },
    saveBankAccountFailed(state, action) {
      return flow(
        set('saveBankAccount.state', ACTION_STATUS.FAILED),
        set('saveBankAccount.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('saveBankAccount', initialState.saveBankAccount))(state);
    },
    getBankList(state) {
      return flow(
        set('bankList.state', ACTION_STATUS.PENDING),
        set('bankList.error', null),
      )(state);
    },
    getBankListSuccess(state, action) {
      return flow(
        set('bankList.data', action.payload),
        set('bankList.state', ACTION_STATUS.SUCCESS),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
