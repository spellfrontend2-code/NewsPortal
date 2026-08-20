import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import ArticleView from "@/features/articles/components/Admin/ArticleView";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useAdminPagination } from "@/hooks/useAdminPagination";

function Articles() {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  const { PERMISSIONS, isLoading: permissionLoading } = usePermissionStore();
  const useArticlesHook = useArticlesHooks();
  const { page, pageSize, pagination, setPagination } = useAdminPagination({
    defaultPageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useArticlesHook.useFetchArticles({
    page,
    per_page: pageSize,
    search,
    status,
  });
  const articles = data?.data ?? [];
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteArticle = useArticlesHook.useDeleteArticles();
  const [viewOpen, setViewOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
  const statuses = [
    { name: "All", value: "" },
    { name: "Draft", value: "draft" },
    { name: "In Review", value: "review" },
    { name: "Published", value: "published" },
    { name: "Archived", value: "archived" },
    { name: "Scheduled", value: "scheduled" },
    { name: "Rejected", value: "rejected" },
    { name: "Pending", value: "pending" },
  ];
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
      // "published_at",
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
      "is_headline_news",
    ],
    (action, row) => {
      setSelectedArticle(row);
      switch (action) {
        case "delete":
          setDeleteOpen(true);
          break;
        case "edit":
          navigate(`/admin/articles/${row.slug || row.id}/edit`, {
            state: { article: row },
          });
          break;
        case "view":
          setViewOpen(true);
          break;
      }
    },
    undefined,
    undefined,
    PERMISSIONS?.ARTICLE
  );

  if (error) {
    toast.error(error?.message);
  }

  return (
    <div className="w-full h-full overflow-y-auto px-20 py-10 flex flex-col gap-5">
      {viewOpen ? (
        <ArticleView article={selectedArticle} setViewOpen={setViewOpen} />
      ) : (
        <>
          <div className="flex justify-between items-end rounded-xl">
            <div className="flex flex-col text-gray-800">
              <p className="text-3xl font-bold">Articles</p>
              <p className="text-gray-500">Manage your articles</p>
            </div>
            {hasPermission(PERMISSIONS?.ARTICLE?.CREATE?.name) && (
              <Button
                type="button"
                variant="submit"
                className="h-10 flex items-center gap-2"
                onClick={() => navigate("/admin/articles/create")}
              >
                <Plus />
                Add Article
              </Button>
            )}
          </div>

          {error ? (
            <p>No Articles Found.</p>
          ) : (
            <DataTable
              data={articles}
              columns={columns}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={data?.pagination?.last_page}
              sorting={sorting}
              setSorting={setSorting}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
              placeholder="Articles"
              statuses={statuses}
              status={status}
              setStatus={setStatus}
              permission={PERMISSIONS?.ARTICLE?.VIEW?.name}
              permissionLoading={permissionLoading}
            />
          )}
        </>
      )}

      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedArticle}
        deleteField={deleteArticle}
      />
    </div>
  );
}
export default Articles;
