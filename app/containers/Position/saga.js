import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/department';
import { getUsers } from 'services/user';
import { actions } from './slice';

export function* getListDepartmentWatcher() {
  yield takeLatest(actions.getListDepartment, getListDepartmentTask);
}

export function* getListDepartmentTask() {
  const { response, error } = yield call(getList);
  if (response) {
    yield put(actions.getListDepartmentSuccess(response.obj));
  } else {
    yield put(actions.getListDepartmentFailed(error));
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

export default function* defaultSaga() {
  yield all([fork(getListDepartmentWatcher), fork(getUserListWatcher)]);
}
