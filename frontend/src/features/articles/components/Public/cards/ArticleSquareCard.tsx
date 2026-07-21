import { useNavigate } from "react-router-dom";

function ArticleSquareCard({article}:any)
{
    const navigate = useNavigate();
    return (
    <div className="flex flex-col h-full w-full gap-2 group overflow-hidden cursor-pointer" onClick={()=>navigate(`/news/${article?.slug}`)}>
      <img src={article?.featured_image || article?.thumbnail} className="h-2/3 w-full" />
      <div className="px-5 h-1/3 font-bold text-[var(--color-public-newsText)] group-hover:text-[var(--color-public-newsText-hover)]">
        {article?.title}
      </div>
    </div>)
}
export default ArticleSquareCard