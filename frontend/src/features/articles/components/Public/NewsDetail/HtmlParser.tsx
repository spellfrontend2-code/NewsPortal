import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import parse, { domToReact } from "html-react-parser";

 const HtmlParser = ({
  content,
  ad,
}: {
  content: string;
  ad: any;
}) => {
  let paragraphCount = 0;
let adIndex = 0;

return parse(content, {

  replace(domNode: any) {
    if (domNode.name === "p") {
      paragraphCount++;

      let advertisement = null;

      if (paragraphCount % 2 === 0 && ad[adIndex]) {
        advertisement = (
          <div className="my-6" key={adIndex}>
            <BannerAdvertisement Ad={ad[adIndex]} />
          </div>
        );

        adIndex++;
      }
       return (
        <>
          <p>{domToReact(domNode.children)}</p>
          {advertisement}
        </>
      );
    }
  },
});}
export default HtmlParser;