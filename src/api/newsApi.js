import axiosClient from "./axiosClient";

const newsApi = {
  getAll: (params) => {
    const url = "/News";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = "/News/" + id;
    return axiosClient.get(url);
  },

  post: (params, option) => {
    const url = "/News/";
    return axiosClient.post(url, params, option);
  },

  put: (id, params, option) => {
    const url = "/News/" + id;
    return axiosClient.put(url, params, option);
  },

  delete: (id, option) => {
    const url = "/News/" + id;
    return axiosClient.delete(url, option);
  },
};
export default newsApi;
