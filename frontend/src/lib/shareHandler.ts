export const shareArticle = (articleData, platform) => {
  const rawUrl = window.location.href;
  const rawTitle = articleData?.title || "";

  const url = encodeURIComponent(rawUrl);
  const text = encodeURIComponent(rawTitle);

  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;

    case "twitter":
      shareUrl = `https://x.com/intent/tweet?url=${url}&text=${text}`;
      break;

    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;

    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${rawTitle}n${rawUrl}`
      )}`;
      break;

    default:
      return;
  }

  if (platform === "whatsapp") {
    window.open(shareUrl, "_blank");
  } else {
    window.open(shareUrl, "_blank", "width=600,height=500");
  }
};