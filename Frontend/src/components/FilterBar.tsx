// components/ActiveFiltersDisplay.tsx
import { motion } from "motion/react";
import { Badge } from "./ui/badge";

export interface ActiveFilter {
  type: string;
  value: string;
  label: string;
}

interface ActiveFiltersDisplayProps {
  activeFilters: ActiveFilter[];
  onRemoveFilter: (filterType: string) => void;
  onClearAllFilters: () => void;
}

export function FilterBar({
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
}: ActiveFiltersDisplayProps) {
  if (activeFilters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6 p-4 bg-white rounded-lg border border-border shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Filtres actifs ({activeFilters.length})
          </span>
        </div>
        <button
          onClick={onClearAllFilters}
          className="text-sm text-[#009E60] hover:text-[#007d4d] font-medium flex items-center gap-1 transition-colors"
        >
          <span>✕</span>
          Tout effacer
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Badge
            key={filter.type}
            variant="secondary"
            className="bg-gradient-to-r from-[#009E60] to-[#007d4d] text-white border-none shadow-sm pr-1 cursor-pointer group hover:from-[#007d4d] hover:to-[#006640] transition-all"
            onClick={() => onRemoveFilter(filter.type)}
          >
            <span className="flex items-center gap-1">
              {filter.label}
              <span className="opacity-80 group-hover:opacity-100 transition-opacity text-xs">
                ×
              </span>
            </span>
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}