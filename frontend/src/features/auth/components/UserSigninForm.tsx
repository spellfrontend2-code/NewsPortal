import { Asterisk, Eye, EyeOff } from "lucide-react";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuthHooks } from "../hooks/useAuth";
import { toast } from "sonner";

function UserSignInForm({ setSignInOpen }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      country_code: "np",
      language: "nepal",
      email: "",
      password: "",
      confirmation_password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const password = watch("password");
  const authHook = useAuthHooks();
  const createPublicUser = authHook.useCreatePublicUser();
  const onSubmit = (data) => {
    createPublicUser.mutate(data, {
      onSuccess: (res) => {
        setSignInOpen(false);
        toast.success(res?.message || "Login successful");
      },
      onError: (e) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col gap-1"
    >
      {/* Name */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Name
          <Asterisk size={12} className="text-red-500" />
        </label>
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
          })}
          className={`${inputStyle} ${
            errors.name ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder="Enter name"
        />
        <p className="mt-1 h-4 text-xs text-red-500">{errors.name?.message}</p>
      </div>
      {/* Country Code */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Country Code
        </label>

        <input
          type="text"
          {...register("country_code")}
          className={`${inputStyle} ${
            errors.country_code ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder="Enter country code"
        />

        <p className="mt-1 h-4 text-xs text-red-500">
          {errors.country_code?.message}
        </p>
      </div>
      {/* Language */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Language
        </label>

        <input
          type="text"
          {...register("language")}
          className={`${inputStyle} ${
            errors.language ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder="Enter language"
        />

        <p className="mt-1 h-4 text-xs text-red-500">
          {errors.language?.message}
        </p>
      </div>
      {/* Timezone */}
      {/* <div>
        <label className="flex items-center gap-1 font-semibold">
          Timezone
        </label>

        <input
          type="text"
          {...register("timezone")}
          className={`${inputStyle} ${
            errors.timezone ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder="Enter timezone"
        />

        <p className="mt-1 h-4 text-xs text-red-500">
          {errors.timezone?.message}
        </p>
      </div> */}
      {/* Email */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Email
          <Asterisk size={12} className="text-red-500" />
        </label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className={`${inputStyle} ${
            errors.email ? "border-red-500 focus:border-red-500" : ""
          }`}
          placeholder="Enter email"
        />

        <p className="mt-1 h-4 text-xs text-red-500">{errors.email?.message}</p>
      </div>
      {/* Password */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Password
          <Asterisk size={12} className="text-red-500" />
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            className={`${inputStyle} ${
              errors.password ? "border-red-500 focus:border-red-500" : ""
            } pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-clear-button]:hidden`}
            autoComplete="new-password"
            placeholder="Enter password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <p className="mt-1 h-4 text-xs text-red-500">
          {errors.password?.message}
        </p>
      </div>
      {/* Confirmation Password */}
      <div>
        <label className="flex items-center gap-1 font-semibold">
          Confirmation Password
          <Asterisk size={12} className="text-red-500" />
        </label>

        <div className="relative">
          <input
            type={showConfirmationPassword ? "text" : "password"}
            {...register("confirmation_password", {
              required: "Confirmation Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`${inputStyle} ${
              errors.confirmation_password
                ? "border-red-500 focus:border-red-500"
                : ""
            } pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-clear-button]:hidden`}
            autoComplete="new-password"
            placeholder="Enter confirmation password"
          />

          <button
            type="button"
            onClick={() => setShowConfirmationPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)]"
          >
            {showConfirmationPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <p className="mt-1 h-4 text-xs text-red-500">
          {errors.confirmation_password?.message}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <Button
          type="submit"
          variant="submit"
          className="w-[100px]"
          disabled={createPublicUser?.isPending}
        >
          {createPublicUser?.isPending ? "Signing In..." : " Sign In"}
        </Button>
      </div>
    </form>
  );
}

export default UserSignInForm;
