import { useNavigate } from "react-router-dom";

function ArticleSquareHoverCard({ article }) {
  const navigate = useNavigate();
  return (
    <div className="relative h-full w-full group overflow-hidden cursor-pointer" onClick={()=>navigate(`/news/${article?.slug}`)}>
      <img src={article?.featured_image} className="h-full w-full group-hover:scale-110 transition-all duration-300" />
      <div className="bg-gradient-to-t from-[rgb(var(--color-public-dark-rgb)/0.8)] to-transparent absolute top-0 left-0 h-full w-full" />
      <div className="absolute bottom-3 left-3 font-bold text-[var(--color-public-navtext)] group-hover:text-[var(--color-public-newsText-hover)]">
        {article?.title}
      </div>
    </div>
  );
}

export default ArticleSquareHoverCard;
