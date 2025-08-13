import axios from "axios";
import toast from "react-hot-toast";
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {
  baseURL: "/api/",
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
    if (error?.response?.status === 403) {
      localStorage.removeItem("user");
      if (error?.response?.session_expired == 1) {
        toast.error("Your session has expired");
      } else {
        toast.error("You are not authorized to access this page");
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    return Promise.reject(error);
  }
);

export default instance;
