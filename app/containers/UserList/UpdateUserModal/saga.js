import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { updateEmployee } from 'services/employee';
import { actions } from './slice';

export function* updateUserWatcher() {
  yield takeLatest(actions.updateUser, updateUserTask);
}

export function* updateUserTask(action) {
  const { response, error } = yield call(updateEmployee, action.payload);
  if (response) {
    yield put(actions.updateUserSuccess());
  } else {
    yield put(actions.updateUserFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(updateUserWatcher)]);
}
