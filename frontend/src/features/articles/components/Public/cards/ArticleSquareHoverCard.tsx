import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleSquareHoverCard({ article }: any) {
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();
  return (
    <div
      className="relative h-full w-full group overflow-hidden cursor-pointer rounded-md border border-slate-200/80 shadow-md bg-slate-950"
      onClick={() => {
        viewPublicArticle(article?.id);
        navigate(`/news/${article?.slug}`);
      }}
    >
      <img
        src={article?.featured_image}
        alt={article?.title}
        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75"
      />
      <div className="bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent absolute inset-0 w-full h-full" />

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2.5">
        <p className=" font-black text-xl md:text-2xl text-white tracking-tight leading-tight transition-colors duration-200 group-hover:text-[var(--color-public-text-lightest)]">
          {article?.title}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
          <Clock size={12} className="text-slate-405" />
          <span>{article?.published_at?.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleSquareHoverCard;
