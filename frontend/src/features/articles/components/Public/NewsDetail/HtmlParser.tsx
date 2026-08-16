import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import parse, { domToReact } from "html-react-parser";

interface HtmlParserProps {
  content: string;
  paragraphAds?: any[];
  middleAds?: any[];
  ad?: any;
}

const HtmlParser = ({
  content,
  paragraphAds = [],
  middleAds = [],
  ad,
}: HtmlParserProps) => {
  let paragraphCount = 0;

  const allParagraphAds = Array.isArray(paragraphAds) ? paragraphAds : [];
  const allMiddleAds = Array.isArray(middleAds)
    ? middleAds
    : Array.isArray(ad)
    ? ad
    : ad
    ? [ad]
    : [];

  let middleAdIndex = 0;

  return parse(content || "", {
    replace(domNode: any) {
      if (domNode.name === "p") {
        paragraphCount++;

        // Match ad configured for this specific paragraph index (e.g. paragraph 5)
        const matchedParagraphAd = allParagraphAds.find((pAd: any) => {
          const targetPos =
            pAd?.paragraph_position ??
            pAd?.paragraph_number ??
            pAd?.placement?.paragraph_number ??
            pAd?.slot?.paragraph_position;
          return Number(targetPos) === paragraphCount;
        });

        // Fallback for middle ads
        let middleAdToRender = null;
        if (!matchedParagraphAd && allMiddleAds[middleAdIndex]) {
          if (paragraphCount % 3 === 0 || paragraphCount === 3) {
            middleAdToRender = allMiddleAds[middleAdIndex];
            middleAdIndex++;
          }
        }

        const adToRender = matchedParagraphAd || middleAdToRender;

        return (
          <>
            <p>{domToReact(domNode.children)}</p>
            {adToRender && (
              <div className="w-full my-6 overflow-hidden rounded-md shadow-sm">
                <BannerAdvertisement Ad={adToRender} />
              </div>
            )}
          </>
        );
      }
    },
  });
};

export default HtmlParser;