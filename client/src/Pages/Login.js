import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { AuthContext } from '../Context/AuthContext';
import { Login } from '../Services/AuthService';
import { setToken } from '../util';

const LoginForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const { setIsAuthenticated, dispatch } = useContext(AuthContext);

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/dashboard';

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const login = async () => {
      await Login(user, dispatch).then((response) => {
        const { isAuthenticated, user, token } = response.data;
        if (isAuthenticated) {
          setToken('token', token);
          setUser(user);
          setIsAuthenticated(isAuthenticated);
          navigate(from, { replace: true });
        }
      });
    };
    login();
  };

  return (
    <Container className="sc pt-5">
      <Row className="py-4">
        <h3 className="text-center">Welcome Back.</h3>
      </Row>
      <Container className="pt-4">
        <Form onSubmit={onSubmit} className="px-5">
          <FormGroup className="py-2">
            <Label for="Email">Your email</Label>
            <Input
              type="email"
              name="email"
              className="p-0"
              onChange={onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup className="py-2">
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              className="p-0"
              onChange={onChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <Row className="text-center pt-4">
            <Col>
              <Button color="dark" type="submit">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="pt-4">
          <p className="text-center font-weight-bold">
            No account ?{' '}
            <Link to="/signup">
              <span className="fw-bold">Create One</span>
            </Link>
          </p>
        </Row>
      </Container>
    </Container>
  );
};

export default LoginForm;
