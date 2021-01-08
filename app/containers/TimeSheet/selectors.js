import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectTimeSheet = state => state.timeSheet;

const selectTaskListData = createSelector(
  selectTimeSheet,
  state => get('tasks.data', state),
);

const selectTaskListState = createSelector(
  selectTimeSheet,
  state => get('tasks.state', state),
);

const selectSaveTaskState = createSelector(
  selectTimeSheet,
  state => get('saveTasks', state),
);

const selectSubmitTaskState = createSelector(
  selectTimeSheet,
  state => get('submitTasks', state),
);

const selectUserListData = createSelector(
  selectTimeSheet,
  state => get('users.data', state),
);

const selectUserListState = createSelector(
  selectTimeSheet,
  state => get('users.state', state),
);

export {
  selectTaskListData,
  selectTaskListState,
  selectSaveTaskState,
  selectSubmitTaskState,
  selectUserListData,
  selectUserListState,
};
