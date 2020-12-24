import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { save } from 'services/user/project-info';
import { getList } from 'services/project';
import { actions } from './slice';

export function* saveProjectInfoWatcher() {
  yield takeLatest(actions.saveProjectInfo, saveProjectInfoTask);
}

export function* saveProjectInfoTask(action) {
  const { response, error } = yield call(
    save,
    action.payload,
    action.payload.userId,
  );
  if (response) {
    yield put(actions.saveProjectInfoSuccess(response.obj));
  } else {
    yield put(actions.saveProjectInfoFailed(error));
  }
}

export function* getProjectListWatcher() {
  yield takeLatest(actions.getProjectList, getProjectListTask);
}

export function* getProjectListTask() {
  const { response } = yield call(getList);
  if (response) {
    yield put(actions.getProjectListSuccess(response.obj));
  }
}

export default function* defaultSaga() {
  yield all([fork(saveProjectInfoWatcher), fork(getProjectListWatcher)]);
}
