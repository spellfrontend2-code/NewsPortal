import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import PasswordDialogBox from "@/features/profile/components/PasswordDialogBox";
import { useProfileHooks } from "@/features/profile/hooks/useProfile";
import { Plus, Shield, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";

const Field = ({
  label,
  value,
  editing,
  children,
}: {
  label: string;
  value?: React.ReactNode;
  editing?: boolean;
  children?: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-gray-600">{label}</label>

    {editing ? (
      children
    ) : (
      <div className={`${inputStyle} border-[var(--color-primary)]`}>
        {value || "-"}
      </div>
    )}
  </div>
);

function Profile() {
  const profileHook = useProfileHooks();
  const [isEditing, setIsEditing] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { data, isLoading, error } = profileHook.useFetchProfile();
  const updateProfile = profileHook.useUpdateProfile();
  const user = data?.data ?? {};
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      country_code: "",
      language: "",
      timezone: "",
      image: null,
    },
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name ?? "",
      email: user.email ?? "",
      country_code: user.country_code ?? "",
      language: user.language ?? "",
      timezone: user.timezone ?? "",
      image: user.profile_image ?? "",
    });

    setProfileImage(user.profile_image ?? null);
  }, [user, reset]);
  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("country_code", data.country_code);
    formData.append("language", data.language);
    formData.append("timezone", data.timezone);

    if (data.image instanceof File) {
      formData.append("profile_image", data.image);
    }

    updateProfile.mutate(formData, {
      onSuccess: (res) => {
        setIsEditing(false);
        toast.success(res?.message || "Profile updated successfully");
      },
      onError: (e) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
  };
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5 ">
      <div className="flex justify-between items-end rounded-xl">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">Profile</p>

          <p className="text-gray-500">Manage your Profile</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpenPassword(true)}>
            Change Password
          </Button>

          {!isEditing && (
            <Button variant="submit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 shadow-lg  rounded-2xl"
        >
          <div className="relative w-full h-[280px] rounded-t-2xl overflow-visible">
            <div className="absolute inset-0 h-[150px] rounded-t-2xl overflow-hidden bg-[var(--color-primary)]"></div>

            {/* Profile Image */}
          <div className="absolute left-10 bottom-10 z-10">
  {/* Profile Image */}
  <div className="relative h-[180px] w-[180px] rounded-full border-4 border-white bg-[rgb(var(--color-primary-rgb)/0.1)] shadow-lg flex items-center justify-center overflow-hidden">
    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="h-full w-full rounded-full object-cover"
      />
    ) : (
      <label className="h-full w-full flex items-center justify-center cursor-pointer bg-gray-100">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setValue("image", file);

              const preview = URL.createObjectURL(file);
              setProfileImage(preview);
            }
          }}
        />

        <Upload
          color="var(--color-primary)"
          strokeWidth={1.5}
          size={50}
        />
      </label>
    )}
  </div>

  {/* Remove Image Button - Outside Image */}
  {isEditing && profileImage && (
    <button
      type="button"
      onClick={() => {
        setValue("image", null);
        setProfileImage(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }}
      className="
      cursor-pointer
        absolute
        top-4
       right-0
        z-20
        h-8
        w-8
        rounded-full
        bg-white
        shadow-md
        flex
        items-center
        justify-center
        hover:bg-gray-100
      "
    >
      <X className="text-red-500" size={18} />
    </button>
  )}
</div>

            {/* Role Badge */}
            <div className="absolute right-10 bottom-20 z-10">
              <p
                className="
        flex items-center gap-3
        w-fit
        text-base font-semibold
        border border-[var(--color-primary)]
        bg-white
        text-[var(--color-primary)]
        px-4 py-2
        rounded-2xl
        shadow-md
      "
              >
                <Shield size={20} />
                {user?.role?.join(", ")}
              </p>
            </div>
          </div>
          {/* Basic Information */}
          <div>
            <div className="grid grid-cols-2 gap-5 px-10 pb-10">
              <Field label="Name" value={user?.name} editing={isEditing}>
                <input {...register("name")} className={inputStyle} />
              </Field>

              <Field label="Email" value={user?.email} editing={isEditing}>
                <input {...register("email")} className={inputStyle} />
              </Field>
              <Field
                label="Country Code"
                value={user?.country_code}
                editing={isEditing}
              >
                <input {...register("country_code")} className={inputStyle} />
              </Field>

              <Field
                label="Language"
                value={user?.language}
                editing={isEditing}
              >
                <input {...register("language")} className={inputStyle} />
              </Field>

              <Field
                label="Timezone"
                value={user?.timezone}
                editing={isEditing}
              >
                <input {...register("timezone")} className={inputStyle} />
              </Field>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {isEditing ? (
              <div className="flex gap-3 p-5">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    reset({
                      name: user.name ?? "",
                      email: user.email ?? "",
                      country_code: user.country_code ?? "",
                      language: user.language ?? "",
                      timezone: user.timezone ?? "",
                      image: user.profile_image ?? "",
                    });

                    setProfileImage(user.profile_image ?? null);

                    // Clear selected file input
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }

                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>

                <Button variant="submit" type="submit">
                  Save Changes
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
      <PasswordDialogBox open={openPassword} setOpen={setOpenPassword} />
    </div>
  );
}

export default Profile;
