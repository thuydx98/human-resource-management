import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectUpdateInsurance = state => state.updateInsurance;

const selectUpdateInsuranceState = createSelector(
  selectUpdateInsurance,
  state => get('updateInsurance.state', state),
);

export { selectUpdateInsuranceState };
