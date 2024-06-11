import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, NavItem, Button } from 'reactstrap';

const UnauthenticatedNavbar = () => {
  return (
    <Navbar className="border-bottom border-dark px-2">
      <Link to="/">
        <img
          alt="logo"
          src="/logo.svg"
          style={{
            height: 60,
            width: 60,
          }}
        />
        <h1 className="text-dark">voice</h1>
      </Link>

      <Nav>
        <NavItem className="d-none d-sm-block m-2">
          <Link to="/login">Sign in</Link>
        </NavItem>
        <NavItem>
          <Link to="/signup">
            <Button color="dark">Get started</Button>
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default UnauthenticatedNavbar;
