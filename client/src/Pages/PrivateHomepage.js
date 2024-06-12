import React, { useContext } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { AuthContext } from '../Context/AuthContext';

import { FilterButton } from '../Components/Article/Feeds/FilterButton';
import { SuggestedPosts } from '../Components/Article/SuggestedPosts/SuggestedPost';
import { SuggestedUsers } from '../Components/User/SuggestedUser/SuggestedUsers';
import { ListTopics } from '../Components/Topics/ListTopics/ListTopics';

import { SearchBar } from '../Components/Search/Search';

const PrivateHomepage = () => {
  const { store } = useContext(AuthContext);
  return (
    <Container fluid>
      <Row sm="2" xs="1">
        <Col sm={8} className="p-0">
          {store.user.topics > 0 ? (
            <Row>
              <Col>
                <h5 className="d-none d-sm-block py-2">
                  your topics
                </h5>
              </Col>
              <Col className="d-flex justify-content-end align-items-baseline">
                <ListTopics topics={store.user.topics} />
              </Col>
            </Row>
          ) : null}
          <Container fluid className="border-bottom" s>
            <FilterButton />
          </Container>

          <Container fluid className="p-4">
            <Container>
              <SuggestedPosts articles={store.articles} />
            </Container>
          </Container>
        </Col>
        <Col sm={4} className="pt-4 border-start">
          <Container>
            <SearchBar />
            <Container className="my-4">
              <h5>Recommended topics</h5>
              <ListTopics topics={store.topics} />
            </Container>
            <Container className="my-4">
              <h5>Who to follow</h5>
              <SuggestedUsers users={store.users} />
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivateHomepage;
