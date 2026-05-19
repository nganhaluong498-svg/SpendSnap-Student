import { cn } from "../lib/utils";

type ProgressTone = "pink" | "violet" | "warning" | "success";

interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
  className?: string;
}

const toneClasses: Record<ProgressTone, string> = {
  pink: "bg-gradient-to-r from-momo-primary to-momo-pink",
  violet: "bg-momo-violet",
  warning: "bg-momo-warning",
  success: "bg-momo-success",
};

export function ProgressBar({ className, tone = "pink", value }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      aria-label={`Tiến độ ${clampedValue}%`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={clampedValue}
      className={cn("h-3 overflow-hidden rounded-full bg-slate-100", className)}
      role="progressbar"
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", toneClasses[tone])}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
