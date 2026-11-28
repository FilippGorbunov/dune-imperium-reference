
import { jsPDF } from "jspdf";
import type { Expansion, Mechanic } from "../data/mechanics";

interface LoadedImage {
  data: string;
  width: number;
  height: number;
}

async function loadImage(path: string): Promise<LoadedImage> {
  const image = new Image();

  image.src = `${import.meta.env.BASE_URL}${path}`;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () =>
      reject(new Error(`Failed to load image: ${path}`));
  });

  const canvas = document.createElement("canvas");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  context.drawImage(image, 0, 0);

  return {
    data: canvas.toDataURL("image/png"),
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}

export async function generatePdf(
  expansions: Expansion[],
  selectedIds: Set<string>
): Promise<Blob> {

  // Collect selected mechanics while removing duplicates.
  // The first occurrence of an ID determines which image is used.
  const seenIds = new Set<string>();
  const selectedMechanics: Mechanic[] = [];

  for (const expansion of expansions) {
    for (const mechanic of expansion.mechanics) {
      if (
        selectedIds.has(mechanic.id) &&
        !seenIds.has(mechanic.id)
      ) {
        seenIds.add(mechanic.id);
        selectedMechanics.push(mechanic);
      }
    }
  }

  if (selectedMechanics.length === 0) {
    throw new Error("Please select at least one mechanic.");
  }

  // Separate wide-format and regular mechanics.
  const wideMechanics = selectedMechanics.filter(
    (mechanic) => mechanic.wideFormat
  );

  const regularMechanics = selectedMechanics.filter(
    (mechanic) => !mechanic.wideFormat
  );

  // Load all unique images.
  const imageCache = new Map<string, LoadedImage>();

  await Promise.all(
    selectedMechanics.map(async (mechanic) => {
      const image = await loadImage(mechanic.image);
      imageCache.set(mechanic.id, image);
    })
  );

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 12;
  const columnGap = 8;

  const contentWidth = pageWidth - margin * 2;

  const columnWidth =
    (contentWidth - columnGap) / 2;

  const top = margin;
  const bottom = pageHeight - margin - 8;

  const maxImageHeight = 105;
  const maxWideImageHeight = bottom - top;

  const imageGap = 1;

  let column = 0;
  let y = top;

  // The regular columns start below all wide-format images.
  let columnStartY = top;

  const getColumnX = () =>
    margin + column * (columnWidth + columnGap);

  function addNewPage() {
    pdf.addPage();

    column = 0;
    y = top;
    columnStartY = top;
  }

  function ensureColumnSpace(height: number) {
    if (y + height <= bottom) {
      return;
    }

    // Try the second column first.
    if (column === 0) {
      column = 1;
      y = columnStartY;

      if (y + height <= bottom) {
        return;
      }
    }

    // Neither column has enough room.
    addNewPage();
  }

  // --------------------------------------------------
  // 1. WIDE-FORMAT MECHANICS
  // --------------------------------------------------

  for (const mechanic of wideMechanics) {
    const image = imageCache.get(mechanic.id)!;

    // Scale to the full printable page width.
    // Also prevent images from exceeding page height.
    const scale = Math.min(
      contentWidth / image.width,
      maxWideImageHeight / image.height
    );

    const width = image.width * scale;
    const height = image.height * scale;

    // Wide images always start at the left margin.
    // If one doesn't fit, move it to a new page.
    if (y + height > bottom) {
      addNewPage();
    }

    const x = margin + (contentWidth - width) / 2;

    pdf.addImage(
      image.data,
      "PNG",
      x,
      y,
      width,
      height
    );

    y += height + imageGap;
  }

  // Remember where the two-column section should begin.
  columnStartY = y;

  // --------------------------------------------------
  // 2. REGULAR TWO-COLUMN MECHANICS
  // --------------------------------------------------

  for (const mechanic of regularMechanics) {
    const image = imageCache.get(mechanic.id)!;

    const scale = Math.min(
      columnWidth / image.width,
      maxImageHeight / image.height
    );

    const width = image.width * scale;
    const height = image.height * scale;

    ensureColumnSpace(height + imageGap);

    const x =
      getColumnX() + (columnWidth - width) / 2;

    pdf.addImage(
      image.data,
      "PNG",
      x,
      y,
      width,
      height
    );

    y += height + imageGap;
  }

  // --------------------------------------------------
  // 3. PAGE NUMBERS
  // --------------------------------------------------

  const totalPages = pdf.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    pdf.setPage(page);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(130, 130, 130);

    pdf.text(
      `${page} / ${totalPages}`,
      pageWidth - margin,
      pageHeight - 5,
      { align: "right" }
    );
  }

  return pdf.output("blob");
}
