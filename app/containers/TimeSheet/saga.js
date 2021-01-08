import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList, save as saveTask } from 'services/task/index';
import { getUsers } from 'services/user';
import { v4 as uuid } from 'uuid';
import { actions } from './slice';

export function* getTaskListWatcher() {
  yield takeLatest(actions.getTaskList, getTaskListTask);
}

export function* getTaskListTask(action) {
  const { times, userId } = action.payload;
  const { response, error } = yield call(
    getList,
    times.map(item => item.format('YYYY-MM-DD')).join(','),
    userId,
  );
  if (response) {
    const { tasks: allTasks, details: allDetails } = response.obj;
    const groupData = times.map(monday => {
      const tasks = allTasks.filter(
        task => task.time === monday.format('YYYY-MM-DD'),
      );
      const taskIds = tasks.map(item => item.id);
      const details = allDetails.filter(detail =>
        taskIds.includes(detail.taskId),
      );

      return {
        tasks:
          tasks.length === 0
            ? [{ id: uuid(), time: monday.format('YYYY-MM-DD') }]
            : tasks,
        details,
      };
    });

    yield put(actions.getTaskListSuccess(groupData));
  } else {
    yield put(actions.getTaskListFailed(error));
  }
}

export function* saveTaskWatcher() {
  yield takeLatest(actions.saveTask, saveTaskTask);
}

export function* saveTaskTask(action) {
  const { tasks, userId, index, time } = action.payload;
  const { response, error } = yield call(saveTask, tasks, userId, 'save', time);
  if (response) {
    yield put(actions.saveTaskSuccess({ index }));
  } else {
    yield put(actions.saveTaskFailed({ index, error }));
  }
}

export function* submitTaskWatcher() {
  yield takeLatest(actions.submitTask, submitTaskTask);
}

export function* submitTaskTask(action) {
  const { tasks, userId, index } = action.payload;
  const { response, error } = yield call(saveTask, tasks, userId, 'submit');
  if (response) {
    yield put(actions.submitTaskSuccess({ index }));
  } else {
    yield put(actions.submitTaskFailed({ index, error }));
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
    fork(getTaskListWatcher),
    fork(saveTaskWatcher),
    fork(submitTaskWatcher),
    fork(getUserListWatcher),
  ]);
}
