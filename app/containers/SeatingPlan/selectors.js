import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDepartmentList = state => state.departmentList;

const selectDepartmentListData = createSelector(
  selectDepartmentList,
  state => get('departmentList.data', state),
);

const selectDepartmentListState = createSelector(
  selectDepartmentList,
  state => get('departmentList.state', state),
);

export { selectDepartmentListData, selectDepartmentListState };
