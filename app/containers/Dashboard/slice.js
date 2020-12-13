import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  contractList: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'contractList',
  initialState,
  reducers: {
    getContractList(state) {
      return flow(
        set('contractList.data', []),
        set('contractList.state', ACTION_STATUS.PENDING),
        set('contractList.error', null),
      )(state);
    },
    getContractListSuccess(state, action) {
      return flow(
        set('contractList.data', action.payload),
        set('contractList.state', ACTION_STATUS.SUCCESS),
        set('contractList.error', null),
      )(state);
    },
    setContractList(state, action) {
      return flow(set('contractList.data', action.payload))(state);
    },
    getContractListFailed(state, action) {
      return flow(
        set('contractList.state', ACTION_STATUS.FAILED),
        set('contractList.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('contractList', initialState.contractList))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
