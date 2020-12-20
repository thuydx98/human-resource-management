import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectBankAccount = state => state.bankAccount;

const selectSaveBankAccountData = createSelector(
  selectBankAccount,
  state => get('saveBankAccount.data', state),
);

const selectSaveBankAccountState = createSelector(
  selectBankAccount,
  state => get('saveBankAccount.state', state),
);

const selectBankList = createSelector(
  selectBankAccount,
  state => get('bankList.data', state),
);

const selectBankListState = createSelector(
  selectBankAccount,
  state => get('bankList.state', state),
);

export {
  selectSaveBankAccountData,
  selectSaveBankAccountState,
  selectBankList,
  selectBankListState,
};
