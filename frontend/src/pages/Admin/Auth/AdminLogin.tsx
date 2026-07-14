import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/useAuthStore";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AdminLogin() {
  const navigate = useNavigate();
const {setAuthData}=useAuthStore()
  const authHook = useAuthHooks();
  const adminLogin = authHook.useAdminLogin();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
const {getDefaultRoute}=usePermissionStore()
  const onSubmit = (data) => {
    console.log(data)
    adminLogin.mutate(data, {
      onSuccess: (response) => {
        const res=response.data
        const route=getDefaultRoute(res?.permissions)
        const authData = {
          accessToken: res.access_token,
          expiresIn: res.expires_in,
          permissions: res.permissions,
          refreshToken: res.refresh_token,
          role: res.roles,
        };
        setAuthData(authData);
        toast.success(response?.message);
        navigate(route)
      },
      onError: (e) => {
toast.error(e?.message);
},
    });
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" border-2 border-[var(--color-secondary)] rounded-2xl p-5 h-[40%] w-1/3 flex flex-col justify-between  "
      >
        <p className="text-4xl font-bold text-[var(--color-primary)] text-center">
          Login
        </p>
        <div className="flex flex-col gap-3">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            className="w-full h-[30px] border-2 border-[var(--color-secondary)] rounded-2xl p-5 h-2/3 w-1/3"
            {...register("email")}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[30px] border-2 border-[var(--color-secondary)] rounded-2xl p-5 h-2/3 w-1/3"
            {...register("password")}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit"variant="submit" className="w-1/2 h-[40px] text-lg" disabled={adminLogin?.isPending}>
            {adminLogin?.isPending ? "Logging In..." : "Log In"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
