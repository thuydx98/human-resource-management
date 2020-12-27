import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList, save, exportExcel, sendReport } from 'services/salary/index';
import { actions } from './slice';

export function* getSalaryListWatcher() {
  yield takeLatest(actions.getSalaryList, getSalaryListTask);
}

export function* getSalaryListTask(action) {
  const { response, error } = yield call(getList, action.payload);
  if (response) {
    yield put(actions.getSalaryListSuccess(response.obj));
  } else {
    yield put(actions.getSalaryListFailed(error));
  }
}

export function* saveSalaryListWatcher() {
  yield takeLatest(actions.saveListSalary, saveSalaryListTask);
}

export function* saveSalaryListTask(action) {
  const { response, error } = yield call(save, action.payload);
  if (response) {
    yield put(actions.saveListSalarySuccess());
  } else {
    yield put(actions.saveListSalaryFailed(error));
  }
}

export function* exportSalaryListWatcher() {
  yield takeLatest(actions.exportListSalary, exportSalaryListTask);
}

export function* exportSalaryListTask(action) {
  const { response } = yield call(exportExcel, action.payload);
  if (response) {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `salaries.${action.payload[0].time}.xlsx`);
    document.body.appendChild(link);
    link.click();
    yield put(actions.exportListSalarySuccess());
  }
}

export function* sendReportWatcher() {
  yield takeLatest(actions.sendReport, sendReportTask);
}

export function* sendReportTask(action) {
  const { response, error } = yield call(sendReport, action.payload);
  if (response) {
    yield put(actions.sendReportSuccess());
  } else {
    yield put(actions.sendReportFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getSalaryListWatcher),
    fork(saveSalaryListWatcher),
    fork(exportSalaryListWatcher),
    fork(sendReportWatcher),
  ]);
}
