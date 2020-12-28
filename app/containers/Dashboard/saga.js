import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/leave/index';
import { getList as getListTask } from 'services/task/index';
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

export function* getListTaskWatcher() {
  yield takeLatest(actions.getListTask, getListTaskTask);
}

export function* getListTaskTask(action) {
  const { times, userId } = action.payload;
  const { response, error } = yield call(getListTask, times, userId);
  if (response) {
    yield put(actions.getListTaskSuccess(response.obj));
  } else {
    yield put(actions.getListLeaveFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getListLeaveWatcher), fork(getListTaskWatcher)]);
}
