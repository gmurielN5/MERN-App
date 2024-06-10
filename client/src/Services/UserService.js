import { userAxios } from './AuthService';

export const getProfile = async (userId, dispatch, didCancel) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.get(
      `https://mern-app-c6q9.onrender.com/user/${userId}`
    );
    if (!didCancel) {
      dispatch({
        type: 'USER_SUCCESS',
        payload: {
          user: response.data,
        },
      });
    }
  } catch (error) {
    if (!didCancel) {
      dispatch({
        type: 'ERROR',
      });
    }
  }
};

export const updateProfile = async (userId, newInput, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `https://mern-app-c6q9.onrender.com/user/${userId}`,
      newInput
    );

    dispatch({
      type: 'USER_SUCCESS',
      payload: {
        user: response.data.user,
        message: response.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_MSG',
      payload: error.response.data.message,
    });
  }
};
export const deleteUser = async (userId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.delete(
      `https://mern-app-c6q9.onrender.com/user/${userId}`
    );
    dispatch({
      type: 'USER_SUCCESS',
      payload: {
        user: response.data.user,
        message: response.data.message,
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

export const follow = async (userId, followId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `https://mern-app-c6q9.onrender.com/user/user/follow`,
      {
        userId: userId,
        followId: followId,
      }
    );
    dispatch({
      type: 'USER_FOLLOW',
      payload: {
        userId: response.data.userId,
        followId: response.data.followId,
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

export const unfollow = async (userId, unfollowId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `https://mern-app-c6q9.onrender.com/user/user/unfollow`,
      {
        userId: userId,
        unfollowId: unfollowId,
      }
    );
    dispatch({
      type: 'USER_UNFOLLOW',
      payload: {
        userId: response.data.userId,
        unfollowId: response.data.unfollowId,
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
