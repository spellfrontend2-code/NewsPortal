import { Link } from "react-router-dom";

function SidebarAdvertisement({ Ads }) {
  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      {Ads?.map((ad, index) => {
        console.log(ad)
        return (
          <Link
            key={ad.id ?? index}
            to={ad.url || "#"}
            target={ad.target}
            className="h-1/3 w-full cursor-pointer"
          >
            {ad?.type === "image" ? (
              <img
                src={ad.image}
                alt={ad.title}
                className="h-full w-full object-fill"
              />
            ) : ad?.type === "video" ? (
              <video
                src={ad.video}
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                loop
                className="h-full w-full object-fill"
              />
            ) : ad?.type === "text" ? (
              <div className="bg-gray-100 h-full w-full">{ad.text}</div>
            ) : ad?.type === "html" ? (
              <div
                className="bg-gray-100 h-full w-full overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: ad.html,
                }}
              />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarAdvertisement;
