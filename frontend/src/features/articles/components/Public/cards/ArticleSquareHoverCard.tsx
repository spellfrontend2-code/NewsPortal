import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleSquareHoverCard({ article, hideMeta = false, titleClassName }: any) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();
  const imageSrc =
    article?.featured_image || article?.thumbnail || "/placeholder-news.jpg";
  const publishedDate = article?.published_at?.split("T")[0] || "";

  return (
    <article
      className="@container relative h-full w-full group overflow-hidden cursor-pointer rounded-md bg-slate-950 shadow-md"
      onClick={() => {
        if (article?.id) viewPublicArticle(article.id);
        if (article?.slug) navigate(`/news/${article.slug}`);
      }}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={article?.title || "Lead news"}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />


      {/* Headline & Meta Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2.5 z-10">
        <h2 className={`font-bold text-white tracking-tight leading-tight transition-colors duration-200 group-hover:text-[var(--color-public-text-lightest)] line-clamp-3 drop-shadow ${titleClassName || "text-xl sm:text-2xl md:text-3xl lg:text-4xl @md:text-2xl @lg:text-3xl @xl:text-4xl"}`}>
          {article?.title}
        </h2>

        {!hideMeta && (
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
        )}
      </div>
    </article>
  );
}

export default ArticleSquareHoverCard;

