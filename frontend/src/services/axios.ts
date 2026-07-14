import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
//   withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
const auth = localStorage.getItem("auth");
const token = auth ? JSON.parse(auth).accessToken : null;  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const auth = localStorage.getItem("auth");
        const refreshToken = auth ? JSON.parse(auth).refreshToken : null; 

        const res = await axios.post("/refresh-token", {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...JSON.parse(auth!),
            accessToken: newAccessToken,
          }),
        );
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        // window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
