import axios from "axios"

export const getTopicList = () => {
  return axios
    .get(`/dashboard/topic`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response.data
    })
}

export const getTopic = (id) => {
  return axios
    .get(`/dashboard/topic/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response.data
    })
}

export const postTopic = (newTopic) => {
  return axios
    .post(`/dashboard/topic/create`, { name: newTopic })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response.data
    })
}
