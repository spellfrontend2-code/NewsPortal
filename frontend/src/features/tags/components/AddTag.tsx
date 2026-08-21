import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useTagsHooks } from "../hooks/useTags";
import { toast } from "sonner";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Asterisk } from "lucide-react";
function AddTag({setIsEdit, open, setOpen,tag,type }: any) {
  const { register, handleSubmit, reset,formState:{errors} } = useForm({
    defaultValues: {
      name:type==="edit"?tag?.name: "",
    },
  });
  const tagHook=useTagsHooks()
  const addTag=tagHook.useCreateTag()
  const editTag=tagHook.useUpdateTag()
  const onSubmit = (data: any) => {
   {type==="add" && addTag.mutate(data, {
      onSuccess: (res) => {
        setOpen(false);
        reset({
          name: "",
        });
        toast.success(res?.message || "Tag added successfully");
      },
    });}
    {
      type==="edit" && editTag.mutate({id:tag?.id,data}, {
        onSuccess: (res) => {
          setIsEdit(false);
          setOpen(false);
          reset({
            name: "",
          });
          toast.success(res?.message || "Tag updated successfully");
        },
      })
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open)=>{if(!open){setOpen(false);setIsEdit(false)}}}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[25vh] !max-w-[30vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
            <p>{type==="edit" ? "Edit Tag" : "Add Tag"}</p>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between items-center w-full h-full rounded-md overflow-hidden pt-3"
        >
          <div className="flex flex-col w-[80%] gap-1">
            <label className="flex items-center gap-2  font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Tag Name<Asterisk size={12} color="red"/></label>
  <input
    type="text"
    placeholder="Tag Name"
    className={`${inputStyle} ${
      errors.name ? "border-red-500 focus:border-red-500" : ""
    }`}
    {...register("name", { required: "Tag name is required" })}
  />

  <p className="text-xs text-red-500 mt-1 h-4">
    {errors.name?.message as string}
  </p>
</div>
          <Button variant="submit" type="submit" className="ml-2 w-[20%]" disabled={addTag.isPending}>
            {editTag.isPending ? "Updating..." : addTag.isPending ? "Adding..." :type==="edit" ? "Update" : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTag;
