import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { getProfile } from '../Services/UserService';

const Dashboard = () => {
  const { store, dispatch } = useContext(AuthContext);

  useEffect(() => {
    let didCancel = false;
    const fetchUser = async () => {
      await getProfile(store.user._id, dispatch, didCancel);
    };
    fetchUser();

    return () => {
      didCancel = true;
    };
  }, [dispatch, store.user._id]);

  return <Outlet />;
};

export default Dashboard;
