import { useEffect } from "react";
import { useMatches, useParams } from "react-router-dom";

export type RouteHandle = {
  title?: string | ((params: Record<string, string | undefined>) => string);
};

export function formatSlug(slug?: string): string {
  if (!slug) return "";

  try {
    const decoded = decodeURIComponent(slug);
    return decoded
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return slug
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

function PageTitle() {
  const matches = useMatches();
  const params = useParams();

  useEffect(() => {
    const currentMatch = [...matches]
      .reverse()
      .find((match) => {
        const handle = match.handle as RouteHandle | undefined;
        return Boolean(handle?.title);
      });

    const handle = currentMatch?.handle as RouteHandle | undefined;
    const rawTitle = typeof handle?.title === "function"
      ? handle.title(params)
      : handle?.title;

    // Strip existing suffix like " | NewsPortal" or " - NewsPortal" if present
    const baseTitle = rawTitle
      ? rawTitle.replace(/\s*[|\-–]\s*NewsPortal$/i, "").trim()
      : "";

    const siteName = "NewsPortal";
    const slug = params.slug;

    if (slug) {
      const formattedSlug = formatSlug(slug);
      const pathname = currentMatch?.pathname || "";

      // Check if it's an article/news detail route
      if (
        baseTitle.toLowerCase() === "news" ||
        pathname.startsWith("/news/") ||
        pathname.endsWith("/:slug")
      ) {
        document.title = `${formattedSlug} | ${siteName}`;
        return;
      }

      // Check if it's a category route
      if (
        baseTitle.toLowerCase().includes("category") ||
        pathname.includes("/category/")
      ) {
        document.title = `${formattedSlug} News | ${siteName}`;
        return;
      }

      // Check if it's an article edit route
      if (
        baseTitle.toLowerCase().includes("edit article") ||
        pathname.includes("/articles/")
      ) {
        document.title = `Edit Article: ${formattedSlug} | ${siteName}`;
        return;
      }

      // If title template contains :slug
      if (baseTitle.includes(":slug")) {
        const replaced = baseTitle.replace(/:slug/g, formattedSlug);
        document.title = `${replaced} | ${siteName}`;
        return;
      }

      // Any other route with slug
      if (baseTitle && !baseTitle.toLowerCase().includes(formattedSlug.toLowerCase())) {
        document.title = `${baseTitle}: ${formattedSlug} | ${siteName}`;
        return;
      }

      if (formattedSlug) {
        document.title = `${formattedSlug} | ${siteName}`;
        return;
      }
    }

    if (baseTitle) {
      document.title = `${baseTitle} | ${siteName}`;
    } else {
      document.title = siteName;
    }
  }, [matches, params]);

  return null;
}

export default PageTitle;