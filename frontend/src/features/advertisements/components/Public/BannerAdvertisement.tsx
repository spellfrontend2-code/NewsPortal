import { Link } from "react-router-dom";

function BannerAdvertisement({Ad}) {
    return <div className="h-full w-full">
        <Link
        to={Ad.target_url}
          target={Ad. target_blank}
      >

        {Ad.type === "image" && (
          <img
            src={Ad.image}
            alt={Ad.title}
            className="h-full w-full object-fill"
          />
        )}

        {Ad.type === "video" && (
          <video
            src={Ad.video}
            autoPlay
            muted
            loop
            disablePictureInPicture
            className="h-full w-full object-fill "
          />
        )}

        {Ad.type === "html" && (
          <div
          className="bg-gray-100 h-full w-full"
            dangerouslySetInnerHTML={{
              __html: Ad.html,
            }}
          />
        )}

        {Ad.type === "text" && (
          <p className="bg-gray-100 h-full w-full">{Ad.text}</p>
        )}
      </Link>
    </div>;
}

export default BannerAdvertisement