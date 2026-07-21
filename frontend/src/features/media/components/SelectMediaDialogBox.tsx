import { useMediaHooks } from "../hooks/useMedia";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import MediaCollage from "./MediaCollage";
import MediaSkeleton from "./MediaSkeleton";

function SelectMediaDialogBox({setUploadType,setUploadOpen, open, onOpenChange , onSelectMedia,file_type,module}) {
  const mediaHook = useMediaHooks();
  const [articlePagination, setArticlePagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [advertisementPagination, setAdvertisementPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: articleMediaData, isLoading: articleMediaLoading } = mediaHook.useFetchMedia({
    search: "articles",
    page: articlePagination.pageIndex + 1,
    per_page: articlePagination.pageSize,
    file_type
  });
  console.log("articleMediaData",articleMediaData)
  const { data: advertisementMediaData, isLoading: advertisementMediaLoading } = mediaHook.useFetchMedia({
    search: "advertisements",
    page: advertisementPagination.pageIndex + 1,
    per_page: advertisementPagination.pageSize,
    file_type
  });
  const [articleMedia, setArticleMedia] = useState([]);
  const [advertisementMedia, setAdvertisementMedia] = useState([]);
  const [articleLastPage, setArticleLastPage] = useState(1);
  const [advertisementLastPage, setAdvertisementLastPage] = useState(1);
  useEffect(() => {
      setArticleMedia([]);

  setArticlePagination({
    pageIndex: 0,
    pageSize: 10,
  });
    setAdvertisementPagination({
    pageIndex: 0,
    pageSize: 10,
  });
    const medias = articleMediaData?.data ?? [];

    if (!medias.length) return;
    if (articleMediaData?.pagination?.last_page) {
      setArticleLastPage(articleMediaData.pagination.last_page);
    }
    if (articlePagination.pageIndex === 0) {
      setArticleMedia(medias);
    } else {
      setArticleMedia((prev) => [...prev, ...medias]);
    }
        console.log("updated")

  }, [articleMediaData, articlePagination.pageIndex,file_type]);

  useEffect(() => {
      setAdvertisementMedia([]);

    const medias = advertisementMediaData?.data ?? [];
    if (advertisementMediaData?.pagination?.last_page) {
      setAdvertisementLastPage(advertisementMediaData.pagination.last_page);
    }
    if (!medias.length) return;

    if (advertisementPagination.pageIndex === 0) {
      setAdvertisementMedia(medias);
    } else {
      setAdvertisementMedia((prev) => [...prev, ...medias]);
    }
  }, [advertisementMediaData, advertisementPagination.pageIndex,file_type]);
const sections =
  module === "articles"
    ? [
        {
          title: "Articles",
          loading: articleMediaLoading,
          media: articleMedia,
          pagination: articlePagination,
          setPagination: setArticlePagination,
          lastPage: articleLastPage,
        },
        {
          title: "Advertisements",
          loading: advertisementMediaLoading,
          media: advertisementMedia,
          pagination: advertisementPagination,
          setPagination: setAdvertisementPagination,
          lastPage: advertisementLastPage,
        },
      ]
    :module==="advertisements" && [
        {
          title: "Advertisements",
          loading: advertisementMediaLoading,
          media: advertisementMedia,
          pagination: advertisementPagination,
          setPagination: setAdvertisementPagination,
          lastPage: advertisementLastPage,
        },
        {
          title: "Articles",
          loading: articleMediaLoading,
          media: articleMedia,
          pagination: articlePagination,
          setPagination: setArticlePagination,
          lastPage: articleLastPage,
        },
      ];
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[70vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
            <p>Media</p>

            <Button  type="button" variant="submit" onClick={() =>{setUploadType(file_type); setUploadOpen(true);}}>
              <Plus />
              Upload New {file_type === "image" ? "Image" : "Video"}
            </Button>
          </DialogTitle>
        </DialogHeader>
        {/* <div className="w-full h-full p-5 flex flex-col  border border-[var(--color-secondary)] rounded-xl">
          <p className="text-lg font-semibold text-[var(--color-primary)] mb-3">
            Articles
          </p>
         {articleMediaLoading?<MediaSkeleton/>: <MediaCollage
            allMedia={articleMedia}
            pagination={articlePagination}
            setPagination={setArticlePagination}
            lastPage={articleLastPage}
  onSelectMedia={onSelectMedia}
          />}
        </div>
        <div className="w-full h-full p-5 flex flex-col border border-[var(--color-secondary)] rounded-xl">
          <p className="text-lg font-semibold text-[var(--color-primary)] mb-3">
            Advertisements
          </p>
          {advertisementMediaLoading?<MediaSkeleton/>:<MediaCollage
            allMedia={advertisementMedia}
            pagination={advertisementPagination}
            setPagination={setAdvertisementPagination}
            lastPage={advertisementLastPage}
            onSelectMedia={onSelectMedia}
          />}
        </div> */}
 {sections?.map((section) => (
  <div
    key={section.title}
    className="w-full h-full p-5 flex flex-col border border-[var(--color-secondary)] rounded-xl"
  >
    <p className="text-lg font-semibold text-[var(--color-primary)] mb-3">
      {section.title}
    </p>

    {section.loading ? (
      <MediaSkeleton />
    ) : (
      <MediaCollage
        allMedia={section.media}
        pagination={section.pagination}
        setPagination={section.setPagination}
        lastPage={section.lastPage}
        onSelectMedia={onSelectMedia}
      />
    )}
  </div>
))}
      </DialogContent>
   
    </Dialog>
            
    </>
  );
}
export default SelectMediaDialogBox;
