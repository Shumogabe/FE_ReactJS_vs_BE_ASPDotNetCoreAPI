import axiosClient from "./axiosClient";

const accountsApi = {
  // getAll: (params) => {
  //   const url = "/Accounts";
  //   return axiosClient.get(url, { params });
  // },

  get: (id, option) => {
    const url = "/Accounts/" + id;
    return axiosClient.get(url, option);
  },

  // post: () => {
  //   const url = "/Accounts/";
  //   return axiosClient.post(url);
  // },

  postLogin: (params) => {
    const url = "/Accounts/Login";
    return axiosClient.post(url, params);
  },

  // put: (id) => {
  //   const url = "/Accounts/" + id;
  //   return axiosClient.put(url);
  // },

  // delete: (id) => {
  //   const url = "/Accounts/" + id;
  //   return axiosClient.delete(url);
  // },
};
export default accountsApi;
