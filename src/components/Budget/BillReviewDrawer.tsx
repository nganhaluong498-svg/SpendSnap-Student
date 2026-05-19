import { AlertTriangle, CheckCircle, Gift, Plus, Receipt, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { bachHoaXanhBillItems } from "../../data/budgetData";
import { Button } from "../Button";

interface BillReviewDrawerProps {
  onClose: () => void;
  open: boolean;
}

type EditableBillItem = {
  id: number;
  amount: string;
  category: string;
  item: string;
};

const categories = ["Ăn uống", "Mua sắm", "Học tập", "Giải trí"];

function parseAmount(amount: string) {
  const digits = amount.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function formatAmount(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

export function BillReviewDrawer({ onClose, open }: BillReviewDrawerProps) {
  const [merchant, setMerchant] = useState("Bách Hóa Xanh");
  const [date, setDate] = useState("2026-05-10");
  const [source, setSource] = useState("Tiền mặt");
  const [total, setTotal] = useState("168.000đ");
  const [items, setItems] = useState<EditableBillItem[]>(
    bachHoaXanhBillItems.map((item, index) => ({ ...item, id: index + 1 })),
  );

  const totalNumber = parseAmount(total);
  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + parseAmount(item.amount), 0),
    [items],
  );
  const totalMatches = totalNumber === itemsTotal;

  function updateItem(id: number, patch: Partial<EditableBillItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { id: Date.now(), item: "Món mới", amount: "0đ", category: "Ăn uống" },
    ]);
  }

  function deleteItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[760px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-momo-muted">
              Upload hóa đơn
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-momo-text">AI đã đọc hóa đơn</h2>
            <p className="mt-1 text-sm text-momo-muted">
              Kiểm tra và chỉnh sửa trước khi ghi nhận.
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
          <div className="rounded-[20px] border border-momo-border bg-momo-soft/45 p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <label className="text-xs font-bold text-momo-muted">
                Cửa hàng
                <input
                  className="mt-1 h-10 w-full rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  onChange={(event) => setMerchant(event.target.value)}
                  value={merchant}
                />
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Ngày
                <input
                  className="mt-1 h-10 w-full rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  onChange={(event) => setDate(event.target.value)}
                  type="date"
                  value={date}
                />
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Nguồn tiền
                <select
                  className="mt-1 h-10 w-full rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  onChange={(event) => setSource(event.target.value)}
                  value={source}
                >
                  <option>Tiền mặt</option>
                  <option>Ví MoMo</option>
                  <option>Tài khoản NH</option>
                </select>
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Tổng tiền
                <input
                  className="mt-1 h-10 w-full rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  onChange={(event) => setTotal(event.target.value)}
                  value={total}
                />
              </label>
            </div>
          </div>

          <div className="mt-5 rounded-[20px] border border-slate-100 bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-momo-primary" />
                <h3 className="text-base font-extrabold text-momo-text">Danh sách món</h3>
              </div>
              <Button
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={addItem}
                size="sm"
                variant="secondary"
              >
                Thêm món
              </Button>
            </div>

            <div className="max-h-[330px] overflow-y-auto">
              {items.map((item) => (
                <div
                  className="grid grid-cols-1 gap-2 border-b border-slate-100 px-4 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1.4fr)_110px_120px_36px] sm:items-center"
                  key={item.id}
                >
                  <input
                    className="h-10 min-w-0 rounded-[12px] border border-slate-200 px-3 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40"
                    onChange={(event) => updateItem(item.id, { item: event.target.value })}
                    value={item.item}
                  />
                  <input
                    className="h-10 rounded-[12px] border border-slate-200 px-3 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40"
                    onChange={(event) => updateItem(item.id, { amount: event.target.value })}
                    value={item.amount}
                  />
                  <select
                    className="h-10 rounded-[12px] border border-slate-200 px-2 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40"
                    onChange={(event) => updateItem(item.id, { category: event.target.value })}
                    value={item.category}
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <button
                    aria-label={`Xóa ${item.item}`}
                    className="grid h-9 w-9 place-items-center rounded-[12px] text-slate-400 transition hover:bg-orange-50 hover:text-orange-700"
                    onClick={() => deleteItem(item.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[20px] border border-violet-100 bg-violet-50/60 p-4">
              <h3 className="text-sm font-extrabold text-momo-text">AI phân loại vào ngân sách</h3>
              <div className="mt-3 space-y-2 text-sm font-bold text-momo-text">
                <p>Ăn uống: 145.000đ</p>
                <p>Mua sắm: 23.000đ</p>
                <p>Tiền mặt: -168.000đ</p>
              </div>
            </div>
            <div className="rounded-[20px] border border-slate-100 bg-slate-50 p-4">
              <h3 className="text-sm font-extrabold text-momo-text">Ảnh hưởng ngân sách</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-momo-muted">
                <p>Tiền mặt: 220.000đ → 52.000đ</p>
                <p>Ăn uống: 450.000đ → 305.000đ</p>
                <p>Mua sắm: 150.000đ → 127.000đ</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-[16px] border border-slate-100 bg-white px-4 py-3">
            {totalMatches ? (
              <CheckCircle className="h-4 w-4 text-momo-success" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-momo-warning" />
            )}
            <p className="text-sm font-bold text-momo-text">
              {totalMatches
                ? "Tổng món khớp với hóa đơn"
                : `Tổng món chưa khớp với tổng hóa đơn (${formatAmount(itemsTotal)})`}
            </p>
          </div>

          <div className="mt-5 rounded-[20px] border border-momo-border bg-momo-soft/70 p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[15px] bg-white text-momo-primary">
                <Gift className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-momo-text">Ưu đãi phù hợp</h3>
                <p className="mt-2 font-bold text-momo-text">Giảm 30.000đ cho thịt, cá</p>
                <p className="mt-1 text-sm leading-6 text-momo-muted">
                  Bill có thịt/cá và tổng hóa đơn trên 120.000đ.
                </p>
                <p className="mt-1 text-xs font-semibold text-momo-muted">Hạn dùng: 07/06/2026</p>
              </div>
              <Button size="sm" variant="secondary">
                Áp dụng ưu đãi
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button>Ghi nhận khoản chi</Button>
        </div>
      </aside>
    </div>
  );
}
