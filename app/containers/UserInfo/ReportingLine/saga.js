import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { save } from 'services/user/feedback';
import { actions } from './slice';

export function* saveFeedbackWatcher() {
  yield takeLatest(actions.saveFeedback, saveFeedbackTask);
}

export function* saveFeedbackTask(action) {
  const { response, error } = yield call(
    save,
    action.payload,
    action.payload.userId,
  );
  if (response) {
    yield put(actions.saveFeedbackSuccess(response.obj));
  } else {
    yield put(actions.saveFeedbackFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(saveFeedbackWatcher)]);
}
