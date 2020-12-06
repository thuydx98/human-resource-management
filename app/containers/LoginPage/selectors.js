import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectLoginPage = state => state.loginPage;

const makeSelectLoginStatus = createSelector(
  selectLoginPage,
  state => get('state', state),
);
const makeSelectLoginError = createSelector(
  selectLoginPage,
  state => get('error', state),
);

export { makeSelectLoginStatus, makeSelectLoginError };
