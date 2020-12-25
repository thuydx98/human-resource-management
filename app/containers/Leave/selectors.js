import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectUserLeave = state => state.userLeave || initialState;

const selectListLeaveData = createSelector(
  selectUserLeave,
  state => get('leaves.data', state),
);

const selectListLeaveState = createSelector(
  selectUserLeave,
  state => get('leaves.state', state),
);

const selectSelectedYear = createSelector(
  selectUserLeave,
  state => get('selectedYear', state),
);

const selectCancelState = createSelector(
  selectUserLeave,
  state => get('cancel.state', state),
);

const selectCancelData = createSelector(
  selectUserLeave,
  state => get('cancel.data', state),
);

export {
  selectListLeaveData,
  selectListLeaveState,
  selectSelectedYear,
  selectCancelState,
  selectCancelData,
};
