import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const getTopicList = () => {
  return axios
    .get(`${apiURL}/dashboard/topic`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getTopic = (id) => {
  return axios
    .get(`${apiURL}/dashboard/topic/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const postTopic = (newTopic) => {
  return axios
    .post(`${apiURL}/dashboard/topic/create`, { name: newTopic })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
