import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthChecker } from "@/features/auth/hooks/useAuthChecker";
import { ClipboardMinus, Tag, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import HtmlParser from "./HtmlParser";
import NewsComment from "./NewsComment";

function NewsContent({ Data, commentRef }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;
  const articleHook = useArticlesHooks();
  const likeArticle = articleHook.useLikePublicArticle();
  const dislikeArticle = articleHook.useDislikePublicArticle();
  const reportArticle = articleHook.useReportPublicArticle();
  const { checkAuth, open, setOpen } = useAuthChecker();
  const handleLike = () => {
    if (!checkAuth("Please login to like this article")) return;
    likeArticle.mutate({id:articleData?.id,slug:articleData?.slug}, {
      onSuccess: (res) => {
        toast.success(res?.message || "Liked successfully");
      },
    });
  };
  const handleDislike = () => {
    if (!checkAuth("Please login to dislike this article")) return;

    dislikeArticle.mutate({id:articleData?.id,slug:articleData?.slug}, {
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
    <div className="h-full overflow-y-auto flex flex-col lg:flex-row w-full gap-8">
      {/* Main Content Area */}
      <div
        className={`${advertisementData?.sidebar?.length > 0 ? "lg:w-3/4 w-full" : "w-full"} flex flex-col gap-6`}
      >
        {/* Media Block */}
        <div className="w-full rounded-2xl overflow-hidden shadow-md">
          <div className="w-full aspect-video md:h-[480px] overflow-hidden">
            {articleData?.media_type === "image" &&
            articleData?.featured_image ? (
              <img
                src={articleData?.featured_image}
                alt={articleData?.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.015]"
              />
            ) : articleData?.media_type === "video" &&
              articleData?.video_url ? (
              <video
                src={articleData?.video_url}
                controls
                className="h-full w-full object-contain bg-black"
              />
            ) : (
              articleData?.youtube_url && (
                <div className="relative w-full h-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src={articleData.youtube_url
                      .replace("watch?v=", "embed/")
                      .replace("youtu.be/", "youtube.com/embed/")}
                    title={articleData?.title || "YouTube video"}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Article Body Content */}
        <div
          className=" text-justify prose prose-slate max-w-none text-slate-800 leading-relaxed text-lg 
            [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-slate-700
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-slate-900 
            [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-slate-900 
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
            [&_li]:mb-2 [&_li]:text-slate-700
            [&_blockquote]:border-l-4 [&_blockquote]:border-slate-800 [&_blockquote]:pl-6 [&_blockquote]:italic
            [&_blockquote]:text-slate-700  [&_blockquote]:text-xl [&_blockquote]:my-8
            [&_a]:text-[var(--color-public-newsText)] [&_a]:underline hover:[&_a]:opacity-80 "
        >
          <HtmlParser
            content={articleData?.content || ""}
            ad={advertisementData?.middle}
          />
        </div>

        {/* Bottom Advertisement */}
        {advertisementData?.bottom?.length > 0 && (
          <div className=" w-full rounded-2xl overflow-hidden border border-slate-100/80 shadow-sm bg-slate-50/30 my-2">
            <BannerAdvertisement Ad={advertisementData?.bottom[0]} />
          </div>
        )}

        {/* Tags */}
        {articleData?.tags && articleData?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/60">
            {articleData?.tags?.map((tag: any) => (
              <span
                key={tag?.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-200/60 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-colors duration-150 cursor-pointer"
              >
                <Tag size={12} className="text-slate-400" />
                {tag?.name}
              </span>
            ))}
          </div>
        )}

        {/* Feedback Section */}
        <div className="my-8 w-full flex justify-center">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 w-full shadow-sm">
            <p className="font-semibold text-lg text-slate-800 ">
              Was this article helpful?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Like Button */}
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer ${
                  articleData?.user_interactions?.has_liked === true
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm"
                    : "bg-white border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 text-slate-650 hover:text-emerald-700"
                }`}
                onClick={handleLike}
              >
                <ThumbsUp
                  size={16}
                  className={
                    articleData?.user_interactions?.has_liked === true
                      ? "fill-emerald-600"
                      : ""
                  }
                />
                <span>Like</span>
                <span className="h-4 w-px bg-slate-200 mx-1"></span>
                <span className="font-bold">{articleData?.likes_count}</span>
              </button>

              {/* Dislike Button */}
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer ${
                  articleData?.user_interactions?.has_dislike === true
                    ? "bg-rose-50 border-rose-200 text-rose-700 shadow-sm"
                    : "bg-white border-slate-200 hover:border-rose-200 hover:bg-rose-50/30 text-slate-655 hover:text-rose-700"
                }`}
                onClick={handleDislike}
              >
                <ThumbsDown
                  size={16}
                  className={
                    articleData?.user_interactions?.has_dislike === true
                      ? "fill-rose-600"
                      : ""
                  }
                />
                <span>Dislike</span>
                <span className="h-4 w-px bg-slate-200 mx-1"></span>
                <span className="font-bold">{articleData?.dislikes_count}</span>
              </button>

              {/* Report Button */}
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 hover:text-slate-850 font-medium text-sm transition-all duration-200 cursor-pointer"
                onClick={handleReport}
              >
                <ClipboardMinus size={16} />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>

        {/*Comments Section */}
        <div ref={commentRef} className="w-full">
          <NewsComment
            articleId={articleData?.id}
            articleComments={articleData?.comments}
          />
        </div>
      </div>

      {/* Sidebar Area */}
      {advertisementData?.sidebar?.length > 0 && (
        <div className="lg:w-1/4 w-full flex flex-col gap-6">
          {advertisementData.sidebar.map((ad: any, index: number) => (
            <div
              key={ad.id ?? index}
              className="h-[160px] w-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm"
            >
              <SidebarAdvertisement Ad={ad} />
            </div>
          ))}
        </div>
      )}

      <UserLogin open={open} onOpenChange={setOpen} />
    </div>
  );
}
export default NewsContent;
