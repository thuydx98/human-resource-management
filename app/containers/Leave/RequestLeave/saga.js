import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { create } from 'services/leave/index';
import { actions } from './slice';

export function* requestLeaveWatcher() {
  yield takeLatest(actions.requestLeave, requestLeaveTask);
}

export function* requestLeaveTask(action) {
  const { response, error } = yield call(
    create,
    action.payload,
    action.payload[0].userId,
  );
  if (response) {
    yield put(actions.requestLeaveSuccess(response.obj));
  } else {
    yield put(actions.requestLeaveFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(requestLeaveWatcher)]);
}
