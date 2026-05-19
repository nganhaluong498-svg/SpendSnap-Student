import { Coffee, Utensils, Wallet, X } from "lucide-react";
import { latestExpenseImpact } from "../../data/budgetData";
import { Button } from "../Button";

interface ExpenseImpactDrawerProps {
  onClose: () => void;
  open: boolean;
}

export function ExpenseImpactDrawer({ onClose, open }: ExpenseImpactDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Chi tiết tác động ngân sách</h2>
            <p className="mt-1 text-sm text-momo-muted">Một khoản chi được ghi vào 2 lớp.</p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="rounded-[20px] border border-momo-border bg-momo-soft/55 p-4">
            <div className="flex gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] bg-white text-momo-primary">
                <Coffee className="h-4 w-4" />
              </div>
              <div>
                <p className="font-extrabold text-momo-text">{latestExpenseImpact.merchant}</p>
                <p className="mt-1 text-sm text-momo-muted">{latestExpenseImpact.expense}</p>
                <p className="mt-2 text-2xl font-extrabold leading-none text-momo-text">
                  {latestExpenseImpact.amount}
                </p>
                <p className="mt-2 text-xs font-semibold text-momo-muted">
                  Thời gian: 10:23 - 10/05/2026
                </p>
              </div>
            </div>
          </div>

          <section className="mt-5">
            <h3 className="text-sm font-extrabold text-momo-text">Nguồn tiền bị trừ</h3>
            <div className="mt-2 flex items-center justify-between gap-3 rounded-[16px] border border-slate-100 bg-white px-3 py-3">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-momo-text">
                <Wallet className="h-4 w-4 text-momo-primary" />
                Ví MoMo
              </span>
              <span className="text-sm font-extrabold text-momo-muted">700.000đ → 655.000đ</span>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-sm font-extrabold text-momo-text">Danh mục bị trừ</h3>
            <div className="mt-2 flex items-center justify-between gap-3 rounded-[16px] border border-slate-100 bg-white px-3 py-3">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-momo-text">
                <Utensils className="h-4 w-4 text-momo-violet" />
                Ăn uống
              </span>
              <span className="text-sm font-extrabold text-momo-muted">450.000đ → 405.000đ</span>
            </div>
          </section>

          <p className="mt-5 rounded-[18px] border border-momo-border bg-momo-soft/55 px-4 py-3 text-sm font-semibold leading-6 text-momo-muted">
            Một khoản chi luôn có 2 tác động: tiền đi ra từ đâu và tiền dùng vào việc gì.
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Đóng
          </Button>
          <Button onClick={onClose}>Chỉnh khoản chi</Button>
        </div>
      </aside>
    </div>
  );
}
