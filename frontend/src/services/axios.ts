import axios from "axios";

const getSessionId = () => {
  try {
    let sessionId = localStorage.getItem("news_session_id");
    if (!sessionId) {
      sessionId =
        "session-" +
        Math.random().toString(36).substring(2, 9) +
        "-" +
        Date.now();
      localStorage.setItem("news_session_id", sessionId);
    }
    return sessionId;
  } catch {
    return "session-default";
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth).accessToken : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Stable session identifier for frequency & impression tracking
  config.headers["X-Session-Id"] = getSessionId();

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
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
