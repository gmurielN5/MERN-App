// LOADING
// UPDATE_CONTENT_LOADING

// USER_SUCCESS
// USER_FOLLOW
// USER_UNFOLLOW

// GET_INITIAL_CONTENT_SUCCESS
// GET_CONTENT_SUCCESS
// ADD_CONTENT_SUCCESS
// EDIT_CONTENT_SUCCESS
// DELETE_CONTENT_SUCCESS,
// ADD_LIKE
// REMOVE_LIKE

// ERROR

// ERROR_MSG

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        Loading: true,
      };

    case 'USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
        Loading: false,
      };
    case 'USER_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: [
            ...state.user.following,
            action.payload.followId,
          ],
        },
        users: state.users.map((a) => {
          if (a._id === action.payload.userId) {
            return {
              ...a,
              following: [...a.following, action.payload.followId],
            };
          } else if (a._id === action.payload.followId) {
            return {
              ...a,
              followers: [...a.followers, action.payload.userId],
            };
          } else {
            return a;
          }
        }),
        Loading: false,
      };
    case 'USER_UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (a) => a !== action.payload.unfollowId
          ),
        },
        users: state.users.map((a) => {
          if (a._id === action.payload.userId) {
            return {
              ...a,
              following: a.following.filter(
                (a) => a !== action.payload.unfollowId
              ),
            };
          } else if (a._id === action.payload.unfollowId) {
            return {
              ...a,
              followers: a.followers.filter(
                (a) => a !== action.payload.userId
              ),
            };
          } else {
            return a;
          }
        }),
        Loading: false,
      };
    case 'GET_INITIAL_CONTENT_SUCCESS':
      return {
        ...state,
        articles: action.payload.articles,
        users: action.payload.users,
        topics: action.payload.topics,
        Loading: false,
      };
    case 'GET_CONTENT_SUCCESS':
      return {
        ...state,
        articles: action.payload.articles,
        Loading: false,
      };
    case 'ADD_CONTENT_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          articles: [...state.user.articles, action.payload.article],
        },
        message: action.payload.message,
        Loading: false,
      };
    case 'EDIT_CONTENT_SUCCESS':
      return {
        ...state,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id) {
            return action.payload.article;
          }
          return a;
        }),
        user: {
          ...state.user,
          articles: state.user.articles.map((a) => {
            if (a._id === action.payload.id) {
              return action.payload.article;
            }
            return a;
          }),
        },
        message: action.payload.message,
        Loading: false,
      };
    case 'DELETE_CONTENT_SUCCESS':
      return {
        ...state,
        articles: state.articles.filter(
          (a) => a._id !== action.payload
        ),
        user: {
          ...state.user,
          articles: state.user.articles.filter(
            (a) => a._id !== action.payload
          ),
        },
        Loading: false,
      };
    case 'ADD_LIKE':
      return {
        ...state,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id) {
            return action.payload.article;
          }
          return a;
        }),
        Loading: false,
      };
    case 'REMOVE_LIKE':
      return {
        ...state,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id) {
            return {
              ...a,
              likes: a.likes.filter(
                (a) => a !== action.payload.userId
              ),
            };
          }
          return a;
        }),
        Loading: false,
      };
    case 'ERROR':
      return {
        ...state,
        isError: true,
        Loading: false,
      };

    case 'ERROR_MSG':
      return {
        ...state,
        isError: true,
        Loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
