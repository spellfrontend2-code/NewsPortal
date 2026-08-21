import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior });
    document.documentElement?.scrollTo({ top: 0, behavior });
    document.body?.scrollTo({ top: 0, behavior });
  }

  const publicContainer = document.querySelector(".public");
  if (publicContainer) {
    publicContainer.scrollTo({ top: 0, behavior });
  }

  const adminContainers = document.querySelectorAll(
    ".admin main > div, .admin main, .admin"
  );
  adminContainers.forEach((el) => {
    if (el.scrollHeight > el.clientHeight) {
      el.scrollTo({ top: 0, behavior });
    }
  });
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop("instant");
  }, [pathname]);

  return null;
}

export default ScrollToTop;