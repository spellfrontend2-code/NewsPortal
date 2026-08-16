import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleSquareCard({
  article,
  titleClassName,
}: {
  article: any;
  titleClassName?: string;
}) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();

  const imageSrc =
    article?.featured_image || article?.thumbnail || "/placeholder-news.jpg";
  const publishedDate = article?.published_at?.split("T")[0] || "";

  return (
    <article
      className="@container group flex flex-col h-full w-full cursor-pointer bg-transparent overflow-hidden transition-all duration-200"
      onClick={() => {
        if (article?.id) viewPublicArticle(article.id);
        if (article?.slug) navigate(`/news/${article.slug}`);
      }}
    >
      {/* Image Container */}
      <div className="relative h-[72%] sm:h-[75%] w-full overflow-hidden rounded-md bg-slate-100 shrink-0">
        <img
          src={imageSrc}
          alt={article?.title || "News article"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-95"
        />
      </div>

      {/* Content */}
      <div className="h-[28%] sm:h-[25%] pt-2.5 pb-1 flex flex-col  flex-1 gap-1.5 min-w-0">
        <h3
          className={`font-bold text-slate-900 line-clamp-2 leading-snug transition-colors duration-200 group-hover:text-[var(--color-public-text-accent)] ${
            titleClassName || "text-base sm:text-lg md:text-xl"
          }`}
        >
          {article?.title}
        </h3>

        {/* Metadata Footer */}
        <div className="flex items-center gap-2 text-xs sm:text-sm  font-medium text-slate-500">
          {article?.author?.name && (
            <>
              <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                {article.author.name}
              </span>
              <span className="text-slate-300">•</span>
            </>
          )}
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleSquareCard;

