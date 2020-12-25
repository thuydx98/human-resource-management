import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getListContract } from 'services/user/contract';
import { actions } from './slice';

// export function* getContractListWatcher() {
//   yield takeLatest(actions.getContractList, getContractListTask);
// }

// export function* getContractListTask() {
//   const { response, error } = yield call(getListContract);
//   if (response) {
//     yield put(actions.getContractListSuccess(response.obj));
//   } else {
//     yield put(actions.getContractListFailed(error));
//   }
// }

export default function* defaultSaga() {
  yield all([
    /*fork(getContractListWatcher)*/
  ]);
}
