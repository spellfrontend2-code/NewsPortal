import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthorHooks } from "../hooks/useAuthors";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
console.log(author)
 const {
  register,
  handleSubmit,
  reset,
} = useForm({
  defaultValues: {
    name: edit ? author?.name : "",
    email: edit ? author?.email : "",
    password: "",

    country_code: edit ? author?.country_code : "",
    language: edit ? author?.language : "",
    timezone: edit ? author?.timezone : "",

    role: edit ? author?.role?.[0] : "reporter",

    status: edit ? author?.status : "active",

    bio: edit ? author?.author?.bio : "",
    specialization: edit
      ? author?.author?.specialization
      : "",

    verified: edit
      ? Number(author?.author?.verified)
      : 0,

    currency: edit
      ? author?.preferences?.currency
      : "NPR",

    theme: edit
      ? author?.preferences?.theme
      : "dark",

    facebook: edit
      ? author?.author?.social_links?.facebook
      : "",

    twitter: edit
      ? author?.author?.social_links?.twitter
      : "",

    avatar_url: edit
      ? author?.author?.avatar_url
      : "",
  },
});

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

  avatar_url: "",
};

  const onSubmit = (data:any)=>{
  const payload = {

    name:data.name,
    email:data.email,

    ...(data.password && {
      password:data.password
    }),

    country_code:data.country_code,
    language:data.language,
    timezone:data.timezone,


    role:
      data.role,
  


    status:data.status,


    preferences:{
      currency:data.currency,
      theme:data.theme,
    },


    bio:data.bio,

    specialization:data.specialization,


    verified:Number(data.verified),


    social_links:{
      facebook:data.facebook,
      twitter:data.twitter,
    },


    avatar_url:data.avatar_url,

  };


  if(edit){

    updateAuthor.mutate(
      {
        id:author.id,
        data:payload
      },
      {
        onSuccess:(res:any)=>{
          toast.success(
            res?.message || 
            "Author updated successfully"
          );

          setEdit?.(false);
          setAddAuthor(false);
          reset(emptyForm);
        },

        onError:(err:any)=>{
          toast.error(
            err?.message ||
            "Something went wrong"
          );
        }
      }
    );


  }else{


    createAuthor.mutate(
      payload,
      {
        onSuccess:(res:any)=>{

          toast.success(
            res?.message ||
            "Author created successfully"
          );

          setAddAuthor(false);
          reset(emptyForm);

        },


        onError:(err:any)=>{
          toast.error(
            err?.message ||
            "Something went wrong"
          );
        }
      }
    );

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
      <DialogContent
        className="
!max-w-[60vw]
bg-white
p-10
max-h-[85vh]
overflow-y-auto
"
      >
        <div>
          <h1
            className="
text-xl
font-bold
text-[var(--color-primary)]
"
          >
            {edit ? "Edit Author" : "Add New Author"}
          </h1>

          <p
            className="
text-sm
text-gray-500
"
          >
            Create author profile
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
mt-8
space-y-6
"
        >
          <div
            className="
border
rounded-2xl
p-6
grid
grid-cols-2
gap-5
"
          >
            <div>
              <label className="font-semibold">Name</label>

              <input {...register("name")} className={inputStyle} />
            </div>

            <div>
              <label className="font-semibold">Email</label>

              <input
                type="email"
                {...register("email")}
                className={inputStyle}
              />
            </div>

           <div>
  <label className="font-semibold">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      {...register("password")}
      className={`${inputStyle} pr-12  [&::-ms-reveal]:hidden
    [&::-ms-clear]:hidden
    [&::-webkit-credentials-auto-fill-button]:hidden
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
      onClick={() =>
        setShowPassword((prev) => !prev)
      }
      className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-gray-500
      hover:text-[var(--color-primary)]
      "
    >

      {
        showPassword
        ?
        <EyeOff size={20}/>
        :
        <Eye size={20}/>
      }

    </button>

  </div>

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

            <div>
              <label className="font-semibold">Specialization</label>

              <input {...register("specialization")} className={inputStyle} />
            </div>
          </div>

          <div
            className="
border
rounded-2xl
p-6
space-y-4
"
          >
            <label className="font-semibold">Bio</label>

            <textarea rows={5} {...register("bio")} className={inputStyle} />
          </div>

          <div
            className="
border
rounded-2xl
p-6
grid
grid-cols-2
gap-5
"
          >
            <div>
              <label className="font-semibold">Verified</label>

              <select {...register("verified")} className={inputStyle}>
                <option value={0}>No</option>

                <option value={1}>Yes</option>
              </select>
            </div>

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

          <div
            className="
border
rounded-2xl
p-6
grid
grid-cols-2
gap-5
"
          >
            <div>
              <label className="font-semibold">Facebook</label>

              <input
                {...register("facebook")}
                placeholder="https://facebook.com/user"
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
          </div>

          <div
            className="
flex
justify-end
gap-3
"
          >
            <Button
              type="button"
              variant="submit"
              className="
bg-gray-100
text-black
"
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
