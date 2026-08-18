import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleRectangleCard({ article, type = "view" }: any) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();
  const imageSrc =
    article?.media_type === "image"
      ? article?.featured_image
      : article?.featured_image || article?.thumbnail || "/placeholder-news.jpg";
  const publishedDate = article?.published_at?.split("T")[0] || "";

  // Detailed Card (Featured Top Banner Variant)
  if (type === "detailed") {
    return (
      <article
        className="group flex flex-col md:flex-row h-full w-full cursor-pointer overflow-hidden rounded-md bg-white transition-all duration-300"
        onClick={() => {
          if (article?.id) viewPublicArticle(article.id);
          if (article?.slug) navigate(`/news/${article.slug}`);
        }}
      >
        {/* Balanced 50% Image Container */}
        <div className="md:w-1/2 w-full h-48 md:h-full overflow-hidden relative bg-slate-100 shrink-0 rounded-md">
          <img
            src={imageSrc}
            alt={article?.title || "Featured news"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-8 flex flex-col justify-center gap-2 sm:gap-3 bg-slate-50/40 flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-tight text-slate-900 transition-colors duration-200 group-hover:text-[var(--color-public-text-accent)] line-clamp-2 md:line-clamp-3">
            {article?.title}
          </h2>

          {article?.excerpt && (
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
          )}

     {/* <div className="flex gap-4 items-center text-sm font-semibold text-[var(--color-public-text-muted)]">
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
                        </div> */}
        </div>
      </article>
    );
  }

  // Standard Compact List Card (Consistent 4:3 Row Style)
  return (
    <article
      className=" group flex h-full w-full cursor-pointer items-center gap-3 border-b border-slate-100 last:border-b-0 overflow-hidden transition-all duration-200 py-1"
      onClick={() => {
        if (article?.id) viewPublicArticle(article.id);
        if (article?.slug) navigate(`/news/${article.slug}`);
      }}
    >
      {/* Consistent 4:3 Thumbnail matching container height */}
      <div className="h-full aspect-[4/3] w-[120px] sm:w-[160px] shrink-0 overflow-hidden rounded-md bg-slate-100 relative">
        <img
          src={imageSrc}
          alt={article?.title || "News thumbnail"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Area with Dynamic Typography Scaling */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-center py-1">
        <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 line-clamp-2 leading-snug transition-colors duration-200 group-hover:text-[var(--color-public-text-accent)]">
          {article?.title}
        </h4>
{/* 
       <div className="flex gap-4 items-center text-xs font-semibold text-[var(--color-public-text-muted)]">
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
                          <div className="flex items-center text-xs gap-2 text-slate-500">
                            <Clock
                              size={15}
                              className="text-slate-500"
                              strokeWidth={3}
                            />
                            <span className="font-semibold tracking-wider uppercase">
                              {article?.published_at?.split("T")[0]}
                            </span>
                          </div>
                        </div> */}
      </div>
    </article>
  );
}

export default ArticleRectangleCard;

