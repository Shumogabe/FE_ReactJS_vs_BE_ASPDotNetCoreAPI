import axiosClient from "./axiosClient";

const accessessApi = {
  getAll: () => {
    const url = "/Accesses";
    return axiosClient.get(url);
  },

  put: (id, params) => {
    const url = "/Accesses/" + id;
    return axiosClient.put(url, params);
  },
};
export default accessessApi;
