import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  saveProjectInfo: {
    data: null,
    state: null,
    error: null,
  },
  projectList: {
    data: [],
    state: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'projectInfo',
  initialState,
  reducers: {
    saveProjectInfo(state) {
      return flow(
        set('saveProjectInfo.state', ACTION_STATUS.PENDING),
        set('saveProjectInfo.error', null),
      )(state);
    },
    saveProjectInfoSuccess(state, action) {
      return flow(
        set('saveProjectInfo.data', action.payload),
        set('saveProjectInfo.state', ACTION_STATUS.SUCCESS),
        set('saveProjectInfo.error', null),
      )(state);
    },
    saveProjectInfoFailed(state, action) {
      return flow(
        set('saveProjectInfo.state', ACTION_STATUS.FAILED),
        set('saveProjectInfo.error', action.payload),
      )(state);
    },
    resetState(state) {
      return flow(set('saveProjectInfo', initialState.saveProjectInfo))(state);
    },
    getProjectList(state) {
      return flow(
        set('projectList.state', ACTION_STATUS.PENDING),
        set('projectList.error', null),
      )(state);
    },
    getProjectListSuccess(state, action) {
      return flow(
        set('projectList.data', action.payload),
        set('projectList.state', ACTION_STATUS.SUCCESS),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
