import { useEffect, useRef, useState } from "react";

type PdfViewerProps = {
  url: string;
  className?: string;
  initialScale?: number;
};

export default function PdfViewer({
  url,
  className,
  initialScale = 1.1,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDistanceRef = useRef<number | null>(null);
  const inertiaRef = useRef<number | null>(null);
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastMoveRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const [scale, setScale] = useState(initialScale);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let pdfTask: { destroy?: () => void } | null = null;

    const renderPdf = async () => {
      if (!containerRef.current) return;
      setIsLoading(true);

      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();

      const loadingTask = pdfjsLib.getDocument(url);
      pdfTask = loadingTask;
      const pdf = await loadingTask.promise;

      if (isCancelled) return;
      setPageCount(pdf.numPages);

      const container = containerRef.current;
      container.innerHTML = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
        if (isCancelled) return;
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = `${Math.ceil(viewport.width)}px`;
        canvas.style.height = `${Math.ceil(viewport.height)}px`;
        canvas.className = "h-auto";

        const pageWrapper = document.createElement("div");
        pageWrapper.className = "border border-white/[0.08] rounded overflow-hidden bg-black/20 w-fit";
        pageWrapper.appendChild(canvas);
        container.appendChild(pageWrapper);

        await page.render({ canvasContext: context, viewport }).promise;
      }

      if (!isCancelled) setIsLoading(false);
    };

    renderPdf();

    return () => {
      isCancelled = true;
      if (pdfTask?.destroy) pdfTask.destroy();
    };
  }, [url, scale]);

  const stopInertia = () => {
    if (inertiaRef.current) {
      cancelAnimationFrame(inertiaRef.current);
      inertiaRef.current = null;
    }
  };

  const startInertia = () => {
    const target = scrollRef.current;
    if (!target) return;
    let { x, y } = velocityRef.current;
    const decay = 0.92;
    const step = () => {
      if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        inertiaRef.current = null;
        <div className="h-[100vh] border border-white/[0.08] rounded bg-black/10 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex h-full flex-col gap-4 overflow-auto pdf-scroll p-3 cursor-grab active:cursor-grabbing select-none touch-none"
            onPointerDown={(event) => {
      x *= decay;
      y *= decay;
      inertiaRef.current = requestAnimationFrame(step);
    };
    inertiaRef.current = requestAnimationFrame(step);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4 pb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#706d65]">
            }}
            onPointerMove={(event) => {
          <button
            type="button"
            className="border border-white/[0.12] px-2 py-1 hover:border-white/40 hover:text-[#ebe6dd] transition-colors"
            onClick={() => setScale((prev) => Math.max(0.6, prev - 0.1))}
          >
            -
          </button>
          <span className="min-w-[48px] text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            className="border border-white/[0.12] px-2 py-1 hover:border-white/40 hover:text-[#ebe6dd] transition-colors"
            onClick={() => setScale((prev) => Math.min(2.0, prev + 0.1))}
          >
            +
          </button>
        </div>
      </div>
      <div className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center border border-white/[0.08] rounded bg-black/20 h-[240px] text-[#706d65] font-mono text-xs uppercase tracking-[0.2em]">
            Loading PDF...
          </div>
        ) : null}
        <div
          ref={scrollRef}
          className="flex flex-col gap-4 overflow-auto pdf-scroll h-[100vh] p-3 border border-white/[0.08] rounded bg-black/10 cursor-grab active:cursor-grabbing select-none touch-none"
          onPointerDown={(event) => {
            const target = scrollRef.current;
            if (!target) return;
            event.preventDefault();
            stopInertia();
            target.setPointerCapture(event.pointerId);
            pointersRef.current.set(event.pointerId, {
              x: event.clientX,
              y: event.clientY,
            });
            target.dataset.dragging = "true";
            target.dataset.startX = String(event.clientX);
            target.dataset.startY = String(event.clientY);
            target.dataset.scrollLeft = String(target.scrollLeft);
            target.dataset.scrollTop = String(target.scrollTop);
            lastMoveRef.current = { x: event.clientX, y: event.clientY, t: performance.now() };
          }}
          onPointerMove={(event) => {
            const target = scrollRef.current;
            if (!target || target.dataset.dragging !== "true") return;
            pointersRef.current.set(event.pointerId, {
              x: event.clientX,
              y: event.clientY,
            });

            const pointers = Array.from(pointersRef.current.values());
            if (pointers.length >= 2) {
              const [p1, p2] = pointers;
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const distance = Math.hypot(dx, dy);
              if (lastPinchDistanceRef.current) {
                const delta = distance - lastPinchDistanceRef.current;
                if (Math.abs(delta) > 2) {
                  setScale((prev) => {
                    const next = prev + delta / 300;
                    return Math.min(2.5, Math.max(0.6, Number(next.toFixed(2))));
                  });
                }
              }
              lastPinchDistanceRef.current = distance;
              return;
            }

            const startX = Number(target.dataset.startX || 0);
            const startY = Number(target.dataset.startY || 0);
            const startLeft = Number(target.dataset.scrollLeft || 0);
            const startTop = Number(target.dataset.scrollTop || 0);
            target.scrollLeft = startLeft - (event.clientX - startX);
            target.scrollTop = startTop - (event.clientY - startY);

            const lastMove = lastMoveRef.current;
            const now = performance.now();
            if (lastMove) {
              const dt = Math.max(1, now - lastMove.t);
              velocityRef.current = {
                x: (event.clientX - lastMove.x) / dt * 16,
                y: (event.clientY - lastMove.y) / dt * 16,
              };
            }
            lastMoveRef.current = { x: event.clientX, y: event.clientY, t: now };
            }}
            onPointerUp={(event) => {
            const target = scrollRef.current;
            if (!target) return;
            target.releasePointerCapture(event.pointerId);
            pointersRef.current.delete(event.pointerId);
            if (pointersRef.current.size < 2) {
              lastPinchDistanceRef.current = null;
            }
            target.dataset.dragging = "false";
            if (pointersRef.current.size === 0) {
              startInertia();
            }
            }}
            onPointerLeave={() => {
            const target = scrollRef.current;
            if (!target) return;
            target.dataset.dragging = "false";
            pointersRef.current.clear();
            lastPinchDistanceRef.current = null;
            }}
          >
            <div ref={containerRef} className="flex flex-col gap-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
