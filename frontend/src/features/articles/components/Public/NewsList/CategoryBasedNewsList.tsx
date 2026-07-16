import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import NewsList from "@/pages/Public/News/NewsList";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CategoryBasedNewsList() {
  const { slug } = useParams();
  console.log(slug);
  const articleHook = useArticlesHooks();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 2 });
  const { data: allArticles, isLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: pagination?.pageIndex + 1,
      per_page: pagination?.pageSize,
      slug: slug,
    });
  const articles = allArticles?.data ?? [];
  
  return (
    <div className="">
        <NewsList
          articles={articles}
          page_headline={articles[0]?.categories[0]?.name}
          pagination={pagination}
          setPagination={setPagination}
          lastPage={allArticles?.pagination?.last_page}
          isLoading={isLoading}
        />
    </div>
  );
}

export default CategoryBasedNewsList;
