import { useEffect, useState } from "react";
import { expansions } from "./data/mechanics";
import type { Expansion } from "./data/mechanics";
import ExpansionSection from "./components/ExpansionSection";
import PdfPreview from "./components/PdfPreview";
import { generatePdf } from "./utils/generatePdf";
import "./App.css";

function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Release temporary PDF URLs when replaced or when the
  // component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function toggleMechanic(id: string) {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  function toggleExpansion(expansion: Expansion) {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      const allSelected = expansion.mechanics.every((mechanic) => next.has(mechanic.id));

      expansion.mechanics.forEach((mechanic) => {
        if (allSelected) {
          next.delete(mechanic.id);
        } else {
          next.add(mechanic.id);
        }
      });

      return next;
    });
  }

  function selectAll() {
    const allIds = expansions.flatMap((expansion) =>
      expansion.mechanics.map((mechanic) => mechanic.id),
    );

    setSelectedIds(new Set(allIds));
  }

  function clearAll() {
    setSelectedIds(new Set());
  }

  async function handlePreviewPdf() {
    if (selectedIds.size === 0) {
      setError("Please select at least one mechanic.");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const blob = await generatePdf(expansions, selectedIds);

      const url = URL.createObjectURL(blob);

      setPreviewBlob(blob);
      setPreviewUrl(url);
    } catch (err) {
      console.error("PDF generation failed:", err);

      setError(err instanceof Error ? err.message : "Something went wrong generating the PDF.");
    } finally {
      setGenerating(false);
    }
  }

  function handleDownloadPdf() {
    if (!previewUrl) return;

    const link = document.createElement("a");

    link.href = previewUrl;
    link.download = "dune-imperium-reference.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function closePreview() {
    setPreviewUrl(null);
    setPreviewBlob(null);
  }

  const totalMechanics = expansions.reduce(
    (total, expansion) => total + expansion.mechanics.length,
    0,
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dune: Imperium</h1>
        <p>Rules Reference Generator</p>
      </header>

      <main className="container">
        <div className="intro">
          <h2>Select Mechanics</h2>

          <p>
            Select the expansions and individual mechanics you want included in your reference PDF.
            Any selected duplicate mechanics will be removed from the generated PDF (for example,
            many expansions have "Discard"). Also, some mechanics take up a full page so they are
            placed on the top of the page for spacing reasons.
          </p>
        </div>

        <div className="toolbar">
          <div className="selection-count">
            {selectedIds.size} of {totalMechanics} selected
          </div>

          <div className="toolbar-actions">
            <button className="secondary-button" onClick={selectAll}>
              Select All
            </button>

            <button className="secondary-button" onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>

        <div className="expansions">
          {expansions.map((expansion) => (
            <ExpansionSection
              key={expansion.id}
              expansion={expansion}
              selectedIds={selectedIds}
              onToggleExpansion={toggleExpansion}
              onToggleMechanic={toggleMechanic}
            />
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          className="generate-button"
          onClick={handlePreviewPdf}
          disabled={generating || selectedIds.size === 0}
        >
          {generating ? "Generating Preview..." : "Preview PDF"}
        </button>

        <p className="footer-note">{selectedIds.size} mechanics will be included in your PDF.</p>

        {previewUrl && previewBlob && (
          <section className="preview-section">
            <div className="preview-header">
              <div>
                <h2>PDF Preview</h2>
                <p>Review your reference before downloading.</p>
              </div>

              <button className="close-button" onClick={closePreview}>
                Close
              </button>
            </div>

            <PdfPreview blob={previewBlob} />

            <button className="download-button" onClick={handleDownloadPdf}>
              Download PDF
            </button>
          </section>
        )}
      </main>
      <footer className="site-footer">
        This is a fan made project to help other people learn and play the game. No money is being
        made from this project. It is not affiliated with Dire Wolf or any other company. All rights
        to the game and its content belong to their respective owners. If you are a copyright holder
        and would like this project to be taken down, please contact me at{" "}
        <a href="mailto:Filippgorb@gmail.com">Filippgorb@gmail.com</a>.
      </footer>
    </div>
  );
}

export default App;
