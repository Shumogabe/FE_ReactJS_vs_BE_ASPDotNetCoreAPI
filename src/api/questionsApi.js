import axiosClient from "./axiosClient";

const questionsApi = {
  getAll: (params) => {
    const url = "/Questions";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = "/Questions/" + id;
    return axiosClient.get(url);
  },

  post: (params, option) => {
    const url = "/Questions/";
    return axiosClient.post(url, params, option);
  },

  put: (id, params, option) => {
    const url = "/Questions/" + id;
    return axiosClient.put(url, params, option);
  },

  delete: (id, option) => {
    const url = "/Questions/" + id;
    return axiosClient.delete(url, option);
  },
};
export default questionsApi;
