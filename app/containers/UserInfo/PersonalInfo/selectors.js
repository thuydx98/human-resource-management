import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUserInfo = state => state.userInfo;

const selectUserInfoData = createSelector(
  selectUserInfo,
  state => get('userInfo.data', state),
);

const selectUserInfoState = createSelector(
  selectUserInfo,
  state => get('userInfo.state', state),
);

export { selectUserInfoData, selectUserInfoState };
