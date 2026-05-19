import { Card } from "../Card";
import { ProgressBar } from "../ProgressBar";

export function BudgetOverviewCard() {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-extrabold text-momo-text">Tổng quan ngân sách</h2>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          Đang kiểm soát tốt
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-momo-muted">Còn lại</p>
        <p className="mt-1 text-[30px] font-extrabold leading-none text-momo-text">2.350.000đ</p>
        <p className="mt-2 text-sm text-momo-muted">Đã chi 1.650.000đ / 4.000.000đ</p>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-momo-muted">41% ngân sách đã sử dụng</span>
          <span className="font-bold text-momo-text">41%</span>
        </div>
        <ProgressBar className="h-2" value={41} />
      </div>
    </Card>
  );
}
