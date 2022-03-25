import axiosClient from "./axiosClient";

const categories_NewsApi = {
  getAll: (params) => {
    const url = "/Categories_News";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = "/Categories_News/" + id;
    return axiosClient.get(url);
  },

  post: (params, option) => {
    const url = "/Categories_News/";
    return axiosClient.post(url, params, option);
  },

  put: (id, params, option) => {
    const url = "/Categories_News/" + id;
    return axiosClient.put(url, params, option);
  },

  delete: (id, option) => {
    const url = "/Categories_News/" + id;
    return axiosClient.delete(url, option);
  },
};
export default categories_NewsApi;
