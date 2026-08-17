import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
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

  const rawItems = articles?.data ?? [];

  // Separate and handle both articles and mixed ads in order
  const navigate = useNavigate();
  const handleNavigation = (slug: any) => {
    navigate(`/news/${slug}`);
  };
  const { viewPublicArticle } = useArticleView();

  return (
    <div className="flex flex-col gap-8 h-full w-full justify-center items-center">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <HeadlineSkeleton key={index} />
          ))
        : rawItems.map((item: any, idx: number) => {
            if (item?.type === "advertisement") {
              const ad = item?.data;

              return (
                <div
                  key={`ad-${ad?.id ?? idx}-${idx}`}
                  className="flex w-full justify-center overflow-hidden rounded-md"
                  style={
                    {
                      "--ad-width": `${ad?.width}px`,
                      "--ad-height": `${ad?.height}px`,
                      "--ad-mobile-width": `${ad?.mobile_width}px`,
                      "--ad-mobile-height": `${ad?.mobile_height}px`,
                    } as React.CSSProperties
                  }
                >
             
                    <BannerAdvertisement item={item} />
                </div>
              );
            }

            const article = item?.data || item;
            if (!article || article.is_headline_news === false) return null;

            return (
              <div
                key={article?.id ?? idx}
                className="w-full flex flex-col justify-center items-center gap-3 group cursor-pointer"
                onClick={() => {
                  viewPublicArticle(article?.id);
                  handleNavigation(article?.slug);
                }}
              >
                {(article?.headline?.display_type === "image" ||
                  article?.headline?.display_type === "mixed" ||
                  article?.headline?.display_type === "title_only") && (
                  <>
                    {(article?.headline?.display_type === "title_only" ||
                      article?.headline?.display_type === "mixed") && (
                      <>
                        <div className="flex flex-col items-center">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-[var(--color-public-text-main)] transition-colors duration-250 group-hover:text-[var(--color-public-text-accent)] max-w-6xl px-4">
                            {article.title}
                          </h2>
                        </div>

                        <div className="flex gap-4 items-center text-sm font-semibold text-[var(--color-public-text-muted)]">
                          <p className="flex items-center gap-1.5">
                            {article?.author?.image && (
                              <img
                                src={article?.author?.image}
                                alt={article?.author?.name}
                                className="h-6 w-6 rounded-full object-cover border border-[var(--color-public-border-main)]"
                              />
                            )}
                            <span className="text-slate-500">
                              {article?.author?.name}
                            </span>
                          </p>
                          <span className="text-slate-500">•</span>
                          <div className="flex items-center text-sm gap-2 text-slate-500">
                            <Clock
                              size={15}
                              className="text-slate-500"
                              strokeWidth={3}
                            />
                            <span className="font-semibold tracking-wider uppercase">
                              {article?.published_at?.split("T")[0]}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {(article?.headline?.display_type === "image" ||
                      article?.headline?.display_type === "mixed") && (
                      <div className="relative w-full rounded-md overflow-hidden border border-[var(--color-public-border-light)] shadow-md bg-[var(--color-public-bg-secondary)] aspect-[21/12] max-h-[600px]">
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
            );
          })}
    </div>
  );
}

export default Headline;
