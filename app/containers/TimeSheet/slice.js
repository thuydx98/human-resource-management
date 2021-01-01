import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  tasks: {
    data: [],
    state: null,
    error: null,
  },
  saveTasks: [],
  submitTasks: [],
};

const slice = createSlice({
  name: 'timeSheet',
  initialState,
  reducers: {
    getTaskList(state) {
      return flow(
        set('tasks.state', ACTION_STATUS.PENDING),
        set('tasks.error', null),
      )(state);
    },
    getTaskListSuccess(state, action) {
      return flow(
        set('tasks.data', action.payload),
        set('tasks.state', ACTION_STATUS.SUCCESS),
        set('tasks.error', null),
      )(state);
    },
    getTaskListFailed(state, action) {
      return flow(
        set('tasks.state', ACTION_STATUS.FAILED),
        set('tasks.error', action.payload),
      )(state);
    },
    setState(state, action) {
      return flow(
        set('tasks.data', action.payload.tasks),
        set('saveTasks', action.payload.save),
        set('submitTasks', action.payload.submit),
      )(state);
    },
    saveTask(state, action) {
      return flow(
        set(`saveTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.PENDING,
          error: null,
        }),
      )(state);
    },
    saveTaskSuccess(state, action) {
      return flow(
        set(`saveTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.SUCCESS,
          error: null,
        }),
      )(state);
    },
    saveTaskFailed(state, action) {
      return flow(
        set(`saveTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.FAILED,
          error: action.payload.error,
        }),
      )(state);
    },
    submitTask(state, action) {
      return flow(
        set(`submitTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.PENDING,
          error: null,
        }),
      )(state);
    },
    submitTaskSuccess(state, action) {
      return flow(
        set(`submitTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.SUCCESS,
          error: null,
        }),
      )(state);
    },
    submitTaskFailed(state, action) {
      return flow(
        set(`submitTasks[${action.payload.index}]`, {
          status: ACTION_STATUS.FAILED,
          error: action.payload.error,
        }),
      )(state);
    },
    resetState(state, action) {
      return flow(
        set(`saveTasks[${action.payload}]`, {
          status: null,
          error: null,
        }),
        set(`submitTasks[${action.payload}]`, {
          status: null,
          error: null,
        }),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
