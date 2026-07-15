import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { Clock, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Headline() {
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } = articleHook.useFetchPublicArticles({
    page: 1,
    per_page: 5,
  });
  const HeadlineNews = articles?.data?.filter(
    (article: any) => article.is_headline_news === true,
  );
  const navigate=useNavigate()
  const handleNavigation = (slug: any) => {
  navigate(`/news/${slug}`);
  };
  return (
    <div className="flex flex-col gap-3  w-full h-full justify-center items-center mt-10">
      {HeadlineNews?.map((article: any) => (
        <div className=" w-[70%]  h-full flex flex-col justify-center items-center gap-2 "  onClick={() => handleNavigation(article?.slug)}>
          <p className="text-5xl h-[1/4]  font-bold text-center text-[var(--color-public-newsText)] hover:text-[var(--color-public-newsText-hover)] cursor-pointer">
            {article.title}
          </p>
          <div className="flex w-[25%] h-[1/4] gap-5 items-center text-[rgb(var(--color-public-newsText-rgb)/0.6)]">
            <p className="flex items-center gap-1">
              <UserCircle size={20} />
              article?.author?.name
            </p>
            <p className="flex items-center gap-1">
              <Clock size={20} />
              {article.read_time_minutes} min
            </p>
          </div>
          <div className="relative w-full h-[50%] rounded-lg  cursor-pointer overflow-hidden">
            {article?.headline?.display_type === "image" && (
              <img
                src={article?.featured_image}
                alt={article?.title}
                className="w-full h-[500px] object-cover rounded-lg overflow-hidden "
              />
            )}
          </div>
          <hr className="w-full border-t border-gray-300" />
        </div>
      ))}
    </div>
  );
}

export default Headline;
