import { userAxios } from './AuthService';

const apiURL = process.env.REACT_APP_API_URL;

// GET REQUEST : '/public' get all articles
export const listNewsFeed = async (dispatch, didCancel) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.get(`${apiURL}/public`);
    if (!didCancel) {
      dispatch({
        type: 'GET_INITIAL_CONTENT_SUCCESS',
        payload: {
          articles: response.data.articles,
          users: response.data.users,
          topics: response.data.topics,
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

// GET : '/dashboard/feed/:userId' get news feed by user
export const listFollowing = async (userId, dispatch, didCancel) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.get(
      `${apiURL}/dashboard/following/${userId}`
    );

    if (!didCancel) {
      dispatch({
        type: 'GET_CONTENT_SUCCESS',
        payload: {
          articles: response.data.articles,
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

// add article
export const addPost = async (userId, newitem, dispatch) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await userAxios.post(
      `${apiURL}/dashboard/${userId}`,
      newitem
    );
    dispatch({
      type: 'ADD_CONTENT_SUCCESS',
      payload: {
        article: response.data.article,
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

// Update article
export const updatePost = async (articleId, newInput, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `${apiURL}/dashboard/${articleId}`,
      newInput
    );
    dispatch({
      type: 'EDIT_CONTENT_SUCCESS',
      payload: {
        id: response.data.article._id,
        article: response.data.article,
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

// Delete article
export const deletePost = async (articleId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.delete(
      `${apiURL}/dashboard/${articleId}`
    );
    dispatch({
      type: 'DELETE_CONTENT_SUCCESS',
      payload: response.data.article._id,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_MSG',
      payload: error.response.data.message,
    });
  }
};

// Add likes
export const addLike = async (userId, articleId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `${apiURL}/dashboard/article/like`,
      {
        userId: userId,
        articleId: articleId,
      }
    );
    dispatch({
      type: 'ADD_LIKE',
      payload: {
        userId: response.data.userId,
        id: response.data.article._id,
        article: response.data.article,
      },
    });
    return response;
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response.data.message,
    });
  }
};

// Unlikes
export const unLike = async (userId, articleId, dispatch) => {
  dispatch({
    type: 'LOADING',
  });
  try {
    const response = await userAxios.put(
      `${apiURL}/dashboard/article/unlike`,
      {
        userId: userId,
        articleId: articleId,
      }
    );
    dispatch({
      type: 'REMOVE_LIKE',
      payload: {
        userId: response.data.userId,
        id: response.data.article._id,
        article: response.data.article,
      },
    });
    return response;
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: error.response.data.message,
    });
  }
};
