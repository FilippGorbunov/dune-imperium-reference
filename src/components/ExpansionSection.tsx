
import { useEffect, useRef } from "react";
import type { Expansion } from "../data/mechanics";

interface Props {
  expansion: Expansion;
  selectedIds: Set<string>;
  onToggleExpansion: (expansion: Expansion) => void;
  onToggleMechanic: (id: string) => void;
}

export default function ExpansionSection({
  expansion,
  selectedIds,
  onToggleExpansion,
  onToggleMechanic,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const selectedCount = expansion.mechanics.filter((mechanic) =>
    selectedIds.has(mechanic.id)
  ).length;

  const allSelected =
    selectedCount === expansion.mechanics.length;

  const partiallySelected =
    selectedCount > 0 && !allSelected;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  return (
    <section className="expansion">
      <label className="expansion-header">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={allSelected}
          onChange={() => onToggleExpansion(expansion)}
        />

        <span>{expansion.name}</span>

        <span className="mechanic-count">
          {selectedCount}/{expansion.mechanics.length}
        </span>
      </label>

      <div className="mechanics-list">
        {expansion.mechanics.map((mechanic) => (
          <label
            key={mechanic.id}
            className="mechanic"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(mechanic.id)}
              onChange={() => onToggleMechanic(mechanic.id)}
            />

            <span>{mechanic.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
