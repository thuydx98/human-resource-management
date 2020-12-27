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

const selectListTaskData = createSelector(
  selectDashboard,
  state => get('tasks.data', state),
);

const selectListTaskState = createSelector(
  selectDashboard,
  state => get('tasks.state', state),
);

export {
  selectListLeaveData,
  selectListLeaveState,
  selectListTaskData,
  selectListTaskState,
};
