import { useEffect, useRef } from "react";

export default function HtmlAd({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const responsiveHtml = html
    .replace(/width\s*:\s*[^;]+;?/gi, "width:100%;")
    .replace(/height\s*:\s*[^;]+;?/gi, "height:auto;");

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    const resizeAd = () => {
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;

      if (!contentWidth || !contentHeight) return;

      const scaleX = container.clientWidth / contentWidth;
      const scaleY = container.clientHeight / contentHeight;

      const scale = Math.min(scaleX, scaleY);

      content.style.transform = `scale(${scale})`;
      content.style.transformOrigin = "top left";
    };

    requestAnimationFrame(resizeAd);

    const observer = new ResizeObserver(resizeAd);
    observer.observe(container);

    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden flex items-start justify-center rounded-md" 
    >
      <div
        ref={contentRef}
        className="w-fit h-fit shrink-0"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: responsiveHtml,
          }}
        />
      </div>
    </div>
  );
}