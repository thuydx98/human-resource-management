import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from 'containers/Layout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';

import { useInjectReducer } from 'utils/injectReducer';
import { sliceKey, reducer } from './slice';

import GlobalStyle from '../../global-styles';
import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';
import useHooks from './hook';

export default function App() {
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { isAuthenticated } = selectors;

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - HRM" defaultTitle="HRM">
        <meta name="description" content="Human resource management" />
      </Helmet>
      {!isAuthenticated ? (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/admin" render={props => <Layout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </BrowserRouter>
  );
}
