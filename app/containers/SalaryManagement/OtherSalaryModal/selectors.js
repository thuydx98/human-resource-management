import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectOtherSalaries = state => state.otherSalaries;

const selectUpdateStatus = createSelector(
  selectOtherSalaries,
  state => get('others.status', state),
);

export { selectUpdateStatus };
