import { authApi } from "@/services/api/auth/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const auth = authApi();
export const useAuthHooks = () => {
  const queryClient = useQueryClient();
  return {
    useLogin: () => {
      return useMutation({
        mutationFn: (data: any) => auth.Login(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    },
    useRefreshToken: () => {
      return useMutation({
        mutationFn: (data: any) => auth.refreshToken(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    },
    useLogout: () => {
      return useMutation({
        mutationFn: () => auth.AdminLogout(),
        onSuccess: () => {
          queryClient.removeQueries({
            queryKey: ["user"],
          });
        },
      });
    },
    useFetchProfile: () => {
      return useQuery({
        queryFn: () => auth.FetchProfile(),
        queryKey: ["user"],
      });
    },
    useCreatePublicUser: () => {
      return useMutation({
        mutationFn: (data: any) => auth.CreatePublicUser(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    },
  };
};
