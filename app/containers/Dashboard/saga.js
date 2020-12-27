import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { getList } from 'services/leave/index';
import { getList as getListTask } from 'services/task/index';
import { flow, groupBy, toPairs, map, zipObject } from 'lodash/fp';
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
    const items = flow(
      groupBy('id'),
      toPairs,
      map(item => zipObject(['id', 'details'], item)),
      map(item => ({
        id: item.id,
        activity: item.details[0].activity,
        task: item.details[0].task,
        project: item.details[0].project,
        time: item.details[0].time,
        submitted: item.details[0].submitted,
        details: item.details.map(detail => ({
          id: detail.tdId,
          taskId: detail.tdTaskId,
          workingDate: detail.tdWorkingDate,
          workingHour: detail.tdWorkingHour,
        })),
      })),
    )(response.obj);

    yield put(actions.getListTaskSuccess(items));
  } else {
    yield put(actions.getListLeaveFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getListLeaveWatcher), fork(getListTaskWatcher)]);
}
