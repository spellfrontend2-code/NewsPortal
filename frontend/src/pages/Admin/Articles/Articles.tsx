import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddArticle from "@/features/articles/components/AddArticle";
import ArticleView from "@/features/articles/components/ArticleView";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import {  useState } from "react";
import { toast } from "sonner";

function Articles() {
  const useArticlesHook = useArticlesHooks();
    const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search,setSearch]=useState("")
  const [status, setStatus] = useState(" ");

  const { data, isLoading,error } = useArticlesHook.useFetchArticles({  page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,search,status});
  const articles = data?.data ?? [];
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteArticle = useArticlesHook.useDeleteArticles();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
const [viewOpen, setViewOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
const statuses = [
  {name:"All",value:""},
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
                break;
            case "edit":
                setEditOpen(true)
                break
            case "view":
                setViewOpen(true)
                break
        }
    },
  );
  if (error) {
 toast.error(error?.message);
}
  return (
    
   <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5">
{
  addOpen ? (
    <AddArticle
      open={addOpen}
      setOpen={setAddOpen}
      article={""}
      type="add"
    />
  ) : editOpen ? (
    <AddArticle
      open={editOpen}
      setOpen={setEditOpen}
      article={selectedArticle}
      type="edit"
    />
  ) : (
    <>
       <div className="flex justify-between items-end rounded-xl  ">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">
          Articles
        </p>
        <p className="text-gray-500">Manage your articles</p>
        </div>
        <Button
          variant="submit"
          className="h-10 flex items-center gap-2"
          onClick={() => setAddOpen(true)}
        >
          <Plus />
          Add Article
        </Button>
      </div>

      { error ? (
        <p>No Articles Found.</p>
      ) :
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
        />
      }
    </>
  )
}

  <Dialog open={viewOpen} onOpenChange={setViewOpen}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
      <ArticleView article={selectedArticle} />
    </DialogContent>
  </Dialog>

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
