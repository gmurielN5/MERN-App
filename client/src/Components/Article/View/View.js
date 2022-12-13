import React, { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Col } from "reactstrap"
import { AuthContext } from "../../../Context/AuthContext"
import { addLike, unLike } from "../../../Services/ContentService"
import { User } from "../../User/UserCard/User"
import { LikeButton } from "../Like/LikeButton"
import moment from "moment"

const ViewTemplate = ({ author, article, setArticle }) => {
  const { store, dispatch, isAuthenticated } = useContext(AuthContext)
  const { user } = store
  const [like, setLike] = useState()
  let navigate = useNavigate()
  let { articleId } = useParams()

  const checkLike = (article, user) => {
    if (user) {
      let match = article.likes.indexOf(user._id) !== -1
      return match
    }
  }

  useEffect(() => {
    const likes = checkLike(article, user)
    setLike(likes)
  }, [article, user])

  const clickLikes = () => {
    let callApi = like ? unLike : addLike
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
    callApi(user._id, articleId, dispatch).then((response) => {
      console.log(response)
      const { article } = response.data
      setArticle(article)
    })
  }

  return (
    <Container className="p-4">
      <User user={author} size="thumbnail" />

      <span className="text-muted">
        {moment(article.publishedDate).format("MMM DD")} .{" "}
        {moment(article.publishedDate).fromNow()}
      </span>
      <h3 className="pt-4 pb-2">{article.title}</h3>
      <h4>{article.subtitle}</h4>
      <img
        src={article.img}
        className="img-fluid py-4"
        alt={article.title}
      ></img>
      <p>{article.body}</p>
      <Col className="d-flex justify-content-end px-0 pb-4">
        <p className="text-muted">{article.likes.length} </p>
        <LikeButton like={like} onClick={clickLikes} />
      </Col>
    </Container>
  )
}

export default ViewTemplate
