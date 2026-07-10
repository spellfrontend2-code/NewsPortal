import { useDashboardHooks } from "@/features/dashboard/hooks/useDashboard";
import {
  FileText,
  FileEdit,
  Megaphone,
  Tag,
  Eye,
  Share2,
  Bookmark,
  Flame,
  Newspaper,
  ChartColumnStacked,
} from "lucide-react";
// import { useDashboardHooks } from "@/features/dashboard/hooks/useDashboard";

type QuickStats = {
  draft_articles: number;
  published_articles: number;
  running_advertisements: number;
  total_articles: number;
  total_bookmarks: number;
  total_categories: number;
  total_shares: number;
  total_tags: number;
  total_views: number;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  description?: string | null;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  usage_count: number;
};

type DashboardData = {
  breaking_news: unknown[];
  quick_stats: QuickStats;
  recent_news: unknown[];
  running_advertisements: unknown[];
  top_categories: Category[];
  top_view_news: unknown[];
  trending_tags: Tag[];
};

// Curated accent palette — each stat/tag gets a meaningful hue, primary purple
// stays reserved for brand + headline moments so it doesn't get diluted.
const accents = {
  violet: { bg: "bg-violet-50", text: "text-violet-600", ring: "ring-violet-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", ring: "ring-indigo-100" },
  teal: { bg: "bg-teal-50", text: "text-teal-600", ring: "ring-teal-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-100" },
  sky: { bg: "bg-sky-50", text: "text-sky-600", ring: "ring-sky-100" },
  fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-600", ring: "ring-fuchsia-100" },
} as const;

type AccentKey = keyof typeof accents;


function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent: AccentKey;
}) {
  const a = accents[accent];
  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden  rounded-2xl border border-[var(--color-secondary)] bg-white p-4 shadow-md transition-all hover:-translate-y-0.5 hover:border-[rgb(var(--color-primary-rgb)/0.3)] hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${a.bg} ring-1 ${a.ring}`}>
        <Icon size={16} className={a.text} strokeWidth={2.25} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-bold tracking-tight text-[rgb(var(--color-gray-rgb))]">
          {value?.toLocaleString()}
        </span>
        <span className="text-xs font-medium text-[var(--color-gray-text)]">{label}</span>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  label,
  message,
}: {
  icon: React.ElementType;
  label: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--color-secondary)] bg-[rgb(var(--color-primary-rgb)/0.02)] p-6 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--color-primary-rgb)/0.07)]">
        <Icon size={16} className="text-[var(--color-primary)]" />
      </div>
      <span className="text-sm font-semibold text-[rgb(var(--color-gray-rgb))]">{label}</span>
      <span className="text-xs text-[var(--color-gray-text)]">{message}</span>
    </div>
  );
}

function CategoryRow({ category, categories }: { category: Category; categories: Category[] }) {
  const parent = categories.find((c) => c.id === category.parent_id);
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            parent ? "bg-[var(--color-secondary)]" : "bg-[var(--color-primary)]"
          }`}
        />
        <span className="truncate text-sm text-[rgb(var(--color-gray-rgb))]">{category.name}</span>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
          parent
            ? "bg-[rgb(var(--color-gray-rgb)/0.05)] text-[var(--color-gray-text)]"
            : "bg-[rgb(var(--color-primary-rgb)/0.08)] text-[var(--color-primary)]"
        }`}
      >
        {parent ? `sub of ${parent.name}` : "top level"}
      </span>
    </div>
  );
}

function TagChip({ tag, accent }: { tag: Tag; accent: AccentKey }) {
  const a = accents[accent];
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${a.bg} ${a.text}`}>
      {tag.name}
    </span>
  );
}

function Dashboard() {
const dashboardHooks = useDashboardHooks();
  const { data } = dashboardHooks.useFetchDashboard();
  const dashboard = data?.data;
  const stats = dashboard?.quick_stats;
  const hasTags = dashboard?.trending_tags.length > 0;
  const hasCategories = dashboard?.top_categories.length > 0;

  return (
    <div className="flex w-full h-screen overflow-y-auto flex-col gap-6 p-15">
        <div className="flex flex-col  text-gray-800 ">
<p className="text-3xl font-bold ">Dashboard
        </p>
        <p className="text-gray-500">
          Overview of your site&rsquo;s content and activity
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={FileText} label="Total articles" value={stats?.total_articles} accent="violet" />
        <StatCard icon={Newspaper} label="Published" value={stats?.published_articles} accent="emerald" />
        <StatCard icon={FileEdit} label="Drafts" value={stats?.draft_articles} accent="amber" />
        <StatCard icon={ChartColumnStacked} label="Categories" value={stats?.total_categories} accent="indigo" />
        <StatCard icon={Tag} label="Tags" value={stats?.total_tags} accent="teal" />
        <StatCard icon={Megaphone} label="Ads running" value={stats?.running_advertisements} accent="rose" />
        <StatCard icon={Eye} label="Views" value={stats?.total_views} accent="sky" />
        <StatCard icon={Share2} label="Shares" value={stats?.total_shares} accent="fuchsia" />
        <StatCard icon={Bookmark} label="Bookmarks" value={stats?.total_bookmarks} accent="violet" />
      </div>

      {/* Categories + tags */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-1 rounded-2xl border border-[var(--color-secondary)] bg-white p-5 shadow-[0_1px_2px_rgb(0,0,0,0.04)]">
          <div className="mb-2 flex items-center gap-2">
            <ChartColumnStacked size={15} className="text-[var(--color-primary)]" />
            <span className="text-sm font-semibold text-[rgb(var(--color-gray-rgb))]">
              Top categories
            </span>
          </div>
          {hasCategories ? (
            <div className="flex flex-col divide-y divide-[rgb(var(--color-gray-rgb)/0.08)]">
              {dashboard?.top_categories?.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  categories={dashboard?.top_categories}
                />
              ))}
            </div>
          ) : (
            <span className="text-sm italic text-[var(--color-gray-text)]">No categories yet.</span>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-secondary)] bg-white p-5 shadow-[0_1px_2px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-2">
            <Flame size={15} className="text-[var(--color-primary)]" />
            <span className="text-sm font-semibold text-[rgb(var(--color-gray-rgb))]">
              Trending tags
            </span>
          </div>
          {hasTags ? (
            <>
              <div className="flex flex-wrap gap-2">
                {dashboard?.trending_tags?.map((tag, i) => (
                  <TagChip key={tag.id} tag={tag} accent="violet" />
                ))}
              </div>
              {/* {dashboard?.trending_tags.every((t) => t.usage_count === 0) && (
                <span className="text-xs italic text-[var(--color-gray-text)]">
                  No usage recorded yet.
                </span>
              )} */}
            </>
          ) : (
            <span className="text-sm italic text-[var(--color-gray-text)]">No tags yet.</span>
          )}
        </div>
      </div>

      {/* Empty-state sections */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboard?.breaking_news.length === 0 && (
          <EmptyState icon={Flame} label="Breaking news" message="Nothing marked as breaking." />
        )}
        {dashboard?.recent_news.length === 0 && (
          <EmptyState icon={Newspaper} label="Recent news" message="No articles published recently." />
        )}
        {dashboard?.top_view_news.length === 0 && (
          <EmptyState icon={Eye} label="Top viewed" message="No view data yet." />
        )}
        {dashboard?.running_advertisements.length === 0 && (
          <EmptyState icon={Megaphone} label="Ad campaigns" message="No campaigns listed here yet." />
        )}
      </div>
    </div>
  );
}

export default Dashboard;