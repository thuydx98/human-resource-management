import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { update } from 'services/salary/other';
import { actions } from './slice';

export function* updateWatcher() {
  yield takeLatest(actions.update, updateTask);
}

export function* updateTask(action) {
  const { response, error } = yield call(update, action.payload);
  if (response) {
    yield put(actions.updateSuccess());
  } else {
    yield put(actions.updateFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(updateWatcher)]);
}
