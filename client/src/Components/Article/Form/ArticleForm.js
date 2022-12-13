import React, { useState, useRef, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../Context/AuthContext"
import {
  Container,
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap"
import { addPost, updatePost } from "../../../Services/ContentService"

import { AddTopic } from "../../Topics/AddTopic/AddTopic"
import Editable from "../../Utils/FormGrid/Editable"
import ImageUpload from "../../Utils/ImageUpload/Upload"

//get topic list for article category

const ArticleForm = ({ article, isEditing }) => {
  const { store, dispatch } = useContext(AuthContext)
  const { user } = store
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    body: "",
    status: "Draft",
  })
  const [fileData, setFileData] = useState("")
  const [img, setFile] = useState("")
  const [imgpreview, setImgpreview] = useState("")
  const inputRef = useRef({})
  let { articleId } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    if (article) {
      setPost((post) => ({
        ...post,
        title: article.title,
        subtitle: article.subtitle,
        body: article.body,
        status: article.status,
      }))
      setImgpreview(article.img)
      setFileData(article.img)
    }
  }, [article])

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  //  image
  const handleFileChange = ({ target }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImgpreview(reader.result)
    }
    reader.readAsDataURL(target.files[0])
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("img", fileData)
    formdata.append("title", post.title)
    formdata.append("subtitle", post.subtitle)
    formdata.append("body", post.body)
    formdata.append("status", post.status)
    if (isEditing) {
      updatePost(articleId, formdata, dispatch)
    } else {
      addPost(user._id, formdata, dispatch)
      if (!store.Loading && !store.isError) {
        navigate("/dashboard")
      }
    }
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="border-bottom p-2">
          <Col className="d-flex justify-content-end">
            {isEditing ? (
              <Button color="dark" type="submit" className="mx-2">
                Update
              </Button>
            ) : (
              <Button color="dark" type="submit" className="mx-2">
                Save Draft
              </Button>
            )}
            {post.status === "Draft" ? (
              <Button
                color="dark"
                type="submit"
                className="mx-2"
                onClick={(e) => setPost({ ...post, status: "Published" })}
              >
                Publish
              </Button>
            ) : null}
          </Col>
        </Row>

        <Container className="medium">
          <FormGroup className="p-0 mb-0">
            <Editable
              text={post.title}
              placeholder={post.title || "Add a title"}
              childRef={inputRef}
              type="input"
              edit={isEditing ? false : true}
              className="formheader p-0 my-4"
            >
              <Input
                ref={inputRef}
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder={post.title}
                className="formheader p-0"
              />
            </Editable>
          </FormGroup>
          <FormGroup className="p-0 mb-0">
            <Editable
              text={post.subtitle}
              placeholder={post.subtitle || "Tell your story ..."}
              childRef={inputRef}
              type="input"
              edit={isEditing ? false : true}
              className="formsubHeader p-0 my-0"
            >
              <Input
                ref={inputRef}
                type="text"
                name="subtitle"
                value={post.subtitle}
                placeholder={post.subtitle}
                onChange={handleChange}
                className="formsubHeader p-0 my-0"
              />
            </Editable>
          </FormGroup>

          <FormGroup className="p-0 mb-0">
            <Row>
              {!imgpreview ? (
                <Col sm md={10}>
                  <Label className="formspan">
                    Add an image to your story. File type: JPG, PNG
                  </Label>
                </Col>
              ) : (
                <Col sm md={12}>
                  <img src={imgpreview} alt="preview" className="img" />
                </Col>
              )}
              <Col className="text-end">
                <ImageUpload
                  value={img}
                  handleFileChange={handleFileChange}
                  text={isEditing ? "Edit" : "Upload"}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="py-2">
            <Editable
              text={post.body}
              placeholder={post.body || "add a text"}
              childRef={inputRef}
              type="textarea"
              edit={isEditing ? false : true}
              className="formtext p-0 my-0"
            >
              <Input
                ref={inputRef}
                type="textarea"
                name="body"
                value={post.body}
                placeholder={post.body}
                onChange={handleChange}
                className="formtext p-0 my-0"
              />
            </Editable>
            {/* <Container className="py-5 px-0 d-flex justify-content-end">
              <AddTopic topics={store.topics} />
            </Container> */}
          </FormGroup>
        </Container>
      </Form>
    </Container>
  )
}

export default ArticleForm
