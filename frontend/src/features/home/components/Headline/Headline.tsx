import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeadlineSkeleton from "./HeadlineSkeleton";

function Headline() {
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } = articleHook.useFetchHeadlineArticles({
    page: 1,
    per_page: 10,
  });
  const allHeadlines=articles?.data?.map((article: any) => article?.data);
  const HeadlineNews = allHeadlines
  ?.filter((article: any) => article.is_headline_news === true)
  ?.sort(
    (a: any, b: any) =>
      (a.headline?.order ?? 0) - (b.headline?.order ?? 0)
  );
  const navigate=useNavigate()
  const handleNavigation = (slug: any) => {
  navigate(`/news/${slug}`);
  };
  return (
    <div className="flex flex-col gap-3 h-full w-full justify-center items-center ">
      {isLoading
  ? Array.from({ length: 3 }).map((_, index) => (
      <HeadlineSkeleton key={index} />
    ))
  : HeadlineNews?.map ((article: any) => (
        <div className=" w-full  h-full flex flex-col justify-center items-center gap-2 "  onClick={() => handleNavigation(article?.slug)}>
          {(article?.headline?.display_type === "title_only" || article?.headline?.display_type === "mixed") && <><p className="text-5xl h-[1/4]  font-bold text-center text-[var(--color-public-newsText)] hover:text-[var(--color-public-newsText-hover)] cursor-pointer">
            {article.title}
          </p>
          <div className="flex w-[25%] h-[1/4] gap-5 items-center text-[rgb(var(--color-public-newsText-rgb)/0.6)]">
            <p className="flex items-center gap-1">
              <img src={article?.author?.image} className="h-6 w-7 rounded-full object-fill border" />
             { article?.author?.name}
            </p>
            <p className="flex items-center gap-1">
              <Clock size={20} />
              {article.read_time_minutes} min
            </p>
          </div></>}
          <div className="relative w-full h-[50%] rounded-lg  cursor-pointer overflow-hidden">
              <img
                src={article?.featured_image || article?.thumbnail}
                alt={article?.title}
                className="w-full h-[500px] object-cover rounded-lg overflow-hidden "
              />
          </div>
          <hr className="w-full border-t border-gray-300" />
        </div>
      ))}
    </div>
  );
}

export default Headline;
