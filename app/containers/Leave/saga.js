import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList, cancel } from 'services/leave/index';
import { actions } from './slice';

export function* getListLeaveWatcher() {
  yield takeLatest(actions.getListLeave, getListLeaveTask);
}

export function* getListLeaveTask(action) {
  const { year, userId } = action.payload;
  const { response, error } = yield call(getList, year, userId);
  if (response) {
    yield put(actions.getListLeaveSuccess(response.obj));
  } else {
    yield put(actions.getListLeaveFailed(error));
  }
}

export function* cancelRequestWatcher() {
  yield takeLatest(actions.cancelRequest, cancelRequestTask);
}

export function* cancelRequestTask(action) {
  const { leaveId, userId } = action.payload;
  const { response } = yield call(cancel, leaveId, userId);
  if (response) {
    yield put(actions.cancelRequestSuccess(response.obj));
  }
}

export default function* defaultSaga() {
  yield all([fork(getListLeaveWatcher), fork(cancelRequestWatcher)]);
}
