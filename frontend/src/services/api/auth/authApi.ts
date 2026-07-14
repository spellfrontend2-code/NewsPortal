import axiosInstance from "@/services/axios";

export const authApi=()=>{
    return {
        AdminLogin:async (data:any)=>{
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
                console.log(response)
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