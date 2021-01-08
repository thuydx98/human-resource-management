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

const selectSaveTaskState = createSelector(
  selectDashboard,
  state => get('saveTasks.state', state),
);

const selectSubmitTaskState = createSelector(
  selectDashboard,
  state => get('submitTasks.state', state),
);

const selectUserListData = createSelector(
  selectDashboard,
  state => get('users.data', state),
);

const selectUserListState = createSelector(
  selectDashboard,
  state => get('users.state', state),
);

export {
  selectListLeaveData,
  selectListLeaveState,
  selectListTaskData,
  selectListTaskState,
  selectSaveTaskState,
  selectSubmitTaskState,
  selectUserListData,
  selectUserListState,
};
