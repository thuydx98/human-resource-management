import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/leave/index';
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

export default function* defaultSaga() {
  yield all([fork(getListLeaveWatcher)]);
}
