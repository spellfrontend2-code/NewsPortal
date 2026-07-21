import NewsContent from "@/features/articles/components/Public/NewsDetail/NewsContent";
import  NewsDetailSkeleton from "@/features/articles/components/Public/NewsDetail/NewsDetailSkeleton";
import NewsHeader from "@/features/articles/components/Public/NewsDetail/NewsHeader";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useParams } from "react-router-dom";

function NewsDetail() {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } =
    articleHook.useFetchPublicSingleArticle(slug);
   const Data=articles?.data??[]
  return (
    <div className="flex justify-center w-full">
      {isLoading?
      <NewsDetailSkeleton/>:
      <div className="flex flex-col justify-center gap-3 w-full">
      <NewsHeader Data={Data}/>
       <NewsContent Data={Data} />
      </div>}
    </div>
  );
}

export default NewsDetail;
