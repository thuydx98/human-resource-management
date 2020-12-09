import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selector = state => state.updateUser;

const selectUpdateUserStatus = createSelector(
  selector,
  state => get('updateUser.status', state),
);

export { selectUpdateUserStatus };
