import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import NewsList from "@/pages/Public/News/NewsList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewsListSkeleton from "./NewsListSkeleton";
import { Newspaper } from "lucide-react";

function CategoryBasedNewsList({categorySlug}:{categorySlug?:string}) {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
const defaultPageSize = categorySlug ? 3 : 12;

const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: defaultPageSize,
});  const { data: allArticles,isLoading } =articleHook.useFetchPublicArticlesByCategory({
      page: pagination?.pageIndex + 1,
      per_page: pagination?.pageSize,
      slug: categorySlug?categorySlug:slug,
    });
const articles =
  allArticles?.data
    ?.filter((item:any) => item.type === "article")
    .map((item: any) => item.data) ?? [];
const name=articles[0]?.categories?.filter((category)=>slug===category.slug || categorySlug===category.slug)[0]?.name
  if (!isLoading && articles.length === 0 && categorySlug) return null;

  return (
    <div className={categorySlug ? " pb-3 border-b border-slate-100 last:border-b-0" : ""}>
      {isLoading ? (
        <NewsListSkeleton show={categorySlug ? "list" : "all"} />
      ) : 
        articles?.length>0 ? <NewsList
          articles={articles}
          page_headline={ name}
          pagination={pagination}
          setPagination={setPagination}
          lastPage={allArticles?.pagination?.last_page}
          show={categorySlug ? "list" : "all"}
        />:
        ( <div className="flex flex-col items-center justify-center py-12 px-4"> 
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100"> 
          <Newspaper className="w-8 h-8 text-slate-400" /> 
          </div> 
          <h3 className="text-lg font-semibold text-slate-700"> No news available </h3> 
          <p className="mt-1 text-sm text-slate-500 text-center max-w-sm"> 
            There are currently no news articles available in this category. Please check back later.
             </p> 
             </div> 
      )}
    </div>
  );
}

export default CategoryBasedNewsList;
