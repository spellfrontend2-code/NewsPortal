import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import DOMPurify from "dompurify";

function NewsContent({ Data }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;
  return (
    <div className="flex w-full h-full gap-10">
      <div className="w-3/4 flex flex-col gap-3">
        <div className="w-full ">
          {articleData?.media_type === "image" &&
          articleData?.featured_image ? (
            <img
              src={articleData?.featured_image}
              alt={articleData?.title}
              className="h-full w-full object-fill"
            />
          ) : articleData?.media_type === "video" && articleData?.video_url ? (
            <video
              src={articleData?.video_url}
              controls
              className="h-full w-full object-contain"
            />
          ) : (
            articleData?.youtube_url && (
              <video
                src={articleData?.youtube_url}
                controls
                className="h-full w-full object-fill"
              />
            )
          )}
        </div>
        <div className="h-[100px] w-full">
          <BannerAdvertisement Ad={advertisementData?.middle} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(articleData?.content || ""),
          }}
        />
        <div className="h-[100px] w-full">
          <BannerAdvertisement Ad={advertisementData?.bottom} />
        </div>
        <div className="flex gap-3">
          {articleData?.tags?.map((tag) => {
            return (
              <span className="p-1 text-sm rounded-2xl border border-[rgb(var(--color-public-newsText-rgb)/0.3)] bg-[rgb(var(--color-public-newsText-rgb)/0.3)]">
                {tag?.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col gap-3  ">
        <SidebarAdvertisement Ads={advertisementData?.sidebar} />
      </div>
    </div>
  );
}
export default NewsContent;
