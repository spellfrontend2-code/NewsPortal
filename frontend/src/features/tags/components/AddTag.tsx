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
function AddTag({ open, setOpen }: any) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const tagHook=useTagsHooks()
  const addTag=tagHook.useCreateTag()
  const onSubmit = (data: any) => {
    addTag.mutate(data, {
      onSuccess: (res) => {
        setOpen(false);
        reset({
          name: "",
        });
        toast.success(res?.message || "Tag added successfully");
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[20vh] !max-w-[30vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
            <p>Add Tag</p>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full h-[400px] rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Tag Name"
            className={inputStyle}
            {...register("name", { required: true })}
          />
          <Button variant="submit" type="submit" className="ml-2" disabled={addTag.isPending}>
            {addTag.isPending ? "Adding..." : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTag;
