import { useMediaHooks } from "../hooks/useMedia";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MediaCard from "./MediaCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import UploadDialogBox from "./UploadDialogBox";
import MediaCollage from "./MediaCollage";

function SelectMediaDialogBox({ open, onOpenChange , onSelectMedia,}) {
  const mediaHook = useMediaHooks();
  const [articlePagination, setArticlePagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [advertisementPagination, setAdvertisementPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [uploadOpen, setUploadOpen] = useState(false);
  const { data: articleMediaData } = mediaHook.useFetchMedia({
    search: "articles",
    page: articlePagination.pageIndex + 1,
    per_page: articlePagination.pageSize,
  });
  const { data: advertisementMediaData } = mediaHook.useFetchMedia({
    search: "advertisements",
    page: advertisementPagination.pageIndex + 1,
    per_page: advertisementPagination.pageSize,
  });
  const [articleMedia, setArticleMedia] = useState([]);
  const [advertisementMedia, setAdvertisementMedia] = useState([]);
  const [articleLastPage, setArticleLastPage] = useState(1);
  const [advertisementLastPage, setAdvertisementLastPage] = useState(1);
  useEffect(() => {
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
  }, [articleMediaData, articlePagination.pageIndex]);

  useEffect(() => {
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
  }, [advertisementMediaData, advertisementPagination.pageIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[70vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
            <p>Media</p>

            <Button variant="submit" onClick={() => setUploadOpen(true)}>
              <Plus />
              Upload New Image
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full p-5 flex flex-col  border border-[var(--color-secondary)] rounded-xl">
          <p className="text-lg font-semibold text-[var(--color-primary)] mb-3">
            Articles
          </p>
          <MediaCollage
            allMedia={articleMedia}
            pagination={articlePagination}
            setPagination={setArticlePagination}
            lastPage={articleLastPage}
  onSelectMedia={onSelectMedia}
          />
        </div>
        <div className="w-full h-full p-5 flex flex-col border border-[var(--color-secondary)] rounded-xl">
          <p className="text-lg font-semibold text-[var(--color-primary)] mb-3">
            Advertisements
          </p>
          <MediaCollage
            allMedia={advertisementMedia}
            pagination={advertisementPagination}
            setPagination={setAdvertisementPagination}
            lastPage={advertisementLastPage}
            onSelectMedia={onSelectMedia}
          />
        </div>
        <UploadDialogBox
          openUpload={uploadOpen}
          setOpenUpload={setUploadOpen}
          quantity="single"
          type="image"
        />
      </DialogContent>
    </Dialog>
  );
}
export default SelectMediaDialogBox;
