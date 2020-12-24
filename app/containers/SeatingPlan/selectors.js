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

export { selectListSeatData, selectListSeatState };
