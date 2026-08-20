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
  const contentBlocks = Data?.content_blocks;

  const articleHook = useArticlesHooks();
  const likeArticle = articleHook.useLikePublicArticle();
  const dislikeArticle = articleHook.useDislikePublicArticle();
  const reportArticle = articleHook.useReportPublicArticle();
  const { checkAuth, open, setOpen } = useAuthChecker();

  const handleLike = () => {
    if (!checkAuth("Please login to like this article")) return;
    likeArticle.mutate(
      { id: articleData?.id, slug: articleData?.slug },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Liked successfully");
        },
      }
    );
  };

  const handleDislike = () => {
    if (!checkAuth("Please login to dislike this article")) return;
    dislikeArticle.mutate(
      { id: articleData?.id, slug: articleData?.slug },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Disliked successfully");
        },
      }
    );
  };

  const handleReport = () => {
    if (!checkAuth("Please login to report this article")) return;
    reportArticle.mutate(articleData?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Reported successfully");
      },
    });
  };

  const sidebarOrder: Record<string, number> = {
    sidebar_top: 1,
    sidebar_middle: 2,
    sidebar_bottom: 3,
  };

  const sortedSidebarAds = (advertisementData?.sidebar || []).slice().sort((a: any, b: any) => {
    const whereA = a?.placement?.where || a?.where || "";
    const whereB = b?.placement?.where || b?.where || "";
    return (sidebarOrder[whereA] || 99) - (sidebarOrder[whereB] || 99);
  });

  const hasSidebarAds = sortedSidebarAds.length > 0;

  // Track ad IDs rendered in body to prevent duplicate rendering at the bottom
  const renderedContentAdIds = new Set<number>();
  if (Array.isArray(contentBlocks)) {
    contentBlocks.forEach((block: any) => {
      if (block?.type === "advertisement" && block?.data?.id) {
        renderedContentAdIds.add(Number(block.data.id));
      }
    });
  }

  // Filter bottom ads to exclude any ad already rendered inside content_blocks or paragraph ads
  const bottomAdsToRender = (advertisementData?.bottom || []).filter(
    (ad: any) => !ad?.id || !renderedContentAdIds.has(Number(ad.id))
  );

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 items-start">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        {/* Media Block */}
        <div className="w-full rounded-md overflow-hidden shadow-md">
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

        {/* Article Body Content (content_blocks or HtmlParser) */}
        <div
          className="text-justify prose prose-slate max-w-none text-slate-800 text-lg 
            [&_p]:my-6 [&_p]:leading-relaxed [&_p]:text-slate-700
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-slate-900 
            [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-slate-900 
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
            [&_li]:mb-2 [&_li]:text-slate-700
            [&_blockquote]:border-l-4 [&_blockquote]:border-slate-800 [&_blockquote]:pl-6 [&_blockquote]:italic
            [&_blockquote]:text-slate-700 [&_blockquote]:text-xl [&_blockquote]:my-8
            [&_a]:text-[var(--color-public-newsText)] [&_a]:underline [&_a:hover]:opacity-80"
        >
          {Array.isArray(contentBlocks) && contentBlocks.length > 0 ? (
            <div>
              {contentBlocks.map((block: any, idx: number) => {
                if (block.type === "paragraph") {
                  return (
                    <div
                      key={`p-${idx}`}
                      dangerouslySetInnerHTML={{
                        __html: block.data?.html || block.data || "",
                      }}
                    />
                  );
                }
                if (block.type === "advertisement") {
                  return (
                    <div
                      key={`ad-${block.data?.id ?? idx}-${idx}`}
                      className="my-6 w-full overflow-hidden rounded-md"
                    >
                      <BannerAdvertisement item={block} Ad={block.data} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <HtmlParser
              content={articleData?.content || ""}
              paragraphAds={advertisementData?.paragraphs || []}
              middleAds={advertisementData?.middle || []}
              ad={advertisementData?.middle}
            />
          )}
        </div>

        {/* Bottom In-Article Advertisements (Only if not already rendered in content) */}
        {bottomAdsToRender.length > 0 && (
          <div className="w-full my-6 flex flex-col gap-4">
            {bottomAdsToRender.map((ad: any, index: number) => (
              <div
                key={ad.id ?? index}
                className="w-full overflow-hidden rounded-md shadow-sm"
              >
                <BannerAdvertisement Ad={ad} />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {articleData?.tags && articleData?.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200/60">
            {articleData?.tags?.map((tag: any) => (
              <span
                key={tag?.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full border border-slate-200/60 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-colors duration-150 cursor-pointer"
              >
                <Tag size={14} className="text-slate-400" />
                {tag?.name}
              </span>
            ))}
          </div>
        )}

        {/* Feedback Section */}
        <div className="my-8 w-full flex justify-center">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50 border border-slate-200/60 rounded-md p-6 md:p-8 w-full shadow-sm">
            <p className="font-semibold text-lg text-slate-800">
              Was this article helpful?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Like Button */}
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md border font-medium text-sm transition-all duration-200 cursor-pointer ${
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md border font-medium text-sm transition-all duration-200 cursor-pointer ${
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 hover:text-slate-850 font-medium text-sm transition-all duration-200 cursor-pointer"
                onClick={handleReport}
              >
                <ClipboardMinus size={16} />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div ref={commentRef} className="w-full">
          <NewsComment
            articleId={articleData?.id}
            articleComments={articleData?.comments}
          />
        </div>
      </div>

      {/* Right Column Sidebar Advertisements */}
      {hasSidebarAds && (
        <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 self-start">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {sortedSidebarAds.map((ad: any, index: number) => (
              <div
                key={ad.id ?? index}
                className="w-full max-w-[300px] aspect-[300/250] mx-auto overflow-hidden rounded-md"
              >
                <SidebarAdvertisement Ad={ad} />
              </div>
            ))}
          </div>
        </div>
      )}

      <UserLogin open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default NewsContent;
