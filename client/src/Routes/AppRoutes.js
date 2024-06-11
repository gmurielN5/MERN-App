import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Container, Row, Col } from 'reactstrap';

import UnauthenticatedNavbar from '../Components/Nav/UnauthenticatedNavbar';
import AuthenticatedNav from '../Components/Nav/AuthenticatedNav';

import Loading from '../Components/Loading/Loading';
import Message from '../Components/Message/Message';

import PublicHomePage from '../Pages/PublicHomePage';
import Signup from '../Pages/SignUp';
import Login from '../Pages/Login';
import Article from '../Pages/Article';

import Dashboard from '../Pages/Dashboard';
import PrivateHomepage from '../Pages/PrivateHomepage';
import { NewArticle } from '../Pages/NewArticle';
import Profile from '../Pages/Profile';
import Settings from '../Pages/Settings';

import NotFound from '../Pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  const { store, isAuthenticated } = useContext(AuthContext);

  return (
    <Container fluid>
      <Row
        sm={`${isAuthenticated ? '2' : '1'}`}
        xs="1"
        className="gx-5"
      >
        <Col
          className="p-0"
          sm={`${isAuthenticated ? '2' : '12'}`}
          md={`${isAuthenticated ? '1' : '12'}`}
        >
          {isAuthenticated ? (
            <AuthenticatedNav />
          ) : (
            <UnauthenticatedNavbar />
          )}
        </Col>

        <Col
          sm={`${isAuthenticated ? '10' : '12'}`}
          md={`${isAuthenticated ? '11' : '12'}`}
          className="p-0"
        >
          <Message message={store.message} error={store.isError} />
          <Loading loading={store.Loading} />
          <Routes>
            <Route index element={<PublicHomePage />} />
            <Route path="home" element={<PublicHomePage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<PrivateHomepage />} />
              <Route path="stories" element={<Profile />} />
              <Route path="new" element={<NewArticle />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/:articleId" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default AppRoutes;
