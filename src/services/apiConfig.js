import axios from "axios";
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {
  baseURL: backendUrl + "/api/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  secure: false,
  sameSite: "None",
  credentials: "include",
  httpOnly: false,
  changeOrigin: true,
};
const instance = axios.create(config);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
