import { Button } from "@/components/ui/button"
import MediaCard from "./MediaCard"

function MediaCollage({allMedia,pagination,setPagination,lastPage,  onSelectMedia,}){
return (
     <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-[90%] flex flex-col items-end">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {allMedia.map((media) => (
                 <MediaCard key={media.id} media={media} onSelect={onSelectMedia}

/>
              ))}
            </div>
            {pagination.pageIndex+1 < lastPage && (
              <Button
              variant="outline"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                className="w-[100px]  items-center text-underline mt-5 text-[var(--color-primary)] cursor-pointer"
              >
                Show More
              </Button>
            )}
          </div>
        </div>
)
}
export default MediaCollage