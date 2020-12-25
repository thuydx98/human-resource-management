import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectDashboard = state => state.dashboard || initialState;

const selectListLeaveData = createSelector(
  selectDashboard,
  state => get('leaves.data', state),
);

const selectListLeaveState = createSelector(
  selectDashboard,
  state => get('leaves.state', state),
);

export { selectListLeaveData, selectListLeaveState };
