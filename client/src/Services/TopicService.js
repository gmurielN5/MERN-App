import axios from 'axios';

export const getTopicList = () => {
  return axios
    .get(`https://mern-app-c6q9.onrender.com/dashboard/topic`)
    .then((response) => {
      console.log('get topic list', response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getTopic = (id) => {
  return axios
    .get(`https://mern-app-c6q9.onrender.com/dashboard/topic/${id}`)
    .then((response) => {
      console.log('get topic', response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const postTopic = (newTopic) => {
  return axios
    .post(
      `https://mern-app-c6q9.onrender.com/dashboard/topic/create`,
      { name: newTopic }
    )
    .then((response) => {
      console.log('post topic', response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
