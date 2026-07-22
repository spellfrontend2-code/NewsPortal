import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { formatDateTime } from "@/lib/formatDateTime";
import NewsList from "@/pages/Public/News/NewsList";
import { useEffect, useState } from "react";

function LatestNewsList() {
  // const fromDate = new Date();
  // const toDate = new Date();
  // fromDate.setDate(fromDate.getDate() - 3);
  // toDate.setDate(toDate.getDate() - 2);
  // const to_date = formatDateTime(toDate);
  // const from_date = formatDateTime(fromDate);
  const articleHook = useArticlesHooks();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 12 });
  const { data: allArticles, isLoading } = articleHook.useFetchPublicLatestArticles({
    page: pagination?.pageIndex + 1,
    per_page: pagination?.pageSize,
  });
  const articles =
    allArticles?.data?.map((article: any) => article?.data) ?? [];
   useEffect(() => {
    console.log(pagination);
  }, [pagination]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full ">
      <NewsList
        articles={articles}
        page_headline="Latest News"
        pagination={pagination}
        setPagination={setPagination}
        lastPage={allArticles?.pagination?.last_page}
        isLoading={isLoading}
      />
    </div>
  );
}

export default LatestNewsList;
