import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList, save } from 'services/salary/index';
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

export default function* defaultSaga() {
  yield all([fork(getSalaryListWatcher), fork(saveSalaryListWatcher)]);
}
