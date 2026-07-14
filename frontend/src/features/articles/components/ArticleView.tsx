import { Controller, useForm } from "react-hook-form";
import { useArticlesHooks } from "../hooks/useArticles";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {inputStyle} from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toDateTimeLocal } from "../utils/toDateTimeLocal";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
type Article = any;

interface Props {
  article: Article;
}

function Field({ label, value }: { label: string; value?: any }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
        {label}
      </p>
      <p className="text-sm text-slate-800 break-words">
        {value ?? "-"}
      </p>
    </div>
  );
}

export default function ArticleView({ article }: Props) {
  if (!article) return null;
const articleHook=useArticlesHooks();
const {PERMISSIONS,isLoading:permissionLoading}=usePermissionStore();
const {hasPermission}=usePermission()
const statuses = [
  { name: "Draft", value: "draft" },
  { name: "In Review", value: "review" },
  { name: "Published", value: "published" },
  { name: "Archived", value: "archived" },
  { name: "Scheduled", value: "scheduled" },
  { name: "Rejected", value: "rejected" },
  { name: "Pending", value: "pending" },
];  const { control,handleSubmit } = useForm({
    defaultValues:{
      status:article?.status||"pending"
    },});
const updateStatus=articleHook.useStatusUpdateArticles();
const onSubmit=(data:any)=>{
 updateStatus.mutate({id:article.id,data},{
  onSuccess:(res)=>{toast.success(res?.message||"Status updated successfully");},
 onError:(err)=>{toast.error(err?.message||"Something went wrong");}});
}
  return (
    <div className="border border-slate-200 rounded-2xl w-full mx-auto p-6 space-y-6 bg-slate-50 shadow-sm">
                
       {permissionLoading?null:hasPermission(PERMISSIONS?.ARTICLES?.UPDATE_STATUS) && <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-[11px] text-black uppercase tracking-wider font-bold">
              Status
            </label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button
            type="button"
            variant="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={updateStatus.isPending}
            className="rounded-md"
>
            {updateStatus.isPending ? "Updating..." : "Update status"}
          </Button>
        </div>}
      {/* HEADER */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <Field label="Title" value={article.title} />
        <Field label="Excerpt" value={article.excerpt} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <Field label="Status" value={article.status} />
          <Field label="Read Time (min)" value={article.read_time_minutes} />
          <Field
            label="Scheduled For"
            value={
              article.scheduled_for
                ? toDateTimeLocal(article.scheduled_for)
                : "-"
            }
          />
        </div>
      </div>

      {/* AUTHOR */}
      <div className="rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-4">
          Author Information
        </h2>
        <Field label="Author ID" value={article.author?.id} />
        <Field label="Author Name" value={article.author?.name} />
      </div>

      {/* MEDIA */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Media Information
        </h2>

        <Field label="Media Type" value={article.media_type} />
        <Field label="Media Caption" value={article.media_caption} />

        {article.featured_image && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Featured Image</p>
            <img
              src={article.featured_image}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
            />
          </div>
        )}

        {article.thumbnail && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Thumbnail Image</p>
            <img
              src={article.thumbnail}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
            />
          </div>
        )}

        {article.video_url && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Video </p>
            <video
              src={article.video_url}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
              controls
            />
          </div>
        )}

        {article.youtube_url && (
          <Field label="YouTube URL" value={article.youtube_url} />
        )}

        {article.youtube_embed_url && (
          <Field label="YouTube Embed URL" value={article.youtube_embed_url} />
        )}
      </div>

      {/* CONTENT */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">Content</h2>

        <div
          className="prose prose-slate max-w-none border border-slate-200 rounded-xl p-5 bg-slate-50"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* SEO */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          SEO Information
        </h2>

        <Field label="Meta Title" value={article.meta_title} />
        <Field label="Meta Description" value={article.meta_description} />
        <Field label="Canonical URL" value={article.canonical_url} />
      </div>

      {/* TARGETING */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Targeting Information
        </h2>

        <Field label="City Focus" value={article.city_focus} />
        <Field
          label="Target Countries"
          value={
            article.target_countries?.length
              ? article.target_countries.join(", ")
              : "-"
          }
        />
      </div>

      {/* CATEGORIES & TAGS */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Classification
        </h2>

        <Field
          label="Categories"
          value={
            article.categories?.length
              ? article.categories.map((c: any) => c.name).join(", ")
              : "-"
          }
        />

        <Field
          label="Tags"
          value={
            article.tags?.length
              ? article.tags.map((t: any) => t.name).join(", ")
              : "-"
          }
        />
      </div>

      {/* STATS */}
      <div className="rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-4">
          Engagement Stats
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Field label="Views" value={article.view_count} />
          <Field label="Shares" value={article.share_count} />
          <Field label="Comments" value={article.comment_count} />
          <Field label="Likes" value={article.likes_count} />
          <Field label="Bookmarks" value={article.bookmark_count} />
        </div>
      </div>
    </div>
  );
}