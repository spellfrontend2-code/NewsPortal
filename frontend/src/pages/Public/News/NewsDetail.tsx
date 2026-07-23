import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import NewsContent from "@/features/articles/components/Public/NewsDetail/NewsContent";
import NewsDetailSkeleton from "@/features/articles/components/Public/NewsDetail/NewsDetailSkeleton";
import NewsHeader from "@/features/articles/components/Public/NewsDetail/NewsHeader";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthChecker } from "@/features/auth/hooks/useAuthChecker";
import { shareArticle } from "@/lib/shareHandler";
import { Bookmark, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
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
  const handleBookmark=()=>{
  if (!checkAuth("Please login to save this article")) return;
bookmarkPublicArticle.mutate(Data?.article?.id, {
  onSuccess: (res) => {
    toast.success(res?.message || "Saved successfully");
  },
  onError: (err) => {
    toast.error(err?.message || "Something went wrong");
}})
  }
  return (
    <div className="flex justify-center w-full py-10">
      {isLoading ? (
        <NewsDetailSkeleton />
      ) : (
        Data && (
          <div className="relative flex flex-col justify-center gap-3 w-full">
            <NewsHeader Data={Data} />
            <NewsContent Data={Data} />
            <div className="absolute -left-20 top-0 h-[300px] w-[50px] ">
              <div className="sticky top-20 flex flex-col gap-3 py-5 items-center text-black">
                <div>
                  <Bookmark size={30} className={`cursor-pointer text-yellow-300 ${Data?.article?.user_interactions?.has_bookmarked===true?"fill-yellow-300":""}`}
                   onClick={()=>handleBookmark()}/>
                </div>
                <div className="flex flex-col items-center w-full justify-center">
                  <MessageCircle />
                  <p className="font-bold text-lg">
                    {Data?.article?.comment_count}
                  </p>
                  <p className="uppercase tracking-wider text-xs font-bold text-gray-400">
                    Comments
                  </p>
                </div>
                <div className="flex flex-col items-center w-full justify-center">
                  <p className="font-bold text-lg">
                    {Data?.article?.share_count}
                  </p>
                  <p className="uppercase tracking-wider text-xs font-bold text-gray-400">
                    shares
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {socialMedias?.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => handleSocialShare(media)}
                      className="cursor-pointer"
                    >
                      <i
                        className={`${media?.icon_class} text-2xl `}
                        style={{ color: media?.color }}
                      ></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <PopupAdvertisement
        advertisements={Data?.advertisements?.popup}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
       <UserLogin
            open={open}
            onOpenChange={setOpen}
          />
    </div>
  );
}

export default NewsDetail;
