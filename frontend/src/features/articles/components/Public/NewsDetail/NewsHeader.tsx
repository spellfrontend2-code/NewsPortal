import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import { Clock, UserCircle } from "lucide-react";

function NewsHeader({ Data }: any) {
  const articleData = Data?.article;
  const advertisementData = Data?.advertisements;
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <p className="text-5xl h-[1/4]  font-bold text-[var(--color-public-newsText)] ">
        {articleData?.title}
      </p>
       {advertisementData?.top &&<div className="h-[150px] w-full">
        (
          <BannerAdvertisement Ad={advertisementData?.top} />
        )
      </div>}
      <p className="text-[rgb(var(--color-public-newsText-rgb)/0.6)]">
        {articleData?.excerpt}
      </p>
      <div className="flex w-[25%] h-[1/4] gap-5 items-center text-[rgb(var(--color-public-newsText-rgb)/0.9)]">
        <p className="flex items-center gap-1">
          <img
            src={articleData?.author?.image}
            className="h-6 w-6 rounded-full object-fill border"
          />
          {articleData?.author?.name}
        </p>
        <p className="flex items-center gap-1">
          <Clock size={20} />
          {articleData?.read_time_minutes} min
        </p>
      </div>
    </div>
  );
}

export default NewsHeader;
