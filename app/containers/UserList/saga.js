import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getUsers } from 'services/user';
import { actions } from './slice';

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

export default function* defaultSaga() {
  yield all([fork(getUserListWatcher)]);
}
