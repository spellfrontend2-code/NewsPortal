type Author = any;

interface Props {
  author: Author;
}

function Field({ label, value }: { label: string; value?: any }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
        {label}
      </p>

      <p className="text-sm text-slate-800 break-words">{value ?? "-"}</p>
    </div>
  );
}

export default function AuthorView({ author }: Props) {
  if (!author) return null;

  return (
    <div className="border border-slate-200 rounded-2xl w-full mx-auto p-6 space-y-6 bg-slate-50 shadow-sm">
      {/* AUTHOR PROFILE */}
      {author.author && (
        <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black">
            Author Profile
          </h2>
          <div className="pt-4 border-t border-slate-100">
            {/* AVATAR */}
            {author.author?.avatar_url &&
              typeof author.author.avatar_url === "string" && (
                <div className="rounded-xl bg-white mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-4">
                    Avatar
                  </h2>

                  <img
                    src={author.author.avatar_url}
                    className="h-40 w-40 rounded-xl object-cover border border-slate-200"
                  />
                </div>
              )}

            <Field label="Bio" value={author.author.bio} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Author ID" value={author.author.id} />

            <Field
              label="Specialization"
              value={author.author.specialization}
            />

            <Field
              label="Verified"
              value={author.author.verified ? "Yes" : "No"}
            />

            <Field
              label="Total Articles"
              value={author.author.total_articles}
            />

            <Field label="Total Views" value={author.author.total_views} />

            <Field label="Average Rating" value={author.author.avg_rating} />
          </div>
        </div>
      )}
      {/* BASIC INFORMATION */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Basic Information
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Name" value={author.name} />
          <Field label="Email" value={author.email} />
          <Field label="Country Code" value={author.country_code} />
          <Field label="Language" value={author.language} />
          <Field label="Timezone" value={author.timezone} />
          <Field label="Status" value={author.status} />
        </div>
      </div>

      {/* ROLE */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Role Information
        </h2>

        <Field
          label="Roles"
          value={author.role?.length ? author.role.join(", ") : "-"}
        />
      </div>

      {/* PREFERENCES */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Preferences
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Theme" value={author.preferences?.theme} />

          <Field label="Currency" value={author.preferences?.currency} />
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Social Links
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {author.author?.social_links?.facebook && <Field
            label="Facebook"
            value={author.author?.social_links?.facebook}
          />}
          {author.author?.social_links?.instagram && <Field
            label="Facebook"
            value={author.author?.social_links?.instagram}
          />}
          {author.author?.social_links?.youtube && <Field
            label="Facebook"
            value={author.author?.social_links?.youtube}
          />}
          {author.author?.social_links?.tiktok && <Field label="Facebook" value={author.author?.social_links?.tiktok} />}
          {author.author?.social_links?.twitter && <Field label="Twitter" value={author.author?.social_links?.twitter} />}
        </div>
      </div>

      {/* ACCOUNT INFORMATION */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Account Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Email Verified"
            value={author.email_verified_at ? "Verified" : "Not Verified"}
          />
        </div>
      </div>
    </div>
  );
}
