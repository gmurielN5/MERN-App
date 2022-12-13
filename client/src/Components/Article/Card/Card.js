import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardSubtitle,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import { AuthContext } from "../../../Context/AuthContext"
import { User } from "../../User/UserCard/User"
import { deletePost } from "../../../Services/ContentService"

import moment from "moment"

const CardPost = ({ article, author, dispatch, thumbnail }) => {
  const { store } = useContext(AuthContext)
  let className = ""
  if (thumbnail) {
    className += "smallTitle"
  }

  return (
    <>
      {!article && !author ? null : (
        <Card className="border-0">
          <Row xs={`${thumbnail ? "1" : "2"}`}>
            <Col>
              {store.user && author === store.user ? null : (
                <CardHeader className="bg-transparent border-0 p-0">
                  <User user={author} size="thumbnail" />
                </CardHeader>
              )}
              <CardBody className="p-0">
                <CardTitle tag="h4" className={className}>
                  {article.title}
                </CardTitle>
                {thumbnail ? null : (
                  <>
                    <CardSubtitle tag="p" className="text-muted">
                      {article.subtitle}
                    </CardSubtitle>
                    <CardText
                      tag="p"
                      className="d-none d-sm-none d-md-block pt-2"
                    >
                      {article.body}
                    </CardText>
                  </>
                )}
                <CardText tag="span" className="text-muted">
                  {moment(article.publishedDate).format("MMM DD")} .{" "}
                  {moment(article.publishedDate).fromNow()}
                </CardText>
              </CardBody>
            </Col>
            <Col>
              {thumbnail ? null : (
                <CardImg
                  src={article.img}
                  alt={article.title}
                  className="cardimg"
                />
              )}
              {store.user && author === store.user && (
                <Container className="p-2 mb-2 text-end">
                  <Link to={`/${article._id}`}>
                    <Button color="dark" className="mx-2">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    color="dark"
                    className="mx-2"
                    onClick={() => deletePost(article._id, dispatch)}
                  >
                    Delete
                  </Button>
                </Container>
              )}
            </Col>
          </Row>
        </Card>
      )}
    </>
  )
}

export default CardPost
