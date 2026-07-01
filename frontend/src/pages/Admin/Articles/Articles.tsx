import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import AddArticle from "@/features/articles/components/AddArticle";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { generateColumns } from "@/lib/generateColumns";
import { Delete, Plus } from "lucide-react";
import { useState } from "react";

function Articles() {
  const useArticlesHook = useArticlesHooks();
  const { data, isLoading } = useArticlesHook.useFetchArticles();
  const articles = data?.data ?? [];
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteArticle = useArticlesHook.useDeleteArticles();
  const [addOpen, setAddOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = generateColumns(
    articles,
    [
      "id",
      "author",
      "slug",
      "youtube_embed_url",
      "video_url",
      "content",
      "excerpt",
      "media_type",
      "featured_image",
      "thumbnail",
      "youtube_url",
      "media_caption",
      "scheduled_for",
      "published_at",
      "meta_title",
      "meta_description",
      "canonical_url",
      "target_countries",
      "city_focus",
      "view_count",
      "share_count",
      "comment_count",
      "bookmark_count",
      "likes_count",
      "dislikes_count",
      "user_interactions",
      "read_time_minutes",
      "categories",
      "tags",
      "comments",
      "advertisements",
      "created_at",
    ],
    (action,row) => {
        setSelectedArticle(row)
        switch(action){
            case "delete":
                setDeleteOpen(true)
        }
    },
  );
  return (
    <div className="w-full h-full p-20 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-4xl font-bold text-[var(--color-primary)] text-center">
          Articles
        </p>
        <Button variant="submit" className="mt-5" onClick={() => {setAddOpen(true)}}>
          <Plus />
          Add Article
        </Button>
      </div>
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        articles.length > 0 ?<DataTable data={articles} columns={columns} pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}/>:<p>No Articles Found.</p>
      )}
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedArticle}
        deleteField={deleteArticle}
      />
      <AddArticle open={addOpen} setOpen={setAddOpen}/>
    </div>
  );
}
export default Articles;
