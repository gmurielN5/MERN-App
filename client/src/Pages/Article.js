import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { userAxios } from '../Services/AuthService';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading/Loading';
import Message from '../Components/Message/Message';

import View from '../Components/Article/View/View';
import ArticleForm from '../Components/Article/Form/ArticleForm';
import { SearchBar } from '../Components/Search/Search';
import { Profile } from '../Components/User/UserProfile/Profile';
import { SuggestedPosts } from '../Components/Article/SuggestedPosts/SuggestedPost';

const apiURL = process.env.REACT_APP_API_URL;

const Article = () => {
  const { store } = useContext(AuthContext);
  const { user } = store;
  let { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await userAxios
        .get(`${apiURL}/dashboard/${articleId}`)
        .then((response) => {
          const { article, user } = response.data;
          setArticle(article);
          setAuthor(user);
          setLoading(false);
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    };
    fetchData();
  }, [articleId]);

  useEffect(() => {
    if (user && article) {
      if (user._id === article.author) {
        setEditing(true);
      }
    }
  }, [user, article]);

  return (
    <Container fluid>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          {message ? (
            <Message message={message} />
          ) : (
            <>
              {isEditing ? (
                <ArticleForm
                  article={article}
                  isEditing={isEditing}
                />
              ) : (
                <Row sm="2" xs="1">
                  <Col sm={8}>
                    <View
                      author={author}
                      article={article}
                      setArticle={setArticle}
                    />
                  </Col>
                  <Col sm={4} className="pt-4 border-start">
                    <Container>
                      <SearchBar />
                      <Container className="my-4">
                        <Profile
                          author={author}
                          setAuthor={setAuthor}
                        />
                      </Container>
                      <Container className="my-4">
                        <h5>More from {author.username}</h5>
                        <SuggestedPosts
                          articles={author.articles}
                          thumbnail
                        />
                      </Container>
                    </Container>
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
export default Article;
