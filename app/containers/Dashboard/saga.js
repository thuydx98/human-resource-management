import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/leave/index';
import { getList as getListTask, save as saveTask } from 'services/task/index';
import { getUsers } from 'services/user';
import { v4 as uuid } from 'uuid';
import { actions } from './slice';

export function* getListLeaveWatcher() {
  yield takeLatest(actions.getListLeave, getListLeaveTask);
}

export function* getListLeaveTask(action) {
  const { year, userId } = action.payload;
  const { response, error } = yield call(getList, year, userId);
  if (response) {
    yield put(actions.getListLeaveSuccess(response.obj));
  } else {
    yield put(actions.getListLeaveFailed(error));
  }
}

export function* getListTaskWatcher() {
  yield takeLatest(actions.getListTask, getListTaskTask);
}

export function* getListTaskTask(action) {
  const { times, userId } = action.payload;
  const { response, error } = yield call(getListTask, times, userId);
  if (response) {
    const { tasks, details } = response.obj;
    yield put(
      actions.getListTaskSuccess({
        tasks: tasks.length === 0 ? [{ id: uuid(), time: times }] : tasks,
        details,
      }),
    );
  } else {
    yield put(actions.getListLeaveFailed(error));
  }
}

export function* saveTaskWatcher() {
  yield takeLatest(actions.saveTask, saveTaskTask);
}

export function* saveTaskTask(action) {
  const { tasks, userId, time } = action.payload;
  const { response, error } = yield call(saveTask, tasks, userId, 'save', time);
  if (response) {
    yield put(actions.saveTaskSuccess(response.obj));
  } else {
    yield put(actions.saveTaskFailed(error));
  }
}

export function* submitTaskWatcher() {
  yield takeLatest(actions.submitTask, submitTaskTask);
}

export function* submitTaskTask(action) {
  const { tasks, userId } = action.payload;
  const { response, error } = yield call(saveTask, tasks, userId, 'submit');
  if (response) {
    yield put(actions.submitTaskSuccess(response.obj));
  } else {
    yield put(actions.submitTaskFailed(error));
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
  yield all([
    fork(getListLeaveWatcher),
    fork(getListTaskWatcher),
    fork(saveTaskWatcher),
    fork(submitTaskWatcher),
    fork(getUserListWatcher),
  ]);
}
