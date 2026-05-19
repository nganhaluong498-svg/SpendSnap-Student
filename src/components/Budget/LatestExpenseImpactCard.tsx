import { Coffee, Wallet } from "lucide-react";
import { latestExpenseImpact } from "../../data/budgetData";
import { Button } from "../Button";
import { Card } from "../Card";

interface LatestExpenseImpactCardProps {
  onOpenDetails: () => void;
}

export function LatestExpenseImpactCard({ onOpenDetails }: LatestExpenseImpactCardProps) {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Khoản chi vừa ghi nhận</h2>
          <p className="mt-1 text-sm text-momo-muted">Minh họa cách trừ ngân sách 2 lớp</p>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] bg-momo-soft text-momo-primary">
          <Coffee className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 rounded-[18px] border border-momo-border bg-momo-soft/60 p-3.5">
        <p className="text-sm font-bold text-momo-text">{latestExpenseImpact.merchant}</p>
        <p className="mt-1 text-sm text-momo-muted">{latestExpenseImpact.expense}</p>
        <p className="mt-2 text-2xl font-extrabold leading-none text-momo-text">
          {latestExpenseImpact.amount}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {latestExpenseImpact.impacts.map((impact) => (
          <div
            className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-2"
            key={impact}
          >
            <div className="grid h-6 w-6 place-items-center rounded-full bg-slate-50 text-momo-primary">
              <Wallet className="h-3.5 w-3.5" />
            </div>
            <p className="text-xs font-extrabold text-momo-text">{impact}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-momo-muted">
        Khoản chi này được trừ đồng thời vào nguồn tiền và danh mục.
      </p>

      <Button className="mt-3" onClick={onOpenDetails} size="sm" variant="secondary">
        Xem chi tiết tác động
      </Button>
    </Card>
  );
}
