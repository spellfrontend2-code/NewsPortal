import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArticleRectangleCard({ article, type = "view" }: any) {
  const navigate = useNavigate();
  return (
    <div className={`flex h-full w-full group overflow-hidden cursor-pointer   rounded-lg`} onClick={()=>navigate(`/news/${article?.slug}`)}>
      <img
        src={article?.media_type === "image" ?  article?.featured_image:article?.thumbnail}
        alt={article?.title}
        className="h-full w-[40%] object-cover "
      />

      <div className={`${type==="detailed"?"bg-slate-200/60 text-5xl p-10":"text-sm bg-white p-5"} w-[60%] font-bold text-[var(--color-public-newsText)] p-3 flex flex-col justify-center `}>
        <p className="group-hover:text-[var(--color-public-newsText-hover)]">
          {article?.title}
        </p>

        {type === "detailed" ? (
          <p className="mt-2 text-lg line-clamp-2 group-hover:text-[rgb(var(--color-public-newsText-rgb)/0.6)]  font-normal">
            {article?.excerpt}
          </p>
        ):<p className="flex items-center gap-2 font-normal text-[rgb(var(--color-public-newsText-rgb)/0.6)] text-sm"><Clock strokeWidth={1} size={15} />{article.read_time_minutes} min</p>}
      </div>
    </div>
  );
}

export default ArticleRectangleCard;