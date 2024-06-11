import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { Register } from '../Services/AuthService';

import Message from '../Components/Message/Message';

const RegisterForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Register(user)
      .then((data) => {
        const { message } = data;
        setMessage(message);
        if (!message.msgError) {
          resetForm();
          navigate('/login');
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <Container className="sc pt-5">
      <Row className="py-4">
        <h3 className="text-center">Join Us</h3>
      </Row>
      {message ? <Message message={message} /> : null}
      <Container className="pt-4">
        <Form onSubmit={onSubmit} className="px-5">
          <FormGroup className="py-2">
            <Label for="Email">Your email</Label>
            <Input
              type="email"
              name="email"
              className="p-0"
              value={user.email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup className="py-2">
            <Label for="Username">Your username</Label>
            <Input
              type="text"
              name="username"
              className="p-0"
              value={user.username}
              onChange={onChange}
              placeholder="Enter an username"
            />
          </FormGroup>

          <FormGroup className="py-2">
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              className="p-0"
              value={user.password}
              onChange={onChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <FormGroup className="py-2">
            <Label for="Password">Confirm Password</Label>
            <Input
              type="password"
              name="passwordConfirmation"
              className="p-0"
              value={user.passwordConfirmation}
              onChange={onChange}
              placeholder="Confirm password"
            />
          </FormGroup>
          <Row className="text-center pt-4">
            <Col>
              <Button color="dark" type="submit">
                Register
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="pt-4">
          <p className="text-center">
            Already have an account ?
            <Link to="/login">
              <span className="fw-bold">Sign in</span>
            </Link>
          </p>
        </Row>
      </Container>
    </Container>
  );
};

export default RegisterForm;
