import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDepartmentList = state => state.departments;

const selectDepartmentListData = createSelector(
  selectDepartmentList,
  state => get('departments.data', state),
);

const selectDepartmentListState = createSelector(
  selectDepartmentList,
  state => get('departments.state', state),
);

export { selectDepartmentListData, selectDepartmentListState };
