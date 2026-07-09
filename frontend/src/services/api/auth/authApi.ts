import axiosInstance from "@/services/axios";

export const authApi=()=>{
    return {
        AdminLogin:async (data:any)=>{
            try{
                const response=await axiosInstance.post("/login",data);
                return response.data
            } catch (error: any) {
                throw (
                    new Error(error?.message) ||
                    "Login Failed"
                );
            }
        },
        refreshToken:()=>{
            try{
                const response=axiosInstance.post("/refresh-token");
                return response.data;
            } catch (error: any) {
                throw (
                    new Error(error?.response?.data?.message) ||
                    "Login Failed"
                );
            }
        },
        AdminLogout:()=>{
            try{
                const response=axiosInstance.post("/admin/logout");
                return response.data;
            } catch (error: any) {
                throw (
                    new Error(error?.response?.data?.message) ||
                    "Logout Failed"
                );
            }
        }
    }

}