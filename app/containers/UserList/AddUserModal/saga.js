import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { createUser } from 'services/user';
import { actions } from './slice';

export function* addUserWatcher() {
  yield takeLatest(actions.addUser, addUserTask);
}

export function* addUserTask(action) {
  const { email, password } = action.payload;
  const { response, error } = yield call(createUser, email, password);
  if (response) {
    yield put(actions.addUserSuccess());
  } else {
    yield put(actions.addUserFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(addUserWatcher)]);
}
