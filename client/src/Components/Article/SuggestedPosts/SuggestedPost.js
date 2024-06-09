import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import CardPost from '../Card/Card';
export const SuggestedPosts = ({ articles, thumbnail, index }) => {
  return (
    <>
      {articles.map((article, i) => (
        <Link to={`/${article._id}`}>
          {index && (
            <span className="opacityIndex">{`0${i + 1}`}</span>
          )}
          <Col
            className={`py-2 ${
              index ? 'position-relative ps-4 pt-4' : ''
            }`}
          >
            <CardPost
              article={article}
              index={i}
              author={article.author}
              thumbnail={thumbnail}
            />
          </Col>
        </Link>
      ))}
    </>
  );
};
