import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const publicContainer = document.querySelector(".public");
    if (publicContainer) {
      publicContainer.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;