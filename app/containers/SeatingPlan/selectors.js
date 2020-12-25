import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectSeatingPlan = state => state.seatingPlan;

const selectListSeatData = createSelector(
  selectSeatingPlan,
  state => get('seats.data', state),
);

const selectListSeatState = createSelector(
  selectSeatingPlan,
  state => get('seats.state', state),
);

const selectUserListData = createSelector(
  selectSeatingPlan,
  state => get('users.data', state),
);

const selectUserListState = createSelector(
  selectSeatingPlan,
  state => get('users.state', state),
);

const selectSaveSeatData = createSelector(
  selectSeatingPlan,
  state => get('saveSeat.data', state),
);

const selectSaveSeatState = createSelector(
  selectSeatingPlan,
  state => get('saveSeat.state', state),
);

export {
  selectListSeatData,
  selectListSeatState,
  selectUserListData,
  selectUserListState,
  selectSaveSeatData,
  selectSaveSeatState,
};
