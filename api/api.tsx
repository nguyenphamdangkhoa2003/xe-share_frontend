import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
      
    }
    return Promise.reject({
      ...data,
    });
  }
);
export default API;