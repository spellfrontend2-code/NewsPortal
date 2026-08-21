import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { useArticleView } from "@/features/articles/hooks/useArticleView";
import { ChevronRight } from "lucide-react";

function BreakingNewsTicker() {
  const articleHook = useArticlesHooks();
  const { data: latestData } = articleHook.useFetchPublicLatestArticles({
    page: 1,
    per_page: 8,
  });
  const navigate = useNavigate();
  const { viewPublicArticle } = useArticleView();

  const articles =
    latestData?.data
      ?.filter((a: any) => a?.type === "article")
      .map((a: any) => a?.data) ?? [];

  if (articles.length === 0) return null;

  const tickerItems = [...articles, ...articles]; // duplicate for seamless loop

  return (
    <div className="w-full bg-[var(--color-public-bg-main)] border-b border-[var(--color-public-border-main)] flex items-center overflow-hidden h-9">
      {/* Label */}
      <div className="shrink-0 flex items-center self-stretch gap-2 bg-red-600 px-3 text-white text-[11px] font-black uppercase tracking-widest z-10 shadow-[2px_0_8px_rgba(0,0,0,0.15)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        Breaking
      </div>

      {/* Scrolling ticker */}
      <div className="relative flex-1 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap gap-0">
          {tickerItems.map((article: any, i: number) => (
            <button
              key={`${article?.id}-${i}`}
              className="inline-flex items-center  px-5 text-[12px] font-semibold text-[var(--color-public-text-secondary)] hover:text-[var(--color-public-text-accent)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              onClick={() => {
                viewPublicArticle(article?.id);
                navigate(`/news/${article?.slug}`);
              }}
            >
<ChevronRight className="w-4 h-4 text-[var(--color-public-text-danger)]" strokeWidth={4}/>
              {article?.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsTicker;
