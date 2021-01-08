import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectPosition = state => state.positions;

const selectListDepartment = createSelector(
  selectPosition,
  state => get('departments.data', state),
);

const selectListDepartmentStatus = createSelector(
  selectPosition,
  state => get('departments.state', state),
);

const selectUserListData = createSelector(
  selectPosition,
  state => get('users.data', state),
);

const selectUserListState = createSelector(
  selectPosition,
  state => get('users.state', state),
);

export {
  selectListDepartment,
  selectListDepartmentStatus,
  selectUserListData,
  selectUserListState,
};
