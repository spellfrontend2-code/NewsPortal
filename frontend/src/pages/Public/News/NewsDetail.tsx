import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { Clock, UserCircle } from "lucide-react";
import { useParams } from "react-router-dom";

function NewsDetail() {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } =
    articleHook.useFetchPublicSingleArticle(slug);
  const articleData = articles?.data ?? [];
  return (
    <div className="p-10 flex justify-center w-full ">
      {isLoading?<p>Loading...</p>:<div className="flex flex-col justify-center items-center w-[80%]">
        <div className="flex flex-col gap-3 ">
          <p className="text-5xl h-[1/4]  font-bold text-[var(--color-public-newsText)] ">
            {articleData?.title}
          </p>
          <p className="text-[rgb(var(--color-public-newsText-rgb)/0.6)]">{articleData?.excerpt}</p>
          <div className="flex w-[25%] h-[1/4] gap-5 items-center text-[rgb(var(--color-public-newsText-rgb)/0.9)]">
            <p className="flex items-center gap-1">
              <UserCircle size={20} />
              articleData?.author?.name
            </p>
            <p className="flex items-center gap-1">
              <Clock size={20} />
              {articleData?.read_time_minutes} min
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full h-full mt-5">
          <div className="flex w-full h-full gap-3 ">
            <div className="w-[70%] flex flex-col gap-3 ">
                <div className="w-full ">
              {articleData?.media_type === "image" ? (
                <img
                  src={articleData?.featured_image}
                  alt={articleData?.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : articleData?.media_type === "video" ? (
                <video
                  src={articleData?.video_url}
                  controls
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <video
                  src={articleData?.youtube_url}
                  controls
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
            <div>
                {articleData?.content}
            </div>
            <div className="flex gap-3">
                {
                    articleData?.tags?.map((tag)=>{
                       return <span className="p-1 text-sm rounded-2xl border border-[rgb(var(--color-public-newsText-rgb)/0.3)] bg-[rgb(var(--color-public-newsText-rgb)/0.3)]">{tag?.name}</span>
                    })
                }
            </div>
            </div>
            <div className="w-[30%] flex flex-col gap-3 ">
                Advertisements
                </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default NewsDetail;
