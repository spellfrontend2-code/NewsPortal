import axiosInstance from "@/services/axios";
import axios from "axios";

export const authApi = () => {
  return {
    Login: async (data: any) => {
      try {
        const response = await axiosInstance.post("/login", data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            throw {
              message:
                "Unable to connect to the server. Please check your internet connection or try again later.",
            };
          }
          throw error.response.data;
        }
        throw {
          message: "Something went wrong.",
        };
      }
    },
    refreshToken: async () => {
      try {
        const response = await axiosInstance.post("/refresh-token");
        return response.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message) || "Login Failed";
      }
    },
    AdminLogout: async () => {
      try {
        const response = await axiosInstance.post("/logout");
        return response.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message) || "Logout Failed";
      }
    },
    FetchProfile: async () => {
      try {
        const response = await axiosInstance.get("/profile");
        return response.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message) || "Logout Failed";
      }
    },
    CreatePublicUser: async (data: any) => {
      try {
        const response = await axiosInstance.post("/register", data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};
