/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-string-refs */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// core components
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import routes from 'routes';

import logo from 'assets/img/react-logo.png';

let ps;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      const tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i += 1) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        const tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i += 1) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = routes =>
    routes.map((prop, index) => (
      <Route path={prop.path} component={prop.component} key={index} />
    ));

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = () => {
    for (let i = 0; i < routes.length; i += 1) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].uri || routes[i].path,
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: 'https://hcmute.edu.vn/',
              text: 'Human Resource',
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/dashboard" />
            </Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf('maps') !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
