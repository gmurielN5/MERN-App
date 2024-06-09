import axios from 'axios';
import { getToken } from '../util';

export const userAxios = axios.create();

// interceptor to attach token on request
userAxios.interceptors.request.use(
  (request) => {
    let token = getToken('token');
    if (
      request.url.includes('user') ||
      request.url.includes('dashboard')
    ) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Register = (user) => {
  return userAxios
    .post('/signup', user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const Login = async (user, dispatch) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.post('/login', user);
    dispatch({
      type: 'USER_SUCCESS',
      payload: {
        user: response.data.user,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: 'ERROR_MSG',
      payload: error.response.data.message,
    });
  }
};

export const IsAuthenticated = async (dispatch, didCancel) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.get('/user/profile');
    if (!didCancel) {
      dispatch({
        type: 'USER_SUCCESS',
        payload: {
          user: response.data.user,
        },
      });
      return response;
    }
  } catch (error) {
    if (!didCancel) {
      dispatch({
        type: 'ERROR',
      });
    }
  }
};
