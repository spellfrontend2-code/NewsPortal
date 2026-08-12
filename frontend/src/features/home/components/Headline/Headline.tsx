import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeadlineSkeleton from "./HeadlineSkeleton";
import { useArticleView } from "@/features/articles/hooks/useArticleView";

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
  const {viewPublicArticle}=useArticleView()
  return (
    <div className="flex flex-col gap-8 h-full w-full justify-center items-center">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <HeadlineSkeleton key={index} />
          ))
        : HeadlineNews?.map((article: any, idx: number) => (
            <div
              key={article?.id ?? idx}
              className="w-full flex flex-col justify-center items-center gap-6 group cursor-pointer"
              onClick={() =>{viewPublicArticle(article?.id); handleNavigation(article?.slug)}}
            >
              {(article?.headline?.display_type === "image" ||
                article?.headline?.display_type === "mixed" ||
                article?.headline?.display_type === "title_only") && (
                <>
                  {(article?.headline?.display_type === "title_only" ||
                    article?.headline?.display_type === "mixed") && (
                    <>
                      <div className="flex flex-col items-center gap-3">
                      
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-[var(--color-public-text-main)] transition-colors duration-250 group-hover:text-[var(--color-public-text-accent)] leading-[1.15] max-w-4xl px-4">
                          {article.title}
                        </h2>
                      </div>

                      <div className="flex gap-4 items-center text-xs font-semibold text-[var(--color-public-text-muted)]">
                        <p className="flex items-center gap-1.5">
                          <img
                            src={article?.author?.image}
                            alt={article?.author?.name}
                            className="h-6 w-6 rounded-full object-cover border border-[var(--color-public-border-main)]"
                          />
                          <span className="text-[var(--color-public-text-tertiary)]">{article?.author?.name}</span>
                        </p>
                        <span className="text-[var(--color-public-text-tertiary)]">•</span>
                         <div className="flex items-center gap-2 text-[var(--color-public-text-tertiary)] ">
          <Clock size={15} className="text-[var(--color-public-text-tertiary)]" />
          <span className="font-semibold text-xs tracking-wider uppercase">{article?.published_at?.split("T")[0]}</span>
        </div>
                      </div>
                    </>
                  )}
                  {(article?.headline?.display_type === "image" ||
                    article?.headline?.display_type === "mixed") && (
                    <div className="relative w-full rounded-md overflow-hidden border border-[var(--color-public-border-light)] shadow-md bg-[var(--color-public-bg-secondary)] aspect-[21/10] max-h-[500px]">
                      <img
                        src={article?.featured_image || article?.thumbnail}
                        alt={article?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  )}
                </>
              )}
              <hr className="w-full border-t border-[var(--color-public-border-main)] mt-2" />
            </div>
          ))}
    </div>
  );
}

export default Headline;
