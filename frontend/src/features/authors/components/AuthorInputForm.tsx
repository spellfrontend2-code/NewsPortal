import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthorHooks } from "../hooks/useAuthors";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import { Asterisk, Eye, EyeOff, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface AuthorFormProps {
  addAuthor: boolean;
  setAddAuthor: (value: boolean) => void;
  edit?: boolean;
  setEdit?: (value: boolean) => void;
  author?: any;
}

function AuthorInputForm({
  addAuthor,
  setAddAuthor,
  edit,
  setEdit,
  author,
}: AuthorFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const authorHooks = useAuthorHooks();
  const permissionHook = usePermissionHooks();
  const { data: roles, isLoading: roleLoading } =
    permissionHook.useFetchRoleBasedPermissions();
  const rolesList = roles?.data ?? [];
  const createAuthor = authorHooks.useCreateAuthor();
  const updateAuthor = authorHooks.useUpdateAuthor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: edit ? author?.name : "",
      email: edit ? author?.email : "",
      password: edit ? author?.password : "",

      country_code: edit ? author?.country_code : "",
      language: edit ? author?.language : "",
      timezone: edit ? author?.timezone : "",

      role: edit ? author?.role?.[0] : "reporter",

      status: edit ? author?.status : "active",

      bio: edit ? author?.author?.bio : "",
      specialization: edit ? author?.author?.specialization : "",

      verified: edit ? Number(author?.author?.verified) : 0,

      currency: edit ? author?.preferences?.currency : "NPR",

      theme: edit ? author?.preferences?.theme : "dark",

      facebook: edit ? author?.author?.social_links?.facebook : "",

      twitter: edit ? author?.author?.social_links?.twitter : "",

      youtube: edit ? author?.author?.social_links?.youtube : "",

      tiktok: edit ? author?.author?.social_links?.tiktok : "",

      instagram: edit ? author?.author?.social_links?.instagram : "",

      avatar_url: edit ? author?.author?.avatar_url : "",
    },
  });
  useEffect(() => {
    setAvatar(author?.author?.avatar_url);
  }, [author]);
  const emptyForm = {
    name: "",
    email: "",
    password: "",

    country_code: "",
    language: "",
    timezone: "",

    role: "reporter",

    status: "active",

    bio: "",
    specialization: "",

    verified: 0,

    currency: "NPR",
    theme: "dark",

    facebook: "",
    twitter: "",
    youtube: "",
    tiktok: "",
    instagram: "",

    avatar_url: "",
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.password) {
      formData.append("password", data.password);
    }

    formData.append("country_code", data.country_code);
    formData.append("language", data.language);
    formData.append("timezone", data.timezone);

    formData.append("role", data.role);
    formData.append("status", data.status);

    formData.append("preferences[currency]", data.currency);
    formData.append("preferences[theme]", data.theme);
    formData.append("bio", data.bio);

    formData.append("specialization", data.specialization);

    formData.append("verified", String(Number(data.verified)));

    formData.append("social_links[facebook]", data.facebook);
    formData.append("social_links[twitter]", data.twitter);
    formData.append("social_links[youtube]", data.youtube);
    formData.append("social_links[tiktok]", data.tiktok);
    formData.append("social_links[instagram]", data.instagram);
    if (data.avatar_url instanceof File) {
      formData.append("avatar_url", data.avatar_url);
    }

    if (edit) {
      formData.append("_method", "PUT");
      updateAuthor.mutate(
        {
          id: author.id,
          data: formData,
        },
        {
          onSuccess: (res: any) => {
            toast.success(res?.message || "Author updated successfully");

            setEdit?.(false);
            setAddAuthor(false);
            reset(emptyForm);
          },

          onError: (err: any) => {
            toast.error(err?.message || "Something went wrong");
          },
        },
      );
    } else {
      createAuthor.mutate(formData, {
        onSuccess: (res: any) => {
          toast.success(res?.message || "Author created successfully");

          setAddAuthor(false);
          reset(emptyForm);
        },

        onError: (err: any) => {
          toast.error(err?.message || "Something went wrong");
        },
      });
    }
  };

  return (
    <Dialog
      open={addAuthor || !!edit}
      onOpenChange={(open) => {
        if (!open) {
          setAddAuthor(false);
          setEdit?.(false);
        }
      }}
    >
      <DialogContent className=" !max-w-[60vw] bg-white  p-10 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <div>
          <h1 className=" text-xl font-bold text-[var(--color-primary)] ">
            {edit ? "Edit Author" : "Add New Author"}
          </h1>

          <p className=" text-sm text-gray-500 ">Create author profile</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-lg rounded-2xl p-10 space-y-6 "
        >
          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <label className="flex items-center gap-1 font-semibold">
                Name
                <Asterisk className="text-red-500" size={12} />
              </label>

              <input
                {...register("name", { required: "Name is required" })}
                className={`${inputStyle} ${
                  errors?.name ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              <p className="text-xs text-red-500 mt-1 h-4">
                {errors?.name?.message as string}
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 font-semibold">
                Email
                <Asterisk className="text-red-500" size={12} />
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`${inputStyle} ${
                  errors?.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              <p className="text-xs text-red-500 mt-1 h-4">
                {errors?.email?.message as string}
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1 font-semibold">
                Password
                {!edit && <Asterisk className="text-red-500" size={12} />}
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: !edit ? "Password is required" : false,
                  })}
                  className={`${inputStyle} ${
                    errors?.password
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  } pr-12  [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden
                  [&::-webkit-clear-button]:hidden`}
                  autoComplete="new-password"
                  placeholder={
                    edit
                      ? "Leave empty to keep current password"
                      : "Enter password"
                  }
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

            <div>
              <label className="font-semibold">Country Code</label>

              <input {...register("country_code")} className={inputStyle} />
            </div>

            <div>
              <label className="font-semibold">Language</label>

              <input {...register("language")} className={inputStyle} />
            </div>

            <div>
              <label className="font-semibold">Timezone</label>

              <input {...register("timezone")} className={inputStyle} />
            </div>

            <div>
              <label className="font-semibold">Role</label>

              <select {...register("role")} className={inputStyle}>
                {roleLoading ? (
                  <option>Loading...</option>
                ) : (
                  rolesList?.map((role: any) => (
                    <option value={role?.name}>{role?.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 ">
            <div className="space-y-4 ">
              <div><label className="font-semibold">Bio</label>

              <textarea rows={10} {...register("bio")} className={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-5 ">
            <div>
              <label className="font-semibold">Specialization</label>

              <input {...register("specialization")} className={inputStyle} />
            </div>
            <div>
              <label className="font-semibold">Verified</label>

              <select {...register("verified")} className={inputStyle}>
                <option value={0}>No</option>

                <option value={1}>Yes</option>
              </select>
            </div>
          </div>
            </div>
            <div className="space-y-4 ">
              Avatar Image
              <div className="h-[90%] w-full rounded-xl border-2 border-dashed border-[var(--color-secondary)] hover:border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <div className="relative h-full w-full">
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setValue("avatar_url", null);
                        setAvatar(null);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                    >
                      <X className="text-red-500" size={18} />
                    </button>
                  </div>
                ) : (
                  <label className=" flex flex-col cursor-pointer w-1/2 rounded-xl h-full flex items-center justify-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setValue("avatar_url", file);

                          const preview = URL.createObjectURL(file);
                          setAvatar(preview);
                        }
                      }}
                    />
                    <div
                      className="h-full w-full flex flex-col items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={50}
                      />
                      <p className="font-semibold text-[rgb(var(--color-secondary-rgb)/0.9)]">Upload Avatar</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
            
          </div>
          

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Currency</label>

              <input {...register("currency")} className={inputStyle} />
            </div>

            <div>
              <label className="font-semibold">Theme</label>

              <select {...register("theme")} className={inputStyle}>
                <option value="dark">Dark</option>

                <option value="light">Light</option>
              </select>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 ">
            <div>
              <label className="font-semibold">Facebook</label>

              <input
                {...register("facebook")}
                placeholder="https://facebook.com/user"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="font-semibold">Instagram</label>

              <input
                {...register("instagram")}
                placeholder="https://instagram.com/user"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="font-semibold">Twitter</label>

              <input
                {...register("twitter")}
                placeholder="https://twitter.com/user"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="font-semibold">Youtube</label>

              <input
                {...register("youtube")}
                placeholder="https://youtube.com/user"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="font-semibold">Tiktok</label>

              <input
                {...register("tiktok")}
                placeholder="https://tiktok.com/user"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="submit"
              className="bg-gray-100 text-black "
              onClick={() => {
                setAddAuthor(false);
                setEdit?.(false);
                reset(emptyForm);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" variant="submit">
              {edit
                ? updateAuthor.isPending
                  ? "Updating..."
                  : "Update"
                : createAuthor.isPending
                  ? "Adding..."
                  : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AuthorInputForm;
