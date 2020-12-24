import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { save } from 'services/user/bank-account';
import { getList } from 'services/bank';
import { actions } from './slice';

export function* saveBankAccountWatcher() {
  yield takeLatest(actions.saveBankAccount, saveBankAccountTask);
}

export function* saveBankAccountTask(action) {
  const { response, error } = yield call(
    save,
    action.payload,
    action.payload.userId,
  );
  if (response) {
    yield put(actions.saveBankAccountSuccess(response.obj));
  } else {
    yield put(actions.saveBankAccountFailed(error));
  }
}

export function* getBankListWatcher() {
  yield takeLatest(actions.getBankList, getBankListTask);
}

export function* getBankListTask() {
  const { response } = yield call(getList);
  if (response) {
    yield put(actions.getBankListSuccess(response.obj));
  }
}

export default function* defaultSaga() {
  yield all([fork(saveBankAccountWatcher), fork(getBankListWatcher)]);
}
