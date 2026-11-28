import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

interface Props {
  blob: Blob;
}

export default function PdfPreview({ blob }: Props) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | undefined;
    let pdf: PDFDocumentProxy | undefined;
    const renderTasks: RenderTask[] = [];

    async function renderPdf() {
      const pagesElement = pagesRef.current;

      if (!pagesElement) {
        return;
      }

      pagesElement.replaceChildren();
      setLoading(true);
      setError(null);

      try {
        const data = new Uint8Array(await blob.arrayBuffer());

        if (cancelled) {
          return;
        }

        const [pdfjs, worker] = await Promise.all([
          import("pdfjs-dist"),
          import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
        ]);

        if (cancelled) {
          return;
        }

        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        loadingTask = pdfjs.getDocument({ data });
        pdf = await loadingTask.promise;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          if (cancelled) {
            return;
          }

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const availableWidth = Math.max(pagesElement.clientWidth - 24, 1);
          const scale = availableWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const outputScale = Math.min(window.devicePixelRatio || 1, 2);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Could not create a canvas for the PDF preview.");
          }

          canvas.className = "pdf-page-canvas";
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          pagesElement.append(canvas);

          const renderTask = page.render({
            canvas,
            canvasContext: context,
            viewport,
            transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
          });

          renderTasks.push(renderTask);
          await renderTask.promise;
        }
      } catch (caughtError) {
        if (!cancelled) {
          console.error("PDF preview failed:", caughtError);
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not display the PDF preview.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void renderPdf();

    return () => {
      cancelled = true;
      renderTasks.forEach((task) => task.cancel());
      void loadingTask?.destroy();
    };
  }, [blob]);

  return (
    <div className="pdf-viewer" aria-label="PDF preview">
      {loading && <p className="pdf-preview-status">Preparing PDF preview...</p>}
      {error && (
        <p className="pdf-preview-error" role="alert">
          {error} You can still download the PDF below.
        </p>
      )}
      <div className="pdf-pages" ref={pagesRef} />
    </div>
  );
}
