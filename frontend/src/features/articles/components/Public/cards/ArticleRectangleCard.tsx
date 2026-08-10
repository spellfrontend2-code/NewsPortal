import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleRectangleCard({ article, type = "view" }: any) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();
  return (
    <div
      className="flex h-full w-full group overflow-hidden cursor-pointer items-stretch rounded-2xl bg-white border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300"
      onClick={() => {
        viewPublicArticle(article?.id);
        navigate(`/news/${article?.slug}`);
      }}
    >
      <div className="w-[55%] overflow-hidden relative">
        <img
          src={article?.media_type === "image" ? article?.featured_image : article?.thumbnail}
          alt={article?.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={`${type === "detailed"
          ? "bg-slate-50/50 p-6 md:p-8"
          : "p-4"
          } w-[45%] flex flex-col justify-center gap-2`}
      >
        <p
          className={`${type === "detailed"
            ? "text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-slate-900"
            : "text-sm font-bold text-slate-900 line-clamp-2 leading-snug"
            } transition-colors duration-250 group-hover:text-[var(--color-public-newsText-hover)]`}
        >
          {article?.title}
        </p>

        {type === "detailed" ? (
          <>
            {article?.excerpt && (
              <p className="text-sm text-slate-500 font-normal leading-relaxed line-clamp-2 mt-1">
                {article?.excerpt}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-450 mt-1">
              <Clock size={14} />
              <span>{article?.published_at?.split("T")[0]}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
            <Clock size={12} />
            <span>{article?.published_at?.split("T")[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleRectangleCard;