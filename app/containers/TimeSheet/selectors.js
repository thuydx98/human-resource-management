import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectContractList = state => state.contractList;

const selectContractListData = createSelector(
  selectContractList,
  state => get('contractList.data', state),
);

const selectContractListState = createSelector(
  selectContractList,
  state => get('contractList.state', state),
);

export { selectContractListData, selectContractListState };
