import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaSkeleton from "@/features/media/components/MediaSkeleton";
import MediaViewDialogBox from "@/features/media/components/MediaViewDialogBox";
import UploadDialogBox from "@/features/media/components/UploadDialogBox";
import { useMediaHooks } from "@/features/media/hooks/useMedia";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";

function Media() {
  const { control, watch } = useForm({
    defaultValues: {
      category: "all",
    },
  });
  const selectedCategory = watch("category");
  const [openUpload, setOpenUpload] = useState(false);
  const mediaHooks = useMediaHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const { data, isLoading } = mediaHooks.useFetchMedia({
    search: selectedCategory === "all" ? undefined : selectedCategory,
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const media = data?.data ?? [];
  const lastPage = data?.pagination?.last_page ?? 1;
  const deleteMedia = mediaHooks.useDeleteMedia();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [searchQuery, selectedCategory]);
  //   const filteredMedia = useMemo(() => {
  //   return media.filter((m) => {

  //     const matchesSearch =
  //       m.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       m.category.toLowerCase().includes(searchQuery.toLowerCase());

  //     return   matchesSearch;
  //   });
  // }, [media, searchQuery]);
  return (
    <div className="w-full h-full p-20 flex flex-col gap-5">
                <div className="flex justify-between items-end rounded-xl ">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">
          Media Gallery
        </p>
        <p className="text-gray-500">Manage your medias</p>
        </div>
        <Button
          variant="submit"
          className="h-10 flex items-center gap-2"
          onClick={() => setOpenUpload(true)}
        >
          <Plus />
          Add Media
        </Button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="border border-[var(--color-secondary)] w-full h-full rounded-xl p-5 flex flex-col justify-between">
          <div className="w-full flex justify-between items-center pb-3 mb-5 border-b border-[var(--color-secondary)]">
            <div className={`${inputStyle} flex items-center gap-2 max-w-[30%] `}>
              <Search strokeWidth={1.5} size={20}/>
              <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: 0,
                }));
              }}
              placeholder="Search Medias..."
              className="bg-transparent outline-none focus:outline-none w-full "
            /> </div> 
            <div className="w-[45%] flex justify-end">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className=" w-[150px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent className={`${inputStyle} bg-white w-[200px]`}>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="advertisements">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="articles">Article</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          {isLoading ? (
            <MediaSkeleton />
          ) : media.length > 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-[90%]  items-start">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {media.map((m) => (
                    <div
                      key={m.id}
                      className="h-[220px] w-full border border-[var(--color-secondary)] rounded-xl  hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        setSelectedMedia(m);
                        setViewOpen(true);
                      }}
                    >
                      <div className="relative w-full h-2/3 flex justify-center items-center ">
                        {m.file_type === "video" ? (
                          <video
                            src={m.file_url}
                            disablePictureInPicture
                            className="w-full h-full rounded-t-xl"
                          />
                        ) : (
                          <img
                            src={m.file_url}
                            className="w-full h-full rounded-t-xl"
                          />
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <div
                            className="flex items-center h-[30px] w-[30px] text-gray-500 z-50  cursor-pointer"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await navigator.clipboard.writeText(
                                  m.file_path,
                                );
                                toast.success("Copied URL to clipboard");
                              } catch (err) {
                                toast.error("Failed to copy URL: ", err);
                              }
                            }}
                          >
                            <Copy
                              strokeWidth={1.5}
                              size={20}
                              className="text-white hover:text-[var(--color-primary)]  h-full w-full p-1 bg-[rgb(var(--color-primary-rgb)/0.3)] rounded-md"
                            />
                          </div>
                          <div
                            className="flex items-center h-[30px] w-[30px] z-50 text-red-800 hover:text-red-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMedia(m);
                              setDeleteOpen(true);
                            }}
                          >
                            <Trash
                              strokeWidth={1.5}
                              size={20}
                              className="h-full w-full bg-red-100 p-1 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center h-[20px] w-[110px] absolute bottom-1  bg-[var(--color-primary)] px-2 py-1 rounded-full text-white text-sm ">
                          {m.category}
                        </div>
                      </div>
                      <div className="h-1/3 w-full flex flex-col justify-between items-center p-2 overflow-hidden">
                        <div className="text-gray-800 w-full rounded-b-xl text-sm font-semibold text-center">
                          {m.file_name.split(".")[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-2xl font-bold text-[var(--color-primary)]">
              No Media Found
            </div>
          )}

          <div className="flex items-center justify-between mt-4 w-full h-[40px]">
            <span className="shadow-md flex items-center justify-center w-[110px] h-full text-base text-[var(--color-primary)] font-semibold border-1 border-[var(--color-primary)] bg-gray-100/90 px-3 py-1 rounded-2xl">
              Page {pagination.pageIndex + 1} of {lastPage}
            </span>
            <div className="shadow-md  relative flex justify-between items-center overflow-hidden w-[150px] h-full border-1 border-[var(--color-primary)] bg-gray-100/90 text-gray-400  cursor-pointer rounded-2xl group">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.max(0, prev.pageIndex - 1),
                  }))
                }
                disabled={pagination.pageIndex <= 0}
                className={`h-full w-1/2 flex justify-start items-center ${pagination.pageIndex > 0 ? "text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]" : "text-gray-400"}  text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}
              >
                <ChevronLeft strokeWidth={3} className="h-10 w-5" />
                Prev
              </button>
              <div className="absolute inset-0 h-[95%] w-[1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)]" />
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.min(lastPage - 1, prev.pageIndex + 1),
                  }))
                }
                disabled={pagination.pageIndex >= lastPage - 1}
                className={`h-full w-1/2 flex justify-end items-center ${pagination.pageIndex < lastPage - 1 ? "text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]" : " text-gray-400"} text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}
              >
                Next
                <ChevronRight strokeWidth={3} className="h-10 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <UploadDialogBox
        openUpload={openUpload}
        setOpenUpload={setOpenUpload}
        quantity="multiple"
      />
      {deleteOpen && (
        <DeleteDialogBox
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedField={selectedMedia}
          deleteField={deleteMedia}
        />
      )}
      {viewOpen && (
        <MediaViewDialogBox
          open={viewOpen}
          onOpenChange={setViewOpen}
          media={selectedMedia}
        />
      )}
    </div>
  );
}
export default Media;
