import { Clock } from "lucide-react";

function ArticleRectangleCard({ article, type = "view" }: any) {
  return (
    <div className={`flex h-[200px] w-[400px] group overflow-hidden cursor-pointer border border-slate-200 ${type==="detailed"?"bg-slate-200":"bg-white"} rounded-lg`}>
      <img
        src={article.featured_image}
        alt={article.title}
        className="h-full w-[50%] object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className=" min-w-0 font-bold text-[var(--color-public-newsText)] text-2xl p-3 flex flex-col justify-between my-5">
        <p className="group-hover:text-[var(--color-public-newsText-hover)]">
          {article.title}
        </p>

        {type === "detailed" ? (
          <p className="mt-2 line-clamp-5 group-hover:text-[rgb(var(--color-public-newsText-rgb)/0.6)]  font-normal">
            {article.excerpt}
          </p>
        ):<p className="flex items-center gap-2 font-normal text-[rgb(var(--color-public-newsText-rgb)/0.6)] text-sm"><Clock strokeWidth={1} size={15} />{article.read_time_minutes} min</p>}
      </div>
    </div>
  );
}

export default ArticleRectangleCard;