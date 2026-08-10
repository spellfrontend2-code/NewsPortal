import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import NewsContent from "@/features/articles/components/Public/NewsDetail/NewsContent";
import NewsDetailSkeleton from "@/features/articles/components/Public/NewsDetail/NewsDetailSkeleton";
import NewsHeader from "@/features/articles/components/Public/NewsDetail/NewsHeader";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthChecker } from "@/features/auth/hooks/useAuthChecker";
import { shareArticle } from "@/lib/shareHandler";
import { Bookmark, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const socialMedias = [
  {
    icon_class: "fa-solid fa-link",
    platform: "link",
    color: "#8f8488",
  },
  {
    icon_class: "fa-brands fa-facebook",
    platform: "facebook",
    color: "#3b5998",
  },
  {
    icon_class: "fa-brands fa-x-twitter",
    platform: "twitter",
    color: "#000000",
  },
  {
    icon_class: "fa-brands fa-linkedin",
    platform: "linkedin",
    color: "#0077B5",
  },
  {
    icon_class: "fa-brands fa-whatsapp",
    platform: "whatsapp",
    color: "#25D366",
  },
];
function NewsDetail() {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } =
    articleHook.useFetchPublicSingleArticle(slug);
  const sharePublicArticle = articleHook.useSharePublicArticle();
  const bookmarkPublicArticle = articleHook.useBookmarkPublicArticle();
  const Data = articles?.data ?? [];
  const [showPopup, setShowPopup] = useState(false);
  const { checkAuth, open, setOpen } = useAuthChecker();
  const { data: relatedNewsList, isLoading: relatednewsLoading } =
    articleHook.useFetchRelatedArticles(slug);
  const relatedNews = relatedNewsList?.data
    ?.filter((item: any) => item.type === "article")
    .slice(0, 3);

  useEffect(() => {
    if (Data?.advertisements?.popup) {
      setShowPopup(true);
    }
  }, [Data?.advertisements?.popup]);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };
  const handleSocialShare = (media: any) => {
    if (media.platform === "link") {
      handleCopyLink();
    } else {
      shareArticle(Data?.article, media.platform);
    }
    sharePublicArticle.mutate(
      {
        id: Data?.article?.id,
        platform: media?.platform,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Article shared successfully");
        },
        onError: (err) => {
          console.log(err);
          toast.error(err?.message || "Something went wrong");
        },
      },
    );
  };
  const handleBookmark = () => {
    if (!checkAuth("Please login to save this article")) return;
    bookmarkPublicArticle.mutate({id:Data?.article?.id,slug:Data?.article?.slug}, {
      onSuccess: (res) => {
        toast.success(res?.message || "Saved successfully");
      },
      onError: (err) => {
        toast.error(err?.message || "Something went wrong");
      },
    });
  };
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex justify-center w-full ">
      {isLoading ? (
        <NewsDetailSkeleton />
      ) : (
        Data && (
          <div className="flex flex-col gap-6 w-full max-w-screen-xl ">
            <div className="flex flex-col gap-6 w-full ">
              {/* Article Header (Full Width) */}
              <NewsHeader Data={Data} />
              <div className="w-full h-px bg-slate-200/60 my-1"></div>

              {/* Layout: Sidebar + Main Content */}
              <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 w-full relative ">
                {/* Responsive Interaction Bar (Mobile: Horizontal under header, Desktop: Vertical sticky left) */}
                <div className="xl:w-[65px] shrink-0 order-1 z-20">
                  <div className="sticky top-20 xl:top-24 flex xl:flex-col flex-row items-center justify-center xl:justify-start gap-3 xl:gap-6 py-2 xl:py-6 px-4 xl:px-2 bg-white/95 xl:bg-slate-50 backdrop-blur-sm border border-slate-200 xl:border-slate-100 rounded-full shadow-sm text-slate-600 w-fit mx-auto xl:w-full overflow-x-auto flex-wrap transition-all">
                    {/* Bookmark */}
                    <button
                      onClick={() => handleBookmark()}
                      className="group flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    >
                      <Bookmark
                        size={22}
                        className={`transition-all duration-200 ${
                          Data?.article?.user_interactions?.has_bookmarked ===
                          true
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-400 group-hover:text-amber-500"
                        }`}
                      />
                    </button>

                    <div className="hidden xl:block w-6 h-px bg-slate-200"></div>
                    <div className="xl:hidden h-5 w-px bg-slate-200 mx-1"></div>

                    {/* Comments Count */}
                    <div
                      className="flex xl:flex-col items-center justify-center gap-1 xl:gap-0 shrink-0"
                      onClick={() =>
                        commentRef.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    >
                      <MessageCircle
                        size={18}
                        className="text-slate-450 xl:w-5 xl:h-5"
                      />
                      <p className="font-bold text-xs xl:text-sm text-slate-700 xl:mt-0.5">
                        {Data?.article?.comment_count}
                      </p>
                    </div>

                    {/* Shares Count */}
                    <div className="flex xl:flex-col items-center justify-center gap-1 xl:gap-0 shrink-0">
                      <p className="font-bold text-xs xl:text-sm text-slate-700">
                        {Data?.article?.share_count}
                      </p>
                      <p className="uppercase tracking-widest text-[10px] xl:text-[9px] font-bold text-slate-400">
                        shares
                      </p>
                    </div>

                    <div className="hidden xl:block w-6 h-px bg-slate-200"></div>
                    <div className="xl:hidden h-5 w-px bg-slate-200 mx-1"></div>

                    {/* Social Actions */}
                    <div className="flex flex-row xl:flex-col gap-2 xl:gap-4 items-center shrink-0 ">
                      {socialMedias?.map((media, index) => (
                        <button
                          key={index}
                          onClick={() => handleSocialShare(media)}
                          className="cursor-pointer hover:scale-110 transition-transform duration-150 p-1.5 rounded-full hover:bg-slate-100"
                        >
                          <i
                            className={`${media?.icon_class} text-base xl:text-lg`}
                            style={{ color: media?.color }}
                          ></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 order-2">
                  <NewsContent Data={Data} commentRef={commentRef} />
                </div>
              </div>
            </div>
            {relatedNews?.length>0 && <div className=" ">
              <div className="flex flex-col gap-4  mb-4">
                <h1 className="text-3xl  lg:text-4xl  font-black tracking-tight text-slate-900 leading-[1.15]">
                  Related News
                </h1>
              </div>
              {relatednewsLoading ? (
                <p>Loading</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {relatedNews?.map((news: any, index: number) => (
                    <ArticleSquareCard key={index} article={news?.data} />
                  ))}
                </div>
              )}
            </div>}
          </div>
        )
      )}
      {Data?.advertisements?.popup?.length > 0 && (
        <PopupAdvertisement
          advertisements={Data?.advertisements?.popup[0]}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <UserLogin open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default NewsDetail;
