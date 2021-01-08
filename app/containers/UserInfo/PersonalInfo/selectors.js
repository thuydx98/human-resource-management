import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUserInfo = state => state.personalInfo;

const selectUpdatePersonalState = createSelector(
  selectUserInfo,
  state => get('updatePersonalInfo.status', state),
);

const selectListDepartment = createSelector(
  selectUserInfo,
  state => get('departments.data', state),
);

const selectListDepartmentStatus = createSelector(
  selectUserInfo,
  state => get('departments.state', state),
);

export {
  selectUpdatePersonalState,
  selectListDepartment,
  selectListDepartmentStatus,
};
