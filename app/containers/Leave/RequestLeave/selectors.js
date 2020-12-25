import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectRequestLeave = state => state.requestLeave || initialState;

const selectRequestLeaveData = createSelector(
  selectRequestLeave,
  state => get('data', state),
);

const selectRequestLeaveState = createSelector(
  selectRequestLeave,
  state => get('state', state),
);

export { selectRequestLeaveData, selectRequestLeaveState };
