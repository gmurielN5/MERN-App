import React, { useState, useContext, useRef } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { updateProfile, deleteUser } from "../Services/UserService"
import { removeToken } from "../util"
import Editable from "../Components/Utils/FormGrid/Editable"
import ImageUpload from "../Components/Utils/ImageUpload/Upload"

const Settings = () => {
  const { store, dispatch, setIsAuthenticated } = useContext(AuthContext)
  const { user } = store

  const [update, setUpdate] = useState({
    username: user.username || "",
    about: user.about || "",
  })
  const [fileData, setFileData] = useState()
  const [avatar, setFile] = useState("")
  const [imgpreview, setImgpreview] = useState("")
  const inputRef = useRef({})

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }

  // avatar image
  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImgpreview(reader.result)
    }
    reader.readAsDataURL(target.files[0])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("avatar", fileData)
    formdata.append("username", update.username)
    formdata.append("about", update.about)
    console.log(formdata)
    updateProfile(user._id, formdata, dispatch)
  }

  const handleDeleteUser = (id) => {
    deleteUser(id, dispatch).then((response) => {
      removeToken("token")
      setIsAuthenticated(false)
    })
  }

  return (
    <>
      <Container className="medium">
        <Row sm className="py-4">
          <h3 className="text-center">About You</h3>
        </Row>
        <Row>
          <Form onSubmit={onSubmit} className="p-4">
            <FormGroup className="py-2">
              <Editable
                text={update.username}
                placeholder={
                  !update.username ? "Enter a username" : update.username
                }
                childRef={inputRef}
                type="input"
                label=" Your bio appears on your Profile page. Max 160 characters."
                className="formtext p-0"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  name="username"
                  className="formtext p-0"
                  placeholder={
                    !update.username ? "Enter a username" : update.username
                  }
                  value={update.username}
                  onChange={handleChange}
                />
              </Editable>
            </FormGroup>

            <FormGroup className="py-2">
              <Editable
                text={update.about}
                placeholder={!update.about ? "Add a Bio" : update.about}
                childRef={inputRef}
                type="input"
                label="Your bio appears on your Profile page. Max 160 characters."
                className="formtext p-0"
              >
                <Input
                  type="textarea"
                  ref={inputRef}
                  name="about"
                  className="formtext p-0"
                  value={update.about}
                  placeholder={!update.about ? "Add a Bio" : update.about}
                  onChange={handleChange}
                />
              </Editable>
            </FormGroup>

            <FormGroup className="py-2">
              <Row className="m-0">
                <Col sm md={8} className="d-flex flex-column p-0">
                  <Label for="avatar" className="formtext">
                    Photo
                  </Label>
                  <span className="text-muted">
                    Your photo appears on your Profile page and with your
                    stories. File type: JPG, PNG
                  </span>
                </Col>

                {imgpreview ? (
                  <Col>
                    <img
                      src={imgpreview}
                      alt="preview"
                      className="avatar rounded-circle"
                    />
                  </Col>
                ) : user.avatar ? (
                  <Col>
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="avatar rounded-circle"
                    />
                  </Col>
                ) : null}

                <ImageUpload
                  value={avatar}
                  handleFileChange={handleFileChange}
                  text="Edit"
                />
              </Row>
            </FormGroup>
            <Row className="text-center pt-4">
              <Col>
                <Button color="dark" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
      <Container sm className="medium p-4">
        <Row className="py-4">
          <h3 className="text-center">Account</h3>
        </Row>
        <Row className="p-4">
          <Col sm md={8} className="d-flex flex-column p-0">
            <Label className="formtext">Delete Account</Label>
            <span>
              Permanently delete your account and all of your content.
            </span>
          </Col>
          <Col className="text-end p-0">
            <Button
              color="danger"
              type="submit"
              className="mt-2"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Settings
