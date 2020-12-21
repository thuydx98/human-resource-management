import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { save } from 'services/contract';
import { actions } from './slice';

export function* saveContractWatcher() {
  yield takeLatest(actions.saveContract, saveContractTask);
}

export function* saveContractTask(action) {
  const { response, error } = yield call(
    save,
    action.payload,
    action.payload.userId,
  );
  if (response) {
    yield put(actions.saveContractSuccess(response.obj));
  } else {
    yield put(actions.saveContractFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(saveContractWatcher)]);
}
