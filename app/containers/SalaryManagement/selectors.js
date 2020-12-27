import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectSalaries = state => state.salaries;

const selectListSalaryData = createSelector(
  selectSalaries,
  state => get('salaryList.data', state),
);

const selectListSalaryState = createSelector(
  selectSalaries,
  state => get('salaryList.state', state),
);

const selectSaveSalaryListState = createSelector(
  selectSalaries,
  state => get('saveListSalary.state', state),
);

const selectSendReportState = createSelector(
  selectSalaries,
  state => get('sendReport.state', state),
);

export {
  selectListSalaryData,
  selectListSalaryState,
  selectSaveSalaryListState,
  selectSendReportState,
};
