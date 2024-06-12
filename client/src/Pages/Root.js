import { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { IsAuthenticated } from '../Services/AuthService';

const Root = () => {
  const { setIsAuthenticated, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    let didCancel = false;
    const getStatus = async () => {
      await IsAuthenticated(dispatch, didCancel).then((response) => {
        if (response) {
          setIsAuthenticated(response.data.isAuthenticated);
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      });
    };
    getStatus();
    return () => {
      didCancel = true;
    };
  }, [navigate, dispatch, setIsAuthenticated]);
  return <Outlet />;
};

export default Root;
