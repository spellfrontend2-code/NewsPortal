import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import { Clock } from "lucide-react";

function NewsHeader({ Data }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;

  return (
    <div className="flex flex-col gap-6 w-full pb-2">
      {/* Category Tag & Title */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.18] break-words">
          {articleData?.title}
        </h1>
      </div>

      {/* Top Banner Advertisement (Takes whole banner width & height without spaces) */}
      {advertisementData?.top?.length > 0 && (
        <div className="w-full my-3 overflow-hidden rounded-md ">
          {advertisementData.top.map((ad: any, index: number) => (
            <div key={ad.id ?? index} className="w-full">
              <BannerAdvertisement Ad={ad} />
            </div>
          ))}
        </div>
      )}

      {/* Excerpt */}
      {articleData?.excerpt && (
        <p className="text-xl text-slate-650 leading-relaxed italic border-l-4 border-slate-800 pl-6 my-2">
          {articleData?.excerpt}
        </p>
      )}

      {/* Author & Read Time Meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-200/60 text-slate-600 text-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            {articleData?.author?.image && (
              <img
                src={articleData?.author?.image}
                alt={articleData?.author?.name}
                className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
              />
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-base">
              {articleData?.author?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[var(--color-public-text-main)]">
          <Clock size={15} />
          <span className="font-semibold text-xs tracking-wider uppercase">
            {articleData?.published_at?.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsHeader;
