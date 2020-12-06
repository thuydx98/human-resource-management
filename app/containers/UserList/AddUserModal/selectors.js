import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUserList = state => state.addUser;

const selectAddUserStatus = createSelector(
  selectUserList,
  state => get('addUser.status', state),
);

export { selectAddUserStatus };
