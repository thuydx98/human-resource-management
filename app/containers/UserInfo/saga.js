import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getUser, uploadAvatar } from 'services/user';
import { actions } from './slice';

export function* getUserInfoWatcher() {
  yield takeLatest(actions.getUser, getUserInfoTask);
}

export function* getUserInfoTask(action) {
  const { response, error } = yield call(getUser, action.payload);
  if (response) {
    yield put(actions.getUserSuccess(response.obj));
  } else {
    yield put(actions.getUserFailed(error));
  }
}

export function* uploadAvatarWatcher() {
  yield takeLatest(actions.uploadAvatar, uploadAvatarTask);
}

export function* uploadAvatarTask(action) {
  const { image, userId } = action.payload;
  const { response, error } = yield call(uploadAvatar, image, userId);
  if (response) {
    yield put(actions.uploadAvatarSuccess(response.obj));
  } else {
    yield put(actions.uploadAvatarFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getUserInfoWatcher), fork(uploadAvatarWatcher)]);
}
