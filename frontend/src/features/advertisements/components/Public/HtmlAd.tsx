import { useEffect, useRef } from "react";

export default function HtmlAd({ html }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const responsiveHtml = html
    .replace(/width\s*:\s*[^;]+;?/gi, "width:100%;")
    .replace(/height\s*:\s*[^;]+;?/gi, "height:100%;");
console.log(responsiveHtml)
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    requestAnimationFrame(() => {
      const scaleX = container.clientWidth / content.scrollWidth;
      const scaleY = container.clientHeight / content.scrollHeight;

      const scale = Math.min(scaleX, scaleY);

      content.style.transform = `scale(${scale})`;
      content.style.transformOrigin = "top left";
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden"
    >
      <div
        ref={contentRef}
        className="w-fit h-fit"
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