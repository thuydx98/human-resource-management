import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/seating-plan';
import { actions } from './slice';

export function* getListSeatWatcher() {
  yield takeLatest(actions.getListSeat, getListSeatTask);
}

export function* getListSeatTask() {
  const { response, error } = yield call(getList);
  if (response) {
    yield put(actions.getListSeatSuccess(response.obj));
  } else {
    yield put(actions.getListSeatFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getListSeatWatcher)]);
}
