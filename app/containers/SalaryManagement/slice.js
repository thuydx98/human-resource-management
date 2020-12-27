import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  salaryList: {
    data: [],
    state: null,
    error: null,
  },
  saveListSalary: {
    state: null,
    error: null,
  },
  exportListSalary: {
    state: null,
    error: null,
  },
  sendReport: {
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'salaries',
  initialState,
  reducers: {
    setSalaryList(state, action) {
      return flow(
        set('salaryList.data', action.payload),
        set('saveListSalary', initialState.salaryList),
      )(state);
    },
    getSalaryList(state) {
      return flow(
        set('saveListSalary', initialState.salaryList),
        set('salaryList.data', []),
        set('salaryList.state', ACTION_STATUS.PENDING),
        set('salaryList.error', null),
      )(state);
    },
    getSalaryListSuccess(state, action) {
      return flow(
        set('salaryList.data', calculateSalaries(action.payload || [])),
        set('salaryList.state', ACTION_STATUS.SUCCESS),
        set('salaryList.error', null),
      )(state);
    },
    getSalaryListFailed(state, action) {
      return flow(
        set('salaryList.state', ACTION_STATUS.FAILED),
        set('salaryList.error', action.payload),
      )(state);
    },
    saveListSalary(state) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.PENDING),
        set('saveListSalary.error', null),
      )(state);
    },
    saveListSalarySuccess(state) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.SUCCESS),
        set('saveListSalary.error', null),
      )(state);
    },
    saveListSalaryFailed(state, action) {
      return flow(
        set('saveListSalary.state', ACTION_STATUS.FAILED),
        set('saveListSalary.error', action.payload),
      )(state);
    },
    exportListSalary(state) {
      return flow(
        set('exportListSalary.state', ACTION_STATUS.PENDING),
        set('exportListSalary.error', null),
      )(state);
    },
    exportListSalarySuccess(state) {
      return flow(
        set('exportListSalary.state', ACTION_STATUS.SUCCESS),
        set('exportListSalary.error', null),
      )(state);
    },
    resetSendReport(state) {
      return flow(set('sendReport', initialState.sendReport))(state);
    },
    sendReport(state) {
      return flow(
        set('sendReport.state', ACTION_STATUS.PENDING),
        set('sendReport.error', null),
      )(state);
    },
    sendReportSuccess(state) {
      return flow(
        set('sendReport.state', ACTION_STATUS.SUCCESS),
        set('sendReport.error', null),
      )(state);
    },
    sendReportFailed(state, action) {
      return flow(
        set('sendReport.state', ACTION_STATUS.FAILED),
        set('sendReport.error', action.payload),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;

export const calculateTax = income => {
  const taxAmount = income - 11000000;
  if (taxAmount <= 0) return 0;

  let total = 0;
  if (taxAmount < 5000000) return taxAmount * 0.05;
  total += (5000000 - 0) * 0.05;

  if (taxAmount < 10000000) return total + (taxAmount - 5000000) * 0.1;
  total += (10000000 - 5000000) * 0.1;

  if (taxAmount < 18000000) return total + (taxAmount - 10000000) * 0.15;
  total += (18000000 - 10000000) * 0.15;

  if (taxAmount < 32000000) return total + (taxAmount - 18000000) * 0.2;
  total += (32000000 - 18000000) * 0.2;

  if (taxAmount < 52000000) return total + (taxAmount - 32000000) * 0.25;
  total += (52000000 - 32000000) * 0.25;

  if (taxAmount < 80000000) return total + (taxAmount - 52000000) * 0.3;
  total += (80000000 - 52000000) * 0.3;

  return total + (taxAmount - 80000000) * 0.35;
};

const calculateSalaries = list => {
  if (!list) return null;
  const salaries = [...list];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of salaries) {
    if (item.actualGross) break;
    item.actualGross =
      (item.gross / item.totalWorkingDateOfMonth) * item.totalWorkingDate;
    item.social = item.actualGross * 0.08;
    item.companySocial = item.actualGross * 0.175;
    item.health = item.actualGross * 0.015;
    item.companyHealth = item.actualGross * 0.03;
    item.unemployment = item.actualGross * 0.01;
    item.other = item.others.reduce((a, b) => a + b.amount, 0);
    item.tax = calculateTax(
      item.actualGross +
        item.other -
        item.health -
        item.social -
        item.unemployment,
    );
    item.net =
      item.actualGross +
      item.other -
      item.social -
      item.health -
      item.unemployment -
      item.tax;
    item.total =
      item.actualGross +
      item.companyHealth +
      item.companySocial +
      item.unemployment +
      item.other;
  }

  return salaries;
};
