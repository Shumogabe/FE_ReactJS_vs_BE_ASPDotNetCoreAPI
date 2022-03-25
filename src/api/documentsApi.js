import axiosClient from "./axiosClient";

const documentsApi = {
  getAll: (params) => {
    const url = "/Documents";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = "/Documents/" + id;
    return axiosClient.get(url);
  },

  post: (params, option) => {
    const url = "/Documents/";
    return axiosClient.post(url, params, option);
  },

  put: (id, params, option) => {
    const url = "/Documents/" + id;
    return axiosClient.put(url, params, option);
  },

  delete: (id, option) => {
    const url = "/Documents/" + id;
    return axiosClient.delete(url, option);
  },
};
export default documentsApi;
