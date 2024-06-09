import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { removeToken } from '../../util';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {
  House,
  FileText,
  PencilSquare,
  CaretDownFill,
} from 'react-bootstrap-icons';

import Avatar from '../User/Avatar/Avatar';

const AuthenticatedNav = () => {
  const { store, setIsAuthenticated, dispatch } =
    useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //!todo call dispacth delete user
  const LoggoutHandler = (e) => {
    dispatch({
      type: 'USER_SUCCESS',
      payload: {
        user: '',
      },
    });
    removeToken('token');
    setIsAuthenticated(false);
  };

  return (
    <Navbar expand="sm" color="light" className="navBar">
      <Container className="sidebar-wrapper">
        <Container className="p-0 d-flex justify-content-between">
          <NavbarBrand className="m-0" to="/dashboard">
            <img alt="logo" src="/logo.svg" className="logo" />
          </NavbarBrand>

          <NavbarToggler onClick={toggle} className="me-2 border-0">
            <Avatar user={store.user} size="thumbnail" />
            <CaretDownFill size={16} color="black" />
          </NavbarToggler>
        </Container>
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar vertical="sm" className="sidebar-nav pt-5">
            <NavItem className="pt-5 d-none d-sm-block">
              <Link to="/dashboard">
                <House size={24} />
              </Link>
            </NavItem>

            <NavItem>
              <Link to={`/dashboard/stories`}>
                <span className="d-none d-sm-block">
                  <FileText size={24} />
                </span>
                <p className="d-sm-none">Your stories </p>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={`/dashboard/new`}>
                <span className="d-none d-sm-block">
                  <PencilSquare size={24} />
                </span>
                <p className="d-sm-none">Write a story</p>
              </Link>
            </NavItem>
            <NavItem className="d-sm-none">
              <Link to={`/dashboard/settings`}>
                <p className="d-sm-none">Setting</p>
              </Link>
            </NavItem>
            <NavItem onClick={LoggoutHandler} className="d-sm-none">
              <p className="d-sm-none">Sign Out</p>
            </NavItem>

            <UncontrolledDropdown
              direction="up"
              className="d-none d-sm-block"
            >
              <DropdownToggle className="toggle p-0">
                <Avatar user={store.user} size="thumbnail" />
              </DropdownToggle>
              <DropdownMenu className="border-0 mb-2">
                <DropdownItem className="py-4">
                  <Link to={`/dashboard/settings`}>Settings</Link>
                </DropdownItem>
                <DropdownItem
                  onClick={LoggoutHandler}
                  className=" pb-4"
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthenticatedNav;
