import type { ReactNode } from "react";
import type { BudgetColor } from "../../data/budgetData";
import { cn } from "../../lib/utils";

const progressColors: Record<BudgetColor, string> = {
  pink: "bg-momo-primary",
  violet: "bg-momo-violet",
  orange: "bg-momo-warning",
  blue: "bg-sky-500",
  green: "bg-momo-success",
};

interface BudgetProgressRowProps {
  color: BudgetColor;
  icon: ReactNode;
  iconClassName?: string;
  label: string;
  percent: number;
  remaining: string;
  total: string;
  used: string;
  warning?: string;
}

export function BudgetProgressRow({
  color,
  icon,
  iconClassName,
  label,
  percent,
  remaining,
  total,
  used,
  warning,
}: BudgetProgressRowProps) {
  return (
    <div className="flex gap-2.5 py-2.5">
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-[12px]",
          iconClassName ?? "bg-momo-soft text-momo-primary",
        )}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-extrabold text-momo-text">{label}</p>
              {warning && (
                <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">
                  {warning}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs font-medium text-momo-muted">
              Còn {remaining} · Đã dùng {used} / {total}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-extrabold text-momo-text">
            {percent}%
          </span>
        </div>

        <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn("h-full rounded-full", progressColors[color])}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
