import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList, saveSeat } from 'services/seating-plan';
import { getUsers } from 'services/user';
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

export function* getUserListWatcher() {
  yield takeLatest(actions.getUserList, getUserListTask);
}

export function* getUserListTask() {
  const { response, error } = yield call(getUsers);
  if (response) {
    yield put(actions.getUserListSuccess(response.obj));
  } else {
    yield put(actions.getUserListFailed(error));
  }
}

export function* saveSeatWatcher() {
  yield takeLatest(actions.saveSeat, saveSeatTask);
}

export function* saveSeatTask(action) {
  const { response } = yield call(saveSeat, action.payload);
  if (response) {
    yield put(actions.saveSeatSuccess(response.obj));
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getListSeatWatcher),
    fork(getUserListWatcher),
    fork(saveSeatWatcher),
  ]);
}
