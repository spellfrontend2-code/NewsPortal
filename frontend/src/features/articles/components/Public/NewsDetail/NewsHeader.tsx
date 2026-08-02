import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import { Clock, UserCircle } from "lucide-react";

function NewsHeader({ Data }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;
  return (
    <div className="flex flex-col gap-6 w-full pb-2">
      {/* Category Tag & Title */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-[1.15]">
          {articleData?.title}
        </h1>
      </div>

      {/* Top Banner Advertisement */}
      {advertisementData?.top && (
        <div className="w-full my-2 overflow-hidden rounded-2xl border border-slate-100/80 shadow-sm bg-slate-50/50">
          <BannerAdvertisement Ad={advertisementData?.top[0]} />
        </div>
      )}

      {/* Excerpt */}
      {articleData?.excerpt && (
        <p className="text-xl text-slate-650 leading-relaxed font-serif italic border-l-4 border-slate-800 pl-6 my-2">
          {articleData?.excerpt}
        </p>
      )}

      {/* Author & Read Time Meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-200/60 text-slate-600 text-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={articleData?.author?.image}
              alt={articleData?.author?.name}
              className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-base">{articleData?.author?.name}</p>
            {/* <p className="text-xs text-slate-400 font-medium">Contributor</p> */}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-100 shadow-sm">
          <Clock size={15} className="text-slate-400" />
          <span className="font-semibold text-xs tracking-wider uppercase">{articleData?.published_at?.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsHeader;
