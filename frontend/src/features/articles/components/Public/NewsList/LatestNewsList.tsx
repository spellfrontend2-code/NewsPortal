import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import NewsList from "@/pages/Public/News/NewsList";
import { useState } from "react";
import NewsListSkeleton from "./NewsListSkeleton";

function LatestNewsList() {
  const articleHook = useArticlesHooks();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: allArticles, isLoading } = articleHook.useFetchPublicLatestArticles({
    page: pagination?.pageIndex + 1,
    per_page: pagination?.pageSize,
  });
const filteredArticles =
  allArticles?.data?.filter((article: any) => article?.type === "article") ?? [];
const articles=filteredArticles.map((article: any) => article?.data)
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full ">
      {isLoading ? <NewsListSkeleton /> : <NewsList
        articles={articles}
        page_headline="Latest News"
        pagination={pagination}
        setPagination={setPagination}
        lastPage={allArticles?.pagination?.last_page}
        isLoading={isLoading}
      />}
    </div>
  );
}

export default LatestNewsList;
