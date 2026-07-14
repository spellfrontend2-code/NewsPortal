import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import PasswordDialogBox from "@/features/profile/components/PasswordDialogBox";
import { useProfileHooks } from "@/features/profile/hooks/useProfile";
import { Plus, Upload, X } from "lucide-react";
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

      <div className="w-full flex flex-col items-center gap-5"><form
        onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-5 shadow-lg p-10 rounded-2xl"
      >
        {/* Basic Information */}
        <div>

          <div className="grid grid-cols-2 gap-5">
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

            <Field label="Language" value={user?.language} editing={isEditing}>
              <input {...register("language")} className={inputStyle} />
            </Field>

            <Field label="Timezone" value={user?.timezone} editing={isEditing}>
              <input {...register("timezone")} className={inputStyle} />
            </Field>

            <Field label="Role" value={user?.role?.join(", ")} />
            <div>
              Profile Image
              <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center overflow-hidden">
                { profileImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-lg object-cover"
                    />
                    {isEditing && <button
                      type="button"
                      onClick={() => {
                        setValue("image", null);
                        setProfileImage(null);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                    >
                      <X className="text-red-500" size={18} />
                    </button>}
                  </div>
                ) : (
                  isEditing && <label className=" flex flex-col cursor-pointer w-1/2 rounded-xl h-full flex items-center justify-center">
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
                    <div
                      className="h-full w-full flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={50}
                      />
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  reset();
                  setProfileImage(null);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button variant="submit" type="submit">
                Save Changes
              </Button>
            </>
          ) : null}
        </div>
      </form>
      </div>
      <PasswordDialogBox open={openPassword} setOpen={setOpenPassword} />
    </div>
  );
}

export default Profile;
