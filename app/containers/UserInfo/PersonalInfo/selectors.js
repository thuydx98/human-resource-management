import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUserInfo = state => state.personalInfo;

const selectUpdatePersonalState = createSelector(
  selectUserInfo,
  state => get('updatePersonalInfo.status', state),
);

export { selectUpdatePersonalState };
