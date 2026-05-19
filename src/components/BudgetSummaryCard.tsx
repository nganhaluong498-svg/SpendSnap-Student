import type { PageId } from "../types/navigation";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";

export function BudgetSummaryCard({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Tháng này của bạn</h2>
          <p className="mt-1 text-sm text-momo-muted">Cập nhật theo khoản chi đã ghi nhận</p>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-bold text-momo-success">
          Đang ổn
        </span>
      </div>

      <div className="mt-5">
        <div>
          <p className="text-sm font-semibold text-momo-muted">Còn lại</p>
          <p className="mt-2 text-[32px] font-extrabold leading-none tracking-normal text-momo-text">
            2.350.000đ
          </p>
          <p className="mt-2 text-sm text-momo-muted">Đã chi 1.650.000đ / 4.000.000đ</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-momo-muted">Tiến độ chi tiêu</span>
          <span className="font-bold text-momo-text">41%</span>
        </div>
        <ProgressBar value={41} />
      </div>

      <button
        className="mt-5 inline-flex h-9 items-center rounded-full border border-momo-border bg-white px-4 text-sm font-bold text-momo-primary transition hover:border-momo-primary/30 hover:bg-momo-soft"
        onClick={() => onNavigate("Ngân sách")}
        type="button"
      >
        Xem thêm Ngân sách →
      </button>
    </Card>
  );
}
