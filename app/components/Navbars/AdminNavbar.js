import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
} from 'reactstrap';
import useHooks from './hook';

export const AdminNavbar = props => {
  const { states, handlers } = useHooks();
  const { collapseOpen, color, modalChangePassword } = states;
  const { logout, toggleCollapse, toggleModalChangePassword } = handlers;
  const { toggleSidebar, sidebarOpened, brandText } = props;

  return (
    <>
      <Navbar className={classNames('navbar-absolute', color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames('navbar-toggle d-inline', {
                toggled: sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              {brandText}
            </NavbarBrand>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require('assets/img/anime3.png')} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem
                      className="nav-item"
                      onClick={toggleModalChangePassword}
                    >
                      Change password
                    </DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={() => logout()}>
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalChangePassword}
        toggle={toggleModalChangePassword}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalChangePassword}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal>
    </>
  );
};

AdminNavbar.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarOpened: PropTypes.any,
  brandText: PropTypes.string,
};

export default AdminNavbar;
