import { inputStyle } from "@/components/shared/styles/inputStyle"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { useIconHooks } from "../hooks/useIcons"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

function IconAdd({open, onOpenChange,onSuccess}:any) 
{
      const queryClient = useQueryClient();
const [isAdding, setIsAdding] = useState(false);
    const iconHook=useIconHooks()
    const addIcon=iconHook.useCreateIcon()
    const {register,handleSubmit}=useForm({
        defaultValues:{
            icon_name:"",
            icon_class:""
        }
    })
    const onSubmit = (data: any) => {
  setIsAdding(true);

  addIcon.mutate(data, {
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: ["icons"],
      });

      onSuccess?.(res.data);
      toast.success("Icon added successfully");

      setIsAdding(false);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
      setIsAdding(false);
    },
  });
};
 return (
<div>
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[35vh] !max-w-[30vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
            <DialogHeader>
                <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
                Add New Icon
                </DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <label className="font-semibold">Icon Name</label>
                <input type="text" className={inputStyle} placeholder="Icon Name" {...register("icon_name")}/>
                <label className="font-semibold">Icon Class</label>
                 <input type="text" className={inputStyle} placeholder="Icon Class" {...register("icon_class")}/>
                <div className="flex justify-end "><Button type="submit" variant="submit" className="w-[100px]" disabled={addIcon?.isPending || isAdding}>
                    {addIcon?.isPending || isAdding ? "Adding...": "Add Icon"}</Button></div>
            </form>
        </DialogContent>
        </Dialog>
</div> )
}

export default IconAdd