import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUserList = state => state.userList;

const selectUserListData = createSelector(
  selectUserList,
  state => get('userList.data', state),
);

const selectUserListState = createSelector(
  selectUserList,
  state => get('userList.state', state),
);
const selectDeleteState = createSelector(
  selectUserList,
  state => get('deleteUser.state', state),
);

export { selectUserListData, selectUserListState, selectDeleteState };
