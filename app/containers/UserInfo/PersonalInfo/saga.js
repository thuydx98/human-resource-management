import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { updateUser } from 'services/user';
import { actions } from './slice';

export function* updatePersonalWatcher() {
  yield takeLatest(actions.updatePersonalInfo, updatePersonalTask);
}

export function* updatePersonalTask(action) {
  const { response, error } = yield call(updateUser, action.payload);
  if (response) {
    yield put(actions.updatePersonalInfoSuccess());
  } else {
    yield put(actions.updatePersonalInfoFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(updatePersonalWatcher)]);
}
