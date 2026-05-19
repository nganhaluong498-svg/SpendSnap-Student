import type { CategoryTone } from "../data/mockData";
import { cn } from "../lib/utils";

interface CategoryChipProps {
  label: string;
  tone?: CategoryTone;
  value: number;
}

const toneClasses: Record<CategoryTone, string> = {
  pink: "border-momo-border bg-momo-soft text-momo-magenta",
  violet: "border-violet-100 bg-violet-50 text-momo-violet",
  warning: "border-orange-100 bg-orange-50 text-orange-700",
};

export function CategoryChip({ label, tone = "pink", value }: CategoryChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
        toneClasses[tone],
      )}
    >
      <span>{label}</span>
      <span>{value}%</span>
    </span>
  );
}
