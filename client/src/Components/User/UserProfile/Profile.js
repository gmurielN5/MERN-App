import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../../../Context/AuthContext';
import { follow, unfollow } from '../../../Services/UserService';
import { User } from '../UserCard/User';
import { FollowButton } from '../Follow/FollowButton';

export const Profile = ({ author, setAuthor }) => {
  const { store, isAuthenticated, dispatch } =
    useContext(AuthContext);
  const { user } = store;
  const [isFollowing, setFollowing] = useState(false);
  let navigate = useNavigate();

  const checkFollow = (author, user) => {
    const match = author.followers.some((follower) => {
      return follower === user._id;
    });
    return match;
  };

  useEffect(() => {
    if (user) {
      const follow = checkFollow(author, user);
      setFollowing(follow);
    }
  }, [author, user]);

  const clickFollowButton = () => {
    let callApi = isFollowing ? unfollow : follow;
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }

    callApi(user._id, author._id, dispatch).then((response) => {
      const { user } = response.data;
      console.log('set author user', user);
      // setAuthor(user)
    });
  };

  return (
    <Container className="mt-4 p-0">
      <Row className="align-items-center">
        <Col md={8}>
          <User user={author} />
          <Container className="p-0">
            <Col>
              <p className="text-muted m-0">
                {author.followers.length} followers
              </p>
            </Col>
            <Col className="card-text">
              {!author.about ? null : (
                <span className=" text-muted">{author.about}</span>
              )}
            </Col>
          </Container>
        </Col>
        <Col md={4} className="text-end pt-3">
          <FollowButton
            following={isFollowing}
            onClick={clickFollowButton}
          />
        </Col>
      </Row>
    </Container>
  );
};
