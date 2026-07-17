import axiosInstance from "@/services/axios";

export const authApi=()=>{
    return {
        Login:async (data:any)=>{
            try{
                const response=await axiosInstance.post("/login",data);
                return response.data
            } catch (error: any) {
        throw error?.response?.data;
      }
        },
        refreshToken:async()=>{
            try{
                const response=await axiosInstance.post("/refresh-token");
                return response.data;
            } catch (error: any) {
                throw (
                    new Error(error?.response?.data?.message) ||
                    "Login Failed"
                );
            }
        },
        AdminLogout:async()=>{
            try{
                const response=await axiosInstance.post("/logout");
                return response.data;
            } catch (error: any) {
                throw (
                    new Error(error?.response?.data?.message) ||
                    "Logout Failed"
                );
            }
        },
        FetchProfile:async ()=>{
            try{
                const response=await axiosInstance.get("/profile");
                return response.data;
            } catch (error: any) {
                throw (
                    new Error(error?.response?.data?.message) ||
                    "Logout Failed"
                );
            }
        },
        CreatePublicUser:async (data:any)=>{
            try{
                const response=await axiosInstance.post("/register",data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        }
    }

}