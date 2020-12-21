import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  saveFeedback: {
    data: null,
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    saveFeedback(state) {
      return flow(
        set('saveFeedback.state', ACTION_STATUS.PENDING),
        set('saveFeedback.error', null),
      )(state);
    },
    saveFeedbackSuccess(state, action) {
      return flow(
        set('saveFeedback.data', action.payload),
        set('saveFeedback.state', ACTION_STATUS.SUCCESS),
        set('saveFeedback.error', null),
      )(state);
    },
    saveFeedbackFailed(state, action) {
      return flow(
        set('saveFeedback.state', ACTION_STATUS.FAILED),
        set('saveFeedback.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('saveFeedback', initialState.saveFeedback))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
