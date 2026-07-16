import DOMPurify from "dompurify";

function NewsContent({ articleData }: any) {
  return (
    <div className="flex w-full h-full gap-3 ">
      <div className="w-[70%] flex flex-col gap-3">
        <div className="w-full ">
          {articleData?.media_type === "image" && articleData?.featured_image ? (
            <img
              src={articleData?.featured_image}
              alt={articleData?.title}
              className="max-h-full max-w-full object-contain"
            />
          ) : articleData?.media_type === "video" && articleData?.video_url ? (
            <video
              src={articleData?.video_url}
              controls
              className="max-h-full max-w-full object-contain"
            />
          ) : articleData?.youtube_url && (
            <video
              src={articleData?.youtube_url}
              controls
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
<div
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(articleData?.content || ""),
  }}
/>        <div className="flex gap-3">
          {articleData?.tags?.map((tag) => {
            return (
              <span className="p-1 text-sm rounded-2xl border border-[rgb(var(--color-public-newsText-rgb)/0.3)] bg-[rgb(var(--color-public-newsText-rgb)/0.3)]">
                {tag?.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-3 ">Advertisements</div>
    </div>
  );
}
export default NewsContent;
