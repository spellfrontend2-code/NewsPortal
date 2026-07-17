import { Eye, EyeOff } from "lucide-react";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuthHooks } from "../hooks/useAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/context/useAuthStore";

function UserLoginForm({ onOpenChange }) {
  const {setAuthData}=useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const authHook=useAuthHooks(
  )
      const login = authHook.useLogin();
const onSubmit = (data) => {
  login.mutate(data, {

    onSuccess: (res) => {
      const response=res?.data
      const authData = {
          accessToken: response.access_token,
          expiresIn: response.expires_in,
          permissions: response.permissions,
          refreshToken: response.refresh_token,
          role: response.roles,
        };
        setAuthData(authData);
        toast.success(res?.message);
      onOpenChange(false);
    },
    onError: (e) => {
      toast.error(e?.message || "Something went wrong");
    }
  });
}
  return (
    <form className="flex flex-col gap-1 h-full w-full"   onSubmit={handleSubmit(onSubmit)}
>
      <div>
        <label className="flex items-center gap-1 font-semibold">Email</label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className={`${inputStyle} ${
            errors?.email ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder={"Enter email"}
        />
        <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.email?.message as string}
        </p>
      </div>

      <div>
        <label className="flex items-center gap-1 font-semibold">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            className={`${inputStyle} ${
              errors?.password ? "border-red-500 focus:border-red-500" : ""
            } pr-12  [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden
                  [&::-webkit-clear-button]:hidden`}
            autoComplete="new-password"
            placeholder={"Enter password"}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.password?.message as string}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <Button type="submit" variant="submit" className="w-[100px]" disabled={login.isPending}>
          {login.isPending ? "Loggin In..." : "Log In"}
        </Button>
      </div>
    </form>
  );
}

export default UserLoginForm;
