import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import NewsList from "@/pages/Public/News/NewsList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewsListSkeleton from "./NewsListSkeleton";

function CategoryBasedNewsList({categorySlug}:{categorySlug?:string}) {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
const defaultPageSize = categorySlug ? 4 : 12;

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
    ?.filter((item: any) => item.type === "article")
    .map((item: any) => item.data) ?? [];  return (
    <div className="py-10">
     {isLoading ? <NewsListSkeleton show={categorySlug?"list":"all"}/> : <NewsList
          articles={articles}
          page_headline={categorySlug?categorySlug:slug}
          pagination={pagination}
          setPagination={setPagination}
          lastPage={allArticles?.pagination?.last_page}
          show={categorySlug?"list":"all"}
        />}
    </div>
  );
}

export default CategoryBasedNewsList;
