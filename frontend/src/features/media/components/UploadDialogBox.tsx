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
import { UploadIcon, Plus, X } from "lucide-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMediaHooks } from "../hooks/useMedia";
import { toast } from "sonner";

function UploadDialogBox({ openUpload, setOpenUpload, quantity, type }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, setValue, watch, control, reset } = useForm({
    defaultValues: {
      category: "articles",
      files: [],
    },
  });
  const useMedia = useMediaHooks();
  const addBulkMedia = useMedia.useAddBulkMedia();
  const addMedia=useMedia.useCreateMedia()
  const onSubmit = (data,e) => {
        e.stopPropagation();

    {quantity==="multiple" && addBulkMedia.mutate(data, {
      onSuccess: (res) => {
        setOpenUpload(false);
        reset({
          category: "articles",
          files: [],
        });
        toast.success(res?.message || "Files uploaded successfully");
      },
      onError: (e) => {
        toast.error(e?.message || "Something went wrong");
      },
    });}
    {
      quantity==="single" && addMedia.mutate(data, {
        onSuccess: (res) => {
          setOpenUpload(false);
          reset({
            category: "articles",
            files: [],
          });
          toast.success(res?.message || "File uploaded successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    }
  };
  const previewImages = watch("files");
  console.log("previewImages", previewImages[0]?.type?.split("/")[0]);

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
              {quantity === "single" ? "Upload a File" : "Upload Multiple Files"}
            </p>
            <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.5)]">
              Drag and drop your {quantity === "single" ? "file" : "files"} here, or click to browse
            </p>
            <p className="text-[rgb(var(--color-gray-rgb)/0.5)]">
              {type === "image" ? "Images" : type === "video" ? "Videos" : "All"}
            </p>
          </div>

          <label className=" flex flex-col cursor-pointer w-1/2 rounded-xl h-full flex items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={
                type === "image"
                  ? "image/*"
                  : type === "video"
                    ? "video/*"
                    : "*/*"
              }
              multiple={quantity === "multiple"}
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
              Choose {quantity === "single" ? "File" : "Files"}
            </Button>
          </label>
          {previewImages.length > 0 && (
            <div className="w-full h-[350px]  bg-[rgb(var(--color-primary-rgb)/0.1)] p-5 rounded-2xl flex flex-col justify-between">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-gray-100 w-[150px]">
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
              <div className="grid grid-cols-3 gap-2 w-full overflow-x-auto m-3">
                {previewImages.map((image) => (
                  <div className="relative h-[200px] w-[200px]">
                    {image?.type?.split("/")[0] === "video" ? (
                      <video
                        src={URL.createObjectURL(image)}
                        className="border border-[var(--color-secondary)] h-full w-full object-cover rounded-2xl"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        className="border border-[var(--color-secondary)] h-full w-full object-cover rounded-2xl"
                        alt=""
                      />
                    )}
                    <div className="absolute top-0 left-0 w-full h-full bg-[rgb(var(--color-secondary-rgb)/0.3)] rounded-2xl" />
                    <X
                      size={18}
                      className="absolute top-1 right-1 text-red-800 hover:text-red-500 cursor-pointer"
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
                <Button
                  variant="submit"
                  type="submit"
                  className="w-[100px]"
                  disabled={addMedia?.isPending}
                >
                  {addMedia?.isPending ? "Uploading..." : "Upload"}
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
