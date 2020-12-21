import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectContract = state => state.contract;

const selectSaveContractData = createSelector(
  selectContract,
  state => get('saveContract.data', state),
);

const selectSaveContractState = createSelector(
  selectContract,
  state => get('saveContract.state', state),
);

export { selectSaveContractData, selectSaveContractState };
