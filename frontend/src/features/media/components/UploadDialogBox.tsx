import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadIcon,  Plus, X } from "lucide-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMediaHooks } from "../hooks/useMedia";
import { toast } from "sonner";

function UploadDialogBox({ openUpload, setOpenUpload }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      category: "articles",
      files: [],
    },
  });
  const useMedia=useMediaHooks()
  const addMedia=useMedia.useAddMedia()
  const onSubmit = (data) => {
    console.log(data);
    addMedia.mutate(data,{onSuccess:()=>{
        setOpenUpload(false);
        toast.success("Files uploaded successfully")}})
  };
  const previewImages = watch("files");

  return (
    <Dialog open={openUpload} onOpenChange={setOpenUpload}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex h-1/2  gap-2 items-center text-2xl text-[var(--color-primary)] font-bold">
            <UploadIcon
              className="bg-[rgb(var(--color-primary-rgb)/0.3)] p-2 rounded-md"
              size={35}
            />
            Upload Files
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full mt-5 h-2/3 flex flex-col gap-5 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center justify-center w-full">
            <p className="font-semibold text-xl flex items-center gap-2">
              Upload Multiple Files
            </p>
            <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.5)]">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-[rgb(var(--color-gray-rgb)/0.5)]">
              files, Documents, Videos, and more
            </p>
          </div>

          <label className=" flex flex-col cursor-pointer w-1/2 rounded-xl h-full flex items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setValue("files", files, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <Button
              type="button"
              variant="submit"
              className="text-lg h-[40px] flex items-center gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus strokeWidth={3} />
              Choose Files
            </Button>
          </label>
          {previewImages.length > 0 && (
            <div className="w-full h-[350px]  bg-[rgb(var(--color-primary-rgb)/0.1)] p-5 rounded-2xl flex flex-col justify-between">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent className="bg-gray-100 w-[200px]">
                      <SelectItem value="advertisements">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="articles">Article</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="flex gap-5 overflow-x-auto">
                {" "}
                {previewImages.map((image) => (
                  <div className="relative  ">
                    <img
                      src={URL.createObjectURL(image)}
                      className=" border border-[var(--color-secondary)] h-[200px] w-[200px] object-cover rounded-2xl"
                      alt=""
                    />
                    <X
                      className="absolute top-0 right-0 text-red-500 cursor-pointer"
                      onClick={() =>
                        setValue(
                          "files",
                          previewImages.filter((img) => img !== image),
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button variant="submit" type="submit" className="w-[80px]">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default UploadDialogBox;
