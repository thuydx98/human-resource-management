/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminLayout from 'containers/Layouts/Admin/Admin';
import RTLLayout from 'containers/Layouts/RTL/RTL';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/rtl" render={props => <RTLLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
