import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import NewsContent from "@/features/articles/components/Public/NewsDetail/NewsContent";
import  NewsDetailSkeleton from "@/features/articles/components/Public/NewsDetail/NewsDetailSkeleton";
import NewsHeader from "@/features/articles/components/Public/NewsDetail/NewsHeader";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewsDetail() {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
  const { data: articles, isLoading } =
    articleHook.useFetchPublicSingleArticle(slug);
   const Data=articles?.data??[]
   const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
  if (Data?.advertisements?.popup) {
    setShowPopup(true);
  }
}, [Data?.advertisements?.popup]);
  return (
    <div className="flex justify-center w-full py-10">
      {isLoading?
      <NewsDetailSkeleton/>:
      <div className="flex flex-col justify-center gap-3 w-full">
      <NewsHeader Data={Data}/>
       <NewsContent Data={Data} />
      </div>}
      <PopupAdvertisement advertisements={Data?.advertisements?.popup} showPopup={showPopup} setShowPopup={setShowPopup}/>
    </div>
  );
}

export default NewsDetail;
