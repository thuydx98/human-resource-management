import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectProjectInfo = state => state.projectInfo;

const selectSaveProjectInfoData = createSelector(
  selectProjectInfo,
  state => get('saveProjectInfo.data', state),
);

const selectSaveProjectInfoState = createSelector(
  selectProjectInfo,
  state => get('saveProjectInfo.state', state),
);

const selectProjectList = createSelector(
  selectProjectInfo,
  state => get('projectList.data', state),
);

const selectProjectListState = createSelector(
  selectProjectInfo,
  state => get('projectList.state', state),
);

export {
  selectSaveProjectInfoData,
  selectSaveProjectInfoState,
  selectProjectList,
  selectProjectListState,
};
