type Category = any;

interface Props {
  category: Category;
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

export default function CategoryView({ category }: Props) {
  if (!category) return null;

  return (
    <div className="border border-slate-200 rounded-2xl max-w-5xl mx-auto p-6 space-y-6 bg-slate-50 shadow-sm">
      {/* HEADER */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <Field label="Name" value={category.name} />
        <Field label="Description" value={category.description} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <Field label="Parent ID" value={category.parent_id} />
          <Field label="Position" value={category.position} />
        </div>
      </div>

      {/* ICON */}
      {category.icon && (
        <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black">
            Icon
          </h2>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Icon
            </p>
            <i
              className={category.icon}
            />
          </div>
        </div>
      )}

      {/* SEO */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          SEO Information
        </h2>

        <Field label="Meta Title" value={category.meta_title} />
        <Field label="Meta Description" value={category.meta_description} />
      </div>
    </div>
  );
}