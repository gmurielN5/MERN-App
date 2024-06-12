import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'reactstrap';
import { AuthContext } from '../Context/AuthContext';
import { listNewsFeed } from '../Services/ContentService';

import { HeroAnimation } from '../Components/Animation/HeroAnimation';
import { SuggestedPosts } from '../Components/Article/SuggestedPosts/SuggestedPost';
import { ListTopics } from '../Components/Topics/ListTopics/ListTopics';
import { SuggestedUsers } from '../Components/User/SuggestedUser/SuggestedUsers';

import { GraphUpArrow } from 'react-bootstrap-icons';

const PublicHomePage = () => {
  const { store, dispatch } = useContext(AuthContext);

  useEffect(() => {
    let didCancel = false;
    const fetchArticles = () => {
      listNewsFeed(dispatch, didCancel);
    };
    fetchArticles();
    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-0">
      <Container fluid className="border-bottom border-dark">
        <Row>
          <Col className="hero px-5">
            <Row className="py-5">
              <h5 style={{ color: 'white', letterSpacing: '0.5rem' }}>
                Start a blog for free
              </h5>
            </Row>
            <Row className="pt-2">
              <h2>Write, Read,</h2>
            </Row>
            <Row>
              <h2>Discover, Share</h2>
            </Row>
            <Row>
              <p>Exclusive content by developers, for developers</p>
            </Row>
            <Row className="pt-2 pb-5">
              <Link to="/signup">
                <Button color="dark">Start writing</Button>
              </Link>
            </Row>
          </Col>
          <Col
            md={4}
            className="heroAnimation border-left border-dark"
          >
            <HeroAnimation />
          </Col>
        </Row>
      </Container>

      <Container fluid className="border-bottom p-4">
        <Container className="px-md-5">
          <Col className="d-flex align-items-baseline px-2">
            <GraphUpArrow size={24} />
            <h3>Trending on Voice </h3>
          </Col>

          <Row lg="3" sm="2" xs="1" className="mt-4">
            <SuggestedPosts
              articles={store.articles}
              thumbnail
              index
            />
          </Row>
        </Container>
      </Container>
      <Container fluid className="p-4">
        <Container className="px-md-5">
          <Row className="mt-4">
            <Col md={8} className="pe-md-4">
              <SuggestedPosts
                articles={store.articles}
                thumbnail={false}
              />
            </Col>

            <Col md={4}>
              <Container className="mb-4">
                <h5>Discover more</h5>
                <ListTopics topics={store.topics} />
              </Container>
              <Container className="my-4">
                <h5>Find writers to follow</h5>
                <SuggestedUsers users={store.users} />
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default PublicHomePage;
