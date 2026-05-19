import { CheckCircle, X } from "lucide-react";
import { Button } from "../Button";

interface BudgetSetupDrawerProps {
  onClose: () => void;
  onSave: () => void;
  open: boolean;
}

const sourceFields = [
  ["Ví MoMo", "2.000.000đ"],
  ["Tài khoản ngân hàng", "1.500.000đ"],
  ["Tiền mặt", "500.000đ"],
];

const categoryFields = [
  ["Ăn uống", "1.500.000đ"],
  ["Mua sắm", "800.000đ"],
  ["Học tập", "600.000đ"],
  ["Giải trí", "500.000đ"],
  ["Khác / dự phòng", "600.000đ"],
];

function BudgetField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-bold text-momo-text">
      {label}
      <input
        className="mt-2 h-11 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none transition focus:border-momo-primary/40"
        defaultValue={value}
      />
    </label>
  );
}

export function BudgetSetupDrawer({ onClose, onSave, open }: BudgetSetupDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[620px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Thiết lập ngân sách tháng</h2>
            <p className="mt-1 text-sm text-momo-muted">
              Chia ngân sách theo nguồn tiền và danh mục chi tiêu.
            </p>
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
          <section>
            <h3 className="font-extrabold text-momo-text">Nguồn tiền</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {sourceFields.map(([label, value]) => (
                <BudgetField key={label} label={label} value={value} />
              ))}
            </div>
          </section>

          <section className="mt-7">
            <h3 className="font-extrabold text-momo-text">Danh mục chi tiêu</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {categoryFields.map(([label, value]) => (
                <BudgetField key={label} label={label} value={value} />
              ))}
            </div>
          </section>

          <div className="mt-7 rounded-[20px] border border-momo-border bg-momo-soft/65 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold text-momo-muted">Tổng nguồn tiền</p>
                <p className="mt-1 font-extrabold text-momo-text">4.000.000đ</p>
              </div>
              <div>
                <p className="text-xs font-bold text-momo-muted">Tổng danh mục</p>
                <p className="mt-1 font-extrabold text-momo-text">4.000.000đ</p>
              </div>
              <div className="flex items-center gap-2 rounded-[16px] bg-white px-3 py-2 text-sm font-bold text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                Đã phân bổ đủ
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button onClick={onSave}>Lưu ngân sách</Button>
        </div>
      </aside>
    </div>
  );
}
