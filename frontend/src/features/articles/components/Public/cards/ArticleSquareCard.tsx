import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleSquareCard({ article }: any) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();
  return (
    <div
      className="flex flex-col h-full w-full group overflow-hidden cursor-pointer rounded-md border border-slate-100 bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300"
      onClick={() => {
        viewPublicArticle(article?.id);
        navigate(`/news/${article?.slug}`);
      }}
    >
      <div className="h-[70%] w-full overflow-hidden relative">
        <img
          src={article?.featured_image || article?.thumbnail}
          alt={article?.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 gap-2 bg-white">
        <p className="font-bold text-slate-900 text-base md:text-lg line-clamp-2 leading-snug transition-colors duration-200 group-hover:text-[var(--color-public-text-accent)]">
          {article?.title}
        </p>

        <div className="flex items-center text-xs  gap-1.5 font-semibold uppercase tracking-wider text-slate-400">
          <Clock size={12} strokeWidth={3}/>
          <span>{article?.published_at?.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleSquareCard;