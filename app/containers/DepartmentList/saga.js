import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/department';
import { actions } from './slice';

export function* getDepartmentListWatcher() {
  yield takeLatest(actions.getDepartmentList, getDepartmentListTask);
}

export function* getDepartmentListTask() {
  const { response, error } = yield call(getList);
  if (response) {
    yield put(actions.getDepartmentListSuccess(response.obj));
  } else {
    yield put(actions.getDepartmentListFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getDepartmentListWatcher)]);
}
