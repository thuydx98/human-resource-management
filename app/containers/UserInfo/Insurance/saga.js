import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { update } from 'services/user/insurance';
import { actions } from './slice';

export function* updateInsuranceWatcher() {
  yield takeLatest(actions.updateInsurance, updateInsuranceTask);
}

export function* updateInsuranceTask(action) {
  const { response, error } = yield call(
    update,
    action.payload,
    action.payload.userId,
  );
  if (response) {
    yield put(actions.updateInsuranceSuccess(response.obj));
  } else {
    yield put(actions.updateInsuranceFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(updateInsuranceWatcher)]);
}
