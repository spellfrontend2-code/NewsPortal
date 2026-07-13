import { inputStyle } from "@/components/shared/styles/inputStyle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProfileHooks } from "../hooks/useProfile";
import { toast } from "sonner";

function PasswordDialogBox({ open, setOpen }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });
const profileHook=useProfileHooks()
const changePassword=profileHook.useChangePassword()
  const [showPassword, setShowPassword] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const togglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
const onSubmit = (data: any) => {
changePassword.mutate(data,{
  onSuccess:(res)=>{setOpen(false);
    toast.success(res?.message || "Password changed successfully");
  },
  onError:(err)=>{toast.error(err?.message || "Something went wrong");}
});
}
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-[var(--color-primary)] font-bold">
            Change Password
            <p className="text-xs text-gray-700 font-normal">
              Change your password
            </p>
          </DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Current Password */}
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
              Current Password
            </label>

            <div className="relative">
              <input
                {...register("current_password")}
                type={showPassword.current_password ? "text" : "password"}
                className={`${inputStyle} pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-clear-button]:hidden`}
                placeholder="Current Password"
              />

              <button
                type="button"
                onClick={() => togglePassword("current_password")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
              >
                {showPassword.current_password ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
              New Password
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword.password ? "text" : "password"}
                className={`${inputStyle} pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-clear-button]:hidden`}
                placeholder="New Password"
              />

              <button
                type="button"
                onClick={() => togglePassword("password")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
              >
                {showPassword.password ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
              Confirm New Password
            </label>

            <div className="relative">
              <input
                {...register("password_confirmation")}
                type={
                  showPassword.password_confirmation ? "text" : "password"
                }
                className={`${inputStyle} pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-clear-button]:hidden`}
                placeholder="Confirm New Password"
              />

              <button
                type="button"
                onClick={() => togglePassword("password_confirmation")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
              >
                {showPassword.password_confirmation ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white rounded-lg py-2 mt-2"
          >
            Update Password
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordDialogBox;