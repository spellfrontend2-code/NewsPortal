import { Controller, useForm } from "react-hook-form";
import { useArticlesHooks } from "../../hooks/useArticles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toDateTimeLocal } from "../../utils/toDateTimeLocal";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import {
  Eye,
  Share2,
  MessageCircle,
  Bookmark,
  ThumbsUp,
  Clock,
  Globe,
  Tag,
  User,
  FileText,
  BarChart3,
  CalendarDays,
  Link,
  Star,
  Image,
  ArrowLeft,
} from "lucide-react";
import CommentItem from "../CommentUI";

type Article = any;

interface Props {
  article: Article;
  setViewOpen: (open: boolean) => void;
}

// ---------- helpers ----------

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border p-4 ${color} transition-all duration-200 hover:shadow-md`}
    >
      <div className="mb-0.5">{icon}</div>
      <span className="text-xl font-extrabold tracking-tight">{value ?? 0}</span>
      <span className="text-[10px] uppercase tracking-widest font-semibold opacity-70">
        {label}
      </span>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        {icon && <span className="text-indigo-500">{icon}</span>}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: any }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
        {label}
      </p>
      <p className="text-sm text-slate-800 font-medium break-all">
        {value ?? <span className="text-slate-300 italic">—</span>}
      </p>
    </div>
  );
}

function Badge({
  label,
  variant,
}: {
  label: string;
  variant?: "primary" | "tag" | "category";
}) {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border";
  if (variant === "primary")
    return (
      <span className={`${base} bg-indigo-50 border-indigo-200 text-indigo-700`}>
        <Star size={10} /> Primary
      </span>
    );
  if (variant === "tag")
    return (
      <span className={`${base} bg-slate-50 border-slate-200 text-slate-600`}>
        <Tag size={10} />
        {label}
      </span>
    );
  return (
    <span className={`${base} bg-violet-50 border-violet-200 text-violet-700`}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-50 border-emerald-200 text-emerald-700",
    draft: "bg-amber-50 border-amber-200 text-amber-700",
    review: "bg-blue-50 border-blue-200 text-blue-700",
    archived: "bg-slate-100 border-slate-300 text-slate-600",
    scheduled: "bg-purple-50 border-purple-200 text-purple-700",
    rejected: "bg-rose-50 border-rose-200 text-rose-700",
    pending: "bg-orange-50 border-orange-200 text-orange-700",
    approved: "bg-emerald-50 border-emerald-200 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${
        map[status] ?? "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}




// ---------- Main ----------

const statuses = [
  { name: "Draft", value: "draft" },
  { name: "In Review", value: "review" },
  { name: "Published", value: "published" },
  { name: "Archived", value: "archived" },
  { name: "Scheduled", value: "scheduled" },
  { name: "Rejected", value: "rejected" },
  { name: "Pending", value: "pending" },
];

export default function ArticleView({ article, setViewOpen }: Props) {
  if (!article) return null;

  const articleHook = useArticlesHooks();
  const { PERMISSIONS, isLoading: permissionLoading } = usePermissionStore();
  const { hasPermission } = usePermission();
  const { control, handleSubmit } = useForm({
    defaultValues: { status: article?.status || "pending" },
  });
  const updateStatus = articleHook.useStatusUpdateArticles();
  const onSubmit = (data: any) => {
    updateStatus.mutate(
      { id: article.id, data },
      {
        onSuccess: (res) =>
          toast.success(res?.message || "Status updated successfully"),
        onError: (err) =>
          toast.error(err?.message || "Something went wrong"),
      }
    );
  };

  return (
    <div className="w-full mx-auto space-y-6">

      {/* ── Status Update Bar ── */}
      {!permissionLoading &&
        hasPermission(PERMISSIONS?.ARTICLE?.UPDATE_STATUS?.name) && (
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 flex items-end gap-4">
            <div className="flex items-center gap-1.5 mr-auto">
               <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer border border-[var(--color-secondary)] rounded-full text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]"
          onClick={() => setViewOpen(false)}
        >
          <ArrowLeft />
        </Button>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Article ID
              </span>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                #{article.id}
              </span>
            </div>
            <div className="min-w-[160px]">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">
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
                      {statuses.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.name}
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
              className="rounded-xl"
            >
              {updateStatus.isPending ? "Updating…" : "Update Status"}
            </Button>
          </div>
        )}

      {/* ── Hero / Title ── */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        {article.featured_image && (
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="p-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={article.status} />
            {article.is_headline_news && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 border border-red-200 text-red-600">
                🔴 Headline
              </span>
            )}
            <span className="ml-auto text-[11px] text-slate-400 flex items-center gap-1">
              <CalendarDays size={12} />
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Not published"}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight font-serif">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-slate-500 leading-relaxed text-sm border-l-4 border-indigo-300 pl-4 italic">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 pt-1">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
              {article.author?.name ? (
                article.author.name.slice(0, 2).toUpperCase()
              ) : (
                <User size={14} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {article.author?.name ?? "Unknown Author"}
              </p>
              <p className="text-[11px] text-slate-400">ID: {article.author?.id}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
              <Clock size={12} className="text-slate-400" />
              {article.read_time_minutes} min read
            </div>
          </div>
        </div>
      </div>

      {/* ── Engagement Stats ── */}
      <SectionCard title="Engagement Stats" icon={<BarChart3 size={14} />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <StatCard
            icon={<Eye size={18} className="text-blue-500" />}
            label="Views"
            value={article.view_count?.toLocaleString()}
            color="bg-blue-50 border-blue-100 text-blue-700"
          />
          <StatCard
            icon={<Share2 size={18} className="text-violet-500" />}
            label="Shares"
            value={article.share_count?.toLocaleString()}
            color="bg-violet-50 border-violet-100 text-violet-700"
          />
          <StatCard
            icon={<MessageCircle size={18} className="text-emerald-500" />}
            label="Comments"
            value={article.comment_count?.toLocaleString()}
            color="bg-emerald-50 border-emerald-100 text-emerald-700"
          />
          <StatCard
            icon={<ThumbsUp size={18} className="text-amber-500" />}
            label="Likes"
            value={article.likes_count?.toLocaleString()}
            color="bg-amber-50 border-amber-100 text-amber-700"
          />
          <StatCard
            icon={<Bookmark size={18} className="text-rose-500" />}
            label="Bookmarks"
            value={article.bookmark_count?.toLocaleString()}
            color="bg-rose-50 border-rose-100 text-rose-700"
          />
        </div>
      </SectionCard>

      {/* ── Content ── */}
      <SectionCard title="Article Content" icon={<FileText size={14} />}>
        <div
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&_p]:mb-4 [&_h2]:font-serif [&_h3]:font-serif rounded-xl border border-slate-100 bg-slate-50/50 p-5"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </SectionCard>

      {/* ── Media ── */}
      {(article.featured_image||
        article.thumbnail ||
        article.video_url ||
        article.youtube_url ||
        article.youtube_embed_url) && (
        <SectionCard title="Additional Media" icon={<Image size={14} />}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Media Type" value={article.media_type} />
              <InfoRow label="Media Caption" value={article.media_caption} />
            </div>
  {article.featured_image && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Thumbnail
                </p>
                <img
                  src={article.featured_image}
                  alt="featured_image"
                  className="rounded-xl max-h-64 object-cover w-full border border-slate-100"
                />
              </div>
            )}
            {article.thumbnail && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Thumbnail
                </p>
                <img
                  src={article.thumbnail}
                  alt="thumbnail"
                  className="rounded-xl max-h-64 object-cover w-full border border-slate-100"
                />
              </div>
            )}
            {article.video_url && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Video
                </p>
                <video
                  src={article.video_url}
                  controls
                  className="rounded-xl max-h-64 w-full border border-slate-100 bg-black"
                />
              </div>
            )}
            {article.youtube_url && (
              <InfoRow label="YouTube URL" value={article.youtube_url} />
            )}
            {article.youtube_embed_url && (
              <InfoRow
                label="YouTube Embed URL"
                value={article.youtube_embed_url}
              />
            )}
          </div>
        </SectionCard>
      )}

      {/* ── Three-column meta row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SEO */}
        <SectionCard title="SEO" icon={<Link size={14} />}>
          <div className="space-y-3">
            <InfoRow label="Meta Title" value={article.meta_title} />
            <InfoRow label="Meta Description" value={article.meta_description} />
            <InfoRow label="Canonical URL" value={article.canonical_url} />
          </div>
        </SectionCard>

        {/* Targeting */}
        <SectionCard title="Targeting" icon={<Globe size={14} />}>
          <div className="space-y-3">
            <InfoRow label="City Focus" value={article.city_focus} />
            <InfoRow
              label="Target Countries"
              value={article.target_countries?.join(", ")}
            />
            {article.scheduled_for && (
              <InfoRow
                label="Scheduled For"
                value={toDateTimeLocal(article.scheduled_for)}
              />
            )}
          </div>
        </SectionCard>

        {/* Classification */}
        <SectionCard title="Classification" icon={<Tag size={14} />}>
          <div className="space-y-4">
            {article.categories?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {article.categories.map((c: any) => (
                    <Badge
                      key={c.id}
                      label={c.name}
                      variant={c.is_primary ? "primary" : "category"}
                    />
                  ))}
                </div>
              </div>
            )}
            {article.tags?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((t: any) => (
                    <Badge key={t.id} label={t.name} variant="tag" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ── Comments ── */}
      {article.comments && (
        <SectionCard
          title={`Comments (${article.comment_count ?? article.comments.length})`}
          icon={<MessageCircle size={14} />}
        >
          {article.comments.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No comments yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {article.comments.map((comment: any) => (
                <CommentItem  key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* ── Advertisements summary ── */}
      {article.advertisements?.length > 0 && (
        <SectionCard
          title="Linked Advertisements"
          icon={<BarChart3 size={14} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {article.advertisements.map((ad: any) => (
              <div
                key={ad.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all duration-150"
              >
                {ad.image_url && (
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="h-12 w-20 object-cover rounded-lg border border-slate-100 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {ad.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {ad.advertiser_name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                      {ad.placement?.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      {ad.ad_type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 ml-auto">
                      ${ad.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Footer ── */}
      <p className="text-center text-xs text-slate-400 pb-2">
        Article created:{" "}
        {article.created_at
          ? new Date(article.created_at).toLocaleString()
          : "—"}
      </p>
    </div>
  );
}