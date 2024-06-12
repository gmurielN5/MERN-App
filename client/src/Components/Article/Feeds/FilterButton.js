import React, { useContext } from 'react';
import { Container, Nav, NavItem, Button } from 'reactstrap';
import {
  listNewsFeed,
  listFollowing,
} from '../../../Services/ContentService';
import { AuthContext } from '../../../Context/AuthContext';

export const FilterButton = () => {
  const { store, dispatch } = useContext(AuthContext);
  const { user } = store;

  const newsfeeds = () => {
    listNewsFeed(dispatch);
  };
  const following = () => {
    listFollowing(user._id, dispatch);
  };

  return (
    <Container>
      <Nav>
        <NavItem>
          <Button color="link" onClick={newsfeeds} className="me-4">
            For You
          </Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={following} className="mx-4">
            Following
          </Button>
        </NavItem>
      </Nav>
    </Container>
  );
};
