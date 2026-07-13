import axiosInstance from "@/services/axios";

export const profileApi=()=>{
    return{
        fetchProfile: async () => {
            try {
                const response = await axiosInstance.get("/profile");
                return response.data;
            } catch (error: any) {
                console.log(error)
                throw error?.response?.data;
            }
        },
        updateProfile: async (data: any) => {
            try {
                const response = await axiosInstance.put("/profile", data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        changePassword: async (data: any) => {
            try {
                const response = await axiosInstance.post("/change-password", data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
    }
}