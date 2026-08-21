import { ExternalLink, CheckCircle, XCircle, Calendar, Clock, Layers, Maximize2 } from "lucide-react";

interface Props {
  advertisement: any;
}

function Field({ label, value }: { label: string; value?: any }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
        {label}
      </p>
      <p className="text-sm text-gray-800 font-medium break-words">
        {value !== null && value !== undefined && value !== "" ? String(value) : "—"}
      </p>
    </div>
  );
}

export default function AdvertisementView({ advertisement }: Props) {
  if (!advertisement) return null;

  const ad = advertisement;
  const placementObj = ad?.placement && typeof ad.placement === "object" ? ad.placement : {};

  const name = ad?.name || ad?.title || "Untitled Advertisement";
  const advertiser =
    ad?.advertiser_name ||
    ad?.advertiser ||
    ad?.brand_name ||
    ad?.advertiser_website ||
    "—";
  const mediaType = ad?.media_type || ad?.type || ad?.ad_type || "image";

  const imageUrl = ad?.image_url || ad?.image || ad?.file_path;
  const videoUrl = ad?.video_url || ad?.video || ad?.video_path;
  const videoThumbnail = ad?.video_thumbnail || ad?.thumbnail || ad?.poster;
  const htmlCode = ad?.html_code || ad?.html;
  const textContent = ad?.text_content || ad?.text;

  const clickUrl =
    ad?.click_url ||
    ad?.url ||
    ad?.target_url ||
    ad?.link_url ||
    ad?.advertiser_website ||
    "";
  const buttonText =
    ad?.button_text || ad?.cta || ad?.cta_text || ad?.button_label || "";

  const page = ad?.page || placementObj.page || ad?.slot?.page || "—";
  const section =
    ad?.section ||
    placementObj.section ||
    ad?.slot?.section ||
    (typeof ad?.placement === "string" ? ad.placement : "—");
  const where =
    ad?.where ||
    placementObj.where ||
    ad?.slot?.position_type ||
    ad?.slot?.where ||
    "—";

  const categoryId =
    ad?.category_id ??
    placementObj.category_id ??
    ad?.category?.id ??
    (Array.isArray(ad?.categories) && ad.categories[0]
      ? typeof ad.categories[0] === "object"
        ? ad.categories[0].id
        : ad.categories[0]
      : undefined);
  const articleId =
    ad?.article_id ?? placementObj.article_id ?? ad?.article?.id;
  const articleNumber =
    ad?.article_number ??
    placementObj.article_number ??
    ad?.slot?.article_position;
  const paragraphNumber =
    ad?.paragraph_number ??
    placementObj.paragraph_number ??
    ad?.slot?.paragraph_position;

  const size =
    ad?.size ||
    (ad?.slot?.width && ad?.slot?.height
      ? `${ad.slot.width}×${ad.slot.height} px`
      : ad?.width && ad?.height
      ? `${ad.width}×${ad.height} px`
      : "—");

  const mobileSize =
    ad?.mobile_size ||
    (ad?.slot?.mobile_width && ad?.slot?.mobile_height
      ? `${ad.slot.mobile_width}×${ad.slot.mobile_height} px`
      : ad?.mobile_width && ad?.mobile_height
      ? `${ad.mobile_width}×${ad.mobile_height} px`
      : "—");

  const startDate =
    (ad?.start_date || ad?.starts_at)
      ? String(ad.start_date || ad.starts_at).slice(0, 10)
      : "—";
  const endDate =
    (ad?.end_date || ad?.ends_at)
      ? String(ad.end_date || ad.ends_at).slice(0, 10)
      : "—";
  const startTime =
    (ad?.start_time || ad?.daily_start_time)
      ? String(ad.start_time || ad.daily_start_time).slice(0, 5)
      : "00:00";
  const endTime =
    (ad?.end_time || ad?.daily_end_time)
      ? String(ad.end_time || ad.daily_end_time).slice(0, 5)
      : "23:59";
  const status = ad?.status || "active";
  const approved = Boolean(ad?.approved ?? ad?.is_approved);

  return (
    <div className="rounded-2xl max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Advertiser: <span className="font-semibold text-gray-700">{advertiser}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                status === "active"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : status === "paused"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              {status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                approved
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {approved ? <CheckCircle size={13} /> : <XCircle size={13} />}
              {approved ? "Approved" : "Pending / Rejected"}
            </span>
          </div>
        </div>

        {/* Media Preview */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Creative Preview ({mediaType})
          </p>

          {mediaType === "image" && imageUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center p-2 max-h-[300px]">
              <img
                src={typeof imageUrl === "string" ? imageUrl : imageUrl.file_url}
                alt={name}
                className="max-h-[280px] object-contain rounded-lg"
              />
            </div>
          )}

          {mediaType === "video" && videoUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-black flex items-center justify-center max-h-[300px]">
              <video
                src={typeof videoUrl === "string" ? videoUrl : videoUrl.file_url}
                poster={
                  videoThumbnail
                    ? typeof videoThumbnail === "string"
                      ? videoThumbnail
                      : videoThumbnail.file_url
                    : undefined
                }
                controls
                className="max-h-[280px] w-full"
              />
            </div>
          )}

          {mediaType === "html" && htmlCode && (
            <pre className="text-xs bg-gray-900 text-emerald-400 p-4 rounded-xl font-mono overflow-x-auto max-h-[200px]">
              {htmlCode}
            </pre>
          )}

          {mediaType === "text" && textContent && (
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800">
              {textContent}
            </div>
          )}

          {/* Click URL */}
          {clickUrl && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="font-semibold text-gray-500">Destination:</span>
              <a
                href={clickUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                {clickUrl}
                <ExternalLink size={12} />
              </a>
              {buttonText && (
                <span className="ml-auto px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[11px]">
                  CTA: {buttonText}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Placement Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Layers size={14} className="text-purple-600" />
          Placement Configuration
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Page" value={page} />
          <Field label="Section" value={section} />
          <Field label="Placement (Where)" value={where} />
          {categoryId && <Field label="Category ID" value={categoryId} />}
          {articleId && <Field label="Article ID" value={articleId} />}
          {articleNumber && <Field label="Article Number (#)" value={articleNumber} />}
          {paragraphNumber && <Field label="Paragraph Number (#)" value={paragraphNumber} />}
        </div>
      </div>

      {/* Sizing & Schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar size={14} className="text-emerald-600" />
          Size & Schedule
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Primary Size" value={size} />
          <Field label="Mobile Size" value={mobileSize || "Default"} />
          <Field label="Start Date" value={startDate} />
          <Field label="End Date" value={endDate} />
          <Field label="Daily Window" value={`${startTime} — ${endTime}`} />
        </div>
      </div>
    </div>
  );
}