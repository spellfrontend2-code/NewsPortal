import { useAuthStore } from "@/context/useAuthStore";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthChecker } from "@/features/auth/hooks/useAuthChecker";
import DOMPurify from "dompurify";
import { ClipboardMinus, Tag, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

function NewsContent({ Data }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;
  const articleHook = useArticlesHooks();
  const likeArticle = articleHook.useLikePublicArticle();
  const dislikeArticle = articleHook.useDislikePublicArticle();
  const reportArticle=articleHook.useReportPublicArticle();
const { checkAuth, open, setOpen } = useAuthChecker();
  const handleLike = () => {
    
  if (!checkAuth("Please login to like this article")) return;
    likeArticle.mutate(articleData?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Liked successfully");
      },
    });
  };
  const handleDislike = () => {
      if (!checkAuth("Please login to dislike this article")) return;

    dislikeArticle.mutate(articleData?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Disliked successfully");
      },
    });
  };
    const handleReport = () => {
        if (!checkAuth("Please login to report this article")) return;

    reportArticle.mutate(articleData?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Reported successfully");
      },
    });
  };
  return (
    <div className="flex w-full h-full gap-10">
      <div
        className={`${advertisementData?.sidebar?.length > 0 ? "w-3/4" : "w-full"} flex flex-col gap-3`}
      >
        <div className="w-full ">
          {articleData?.media_type === "image" &&
          articleData?.featured_image ? (
            <img
              src={articleData?.featured_image}
              alt={articleData?.title}
              className="h-full w-full object-fill"
            />
          ) : articleData?.media_type === "video" && articleData?.video_url ? (
            <video
              src={articleData?.video_url}
              controls
              className="h-full w-full object-contain"
            />
          ) : (
            articleData?.youtube_url && (
              <video
                src={articleData?.youtube_url}
                controls
                className="h-full w-full object-fill"
              />
            )
          )}
        </div>
        {advertisementData?.middle && (
          <div className="h-[100px] w-full">
            <BannerAdvertisement Ad={advertisementData?.middle} />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(articleData?.content || ""),
          }}
        />
        {advertisementData?.bottom && (
          <div className="h-[100px] w-full">
            <BannerAdvertisement Ad={advertisementData?.bottom} />
          </div>
        )}
        <div className="flex gap-3">
          {articleData?.tags?.map((tag) => {
            return (
              <span className="flex items-center gap-2 px-2 py-1 text-sm rounded-2xl border border-[rgb(var(--color-public-newsText-rgb)/0.1)] bg-[rgb(var(--color-public-newsText-rgb)/0.1)] ">
                <Tag size={15} color={"var(--color-public-newsText)"} />
                {tag?.name}
              </span>
            );
          })}
        </div>
        <div className="flex w-full justify-center gap-1 items-center h-[120px] w-full ">
          <div className="flex w-3/5 justify-between items-center   bg-white shadow-lg rounded-2xl h-full w-full px-20">
            <p className="font-bold text-xl text-[rgb(var(--color-public-newsText-rgb)/0.6)]">
              Was this news helpful?
            </p>
            <div className="flex w-2/5 ">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold">{articleData?.likes_count} likes</p>
                <div
                  className="cursor-pointer h-[100px] w-[130px]   hover:-translate-y-1  transition-all duration-300 rounded-xl px-2 py-1 
            flex flex-col items-center justify-center  text-sm font-semibold text-green-600 group"
                  onClick={() => handleLike()}
                >
                  <div className="bg-green-200/40 group-hover:bg-green-200 h-[50px] w-[50px] rounded-xl flex items-center justify-center">
                    <ThumbsUp
                      size={25}
                      className={`${articleData?.user_interactions?.has_liked === true && "fill-green-500 "}`}
                    />
                  </div>
                  Like
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold">
                  {articleData?.dislikes_count} dislikes
                </p>
                <div
                  className="cursor-pointer h-[100px] w-[130px]   hover:-translate-y-1  transition-all duration-300 rounded-xl px-2 py-1 
            flex flex-col items-center justify-center text-sm font-semibold text-red-600 group"
                  onClick={() => handleDislike()}
                >
                  <div className="bg-red-200/40 group-hover:bg-red-200 h-[50px] w-[50px] rounded-xl flex items-center justify-center">
                    <ThumbsDown
                      size={25}
                      className={`${articleData?.user_interactions?.has_dislike === true && "fill-red-500 "}`}
                    />
                  </div>
                  Dislike
                </div>
              </div>
              <div>
 <div className="flex flex-col justify-center items-end">
                <p className="font-bold text-transparent">
                  {".."}
                </p>
                <div
                  className="cursor-pointer h-[100px] w-[130px]   hover:-translate-y-1  transition-all duration-300 rounded-xl px-2 py-1 
            flex flex-col items-center justify-center text-sm font-semibold text-red-600 group"
                  onClick={() => handleReport()}
                >
                  <div className="bg-red-200/40 group-hover:bg-red-200 h-[50px] w-[50px] rounded-xl flex items-center justify-center">
                    <ClipboardMinus
                      size={25}
                      className={`${articleData?.user_interactions?.has_report === true && "fill-red-500 "}`}
                    />
                  </div>
                  Report
                </div>
              </div>              </div>
            </div>
          </div>
        </div>
      </div>
      {advertisementData?.sidebar?.length > 0 && (
        <div className="w-1/4 h-full flex flex-col gap-3">
          {advertisementData.sidebar.map((ad: any, index: number) => (
            <div key={ad.id ?? index} className="h-[200px] w-full">
              <SidebarAdvertisement Ad={ad} />
            </div>
          ))}
        </div>
      )}
       <UserLogin
      open={open}
      onOpenChange={setOpen}
    />
    </div>
  );
}
export default NewsContent;
