import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Gift,
  Receipt,
  Sparkles,
  Trash2,
  Upload,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { bachHoaXanhBillItems } from "../../data/budgetData";
import { Button } from "../Button";
import { cn } from "../../lib/utils";

export type OutsideExpenseTab = "manual" | "upload";

interface OutsideExpenseDrawerProps {
  initialTab: OutsideExpenseTab;
  onClose: () => void;
  onManualSave: () => void;
  onUploadSave: () => void;
  open: boolean;
}

type EditableBillItem = {
  id: number;
  amount: string;
  category: string;
  item: string;
};

const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const maxFileSize = 10 * 1024 * 1024;
const categories = ["Ăn uống", "Mua sắm", "Học tập", "Giải trí", "Khác"];

function parseAmount(amount: string) {
  const digits = amount.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function formatAmount(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function OutsideExpenseDrawer({
  initialTab,
  onClose,
  onManualSave,
  onUploadSave,
  open,
}: OutsideExpenseDrawerProps) {
  const [activeTab, setActiveTab] = useState<OutsideExpenseTab>(initialTab);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [initialTab, open]);

  if (!open) return null;

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
            <h2 className="text-xl font-extrabold text-momo-text">Nhập chi tiêu ngoài</h2>
            <p className="mt-1 text-sm text-momo-muted">
              Ghi lại tiền mặt, chuyển khoản ngoài MoMo hoặc hóa đơn giấy.
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

        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 px-6 py-4">
          {(["manual", "upload"] as const).map((tab) => (
            <button
              className={cn(
                "rounded-[14px] px-3 py-2 text-sm font-bold transition",
                activeTab === tab
                  ? "bg-momo-soft text-momo-primary"
                  : "bg-slate-50 text-momo-muted",
              )}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab === "manual" ? "Nhập thủ công" : "Upload hóa đơn"}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {activeTab === "manual" ? (
            <ManualExpenseForm onSave={onManualSave} />
          ) : (
            <UploadBillReview onUploadSave={onUploadSave} />
          )}
        </div>
      </aside>
    </div>
  );
}

function ManualExpenseForm({ onSave }: { onSave: () => void }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-momo-text">
          Số tiền
          <input className="mt-2 h-10 w-full rounded-[14px] border border-slate-200 px-3 text-sm font-bold outline-none focus:border-momo-primary/40" defaultValue="20.000đ" />
        </label>
        <label className="text-sm font-bold text-momo-text">
          Nguồn tiền
          <select className="mt-2 h-10 w-full rounded-[14px] border border-slate-200 px-3 text-sm font-bold outline-none focus:border-momo-primary/40" defaultValue="Tiền mặt">
            <option>Tiền mặt</option>
            <option>Ví MoMo</option>
            <option>Tài khoản NH</option>
          </select>
        </label>
        <label className="text-sm font-bold text-momo-text">
          Danh mục
          <select className="mt-2 h-10 w-full rounded-[14px] border border-slate-200 px-3 text-sm font-bold outline-none focus:border-momo-primary/40" defaultValue="Ăn uống">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-momo-text">
          Ngày
          <input className="mt-2 h-10 w-full rounded-[14px] border border-slate-200 px-3 text-sm font-bold outline-none focus:border-momo-primary/40" defaultValue="2026-05-10" type="date" />
        </label>
      </div>

      <label className="mt-4 block text-sm font-bold text-momo-text">
        Ghi chú
        <input className="mt-2 h-10 w-full rounded-[14px] border border-slate-200 px-3 text-sm font-bold outline-none focus:border-momo-primary/40" defaultValue="Bánh mì sáng" />
      </label>

      <div className="mt-5 flex gap-3 rounded-[18px] border border-momo-border bg-momo-soft/60 p-4">
        <WalletCards className="mt-0.5 h-5 w-5 shrink-0 text-momo-primary" />
        <p className="text-sm leading-6 text-momo-muted">
          Phù hợp cho gửi xe, nước suối, bánh mì, photocopy hoặc các khoản lặt vặt.
        </p>
      </div>

      <Button className="mt-5" onClick={onSave}>
        Lưu khoản chi
      </Button>
    </div>
  );
}

function UploadBillReview({ onUploadSave }: { onUploadSave: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usingSample, setUsingSample] = useState(true);
  const [merchant, setMerchant] = useState("Bách Hóa Xanh");
  const [date, setDate] = useState("2026-05-10");
  const [source, setSource] = useState("Tiền mặt");
  const [total, setTotal] = useState("168.000đ");
  const [items, setItems] = useState<EditableBillItem[]>(
    bachHoaXanhBillItems.map((item, index) => ({ ...item, id: index + 1 })),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [selectedFile]);

  const totalNumber = parseAmount(total);
  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + parseAmount(item.amount), 0),
    [items],
  );
  const totalMatches = totalNumber === itemsTotal;
  const categoryTotals = useMemo(() => {
    return items.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + parseAmount(item.amount);
      return acc;
    }, {});
  }, [items]);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setError("File chưa đúng định dạng. Vui lòng chọn JPG, PNG hoặc PDF.");
      return;
    }
    if (file.size > maxFileSize) {
      setError("File vượt quá 10MB. Vui lòng chọn file nhỏ hơn.");
      return;
    }
    setSelectedFile(file);
    setUsingSample(false);
    setError(null);
  }

  function updateItem(id: number, patch: Partial<EditableBillItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-5">
      <input
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
        ref={fileInputRef}
        type="file"
      />
      <button
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-[20px] border border-dashed px-4 py-5 text-center transition",
          isDragging
            ? "border-momo-primary bg-momo-soft text-momo-primary"
            : "border-momo-primary/35 bg-momo-soft/60 text-momo-text hover:border-momo-primary hover:bg-momo-soft",
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event: DragEvent<HTMLButtonElement>) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0]);
        }}
        type="button"
      >
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-momo-primary" />
          <Upload className="h-5 w-5 text-momo-violet" />
        </div>
        <span className="mt-2 text-sm font-extrabold text-momo-text">Kéo & thả hóa đơn vào đây</span>
        <span className="mt-1 text-xs text-momo-muted">hoặc click để chọn file</span>
        <span className="mt-1 text-xs text-momo-muted">JPG, PNG, PDF tối đa 10MB</span>
      </button>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => {
            setSelectedFile(null);
            setUsingSample(true);
            setError(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          size="sm"
          variant="secondary"
        >
          Dùng bill mẫu
        </Button>
        {error && <p className="text-sm font-semibold text-orange-700">{error}</p>}
      </div>

      {(usingSample || selectedFile) && (
        <div className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-white p-3">
          {usingSample || previewUrl ? (
            <img
              alt="Bill preview"
              className="h-16 w-12 rounded-[12px] border border-slate-100 object-cover"
              src={previewUrl ?? "/images/bach-hoa-xanh-bill.png"}
            />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-[14px] bg-momo-soft text-momo-primary">
              <FileText className="h-6 w-6" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-momo-text">
              {selectedFile ? selectedFile.name : "Bách Hóa Xanh - 168.000đ"}
            </p>
            <p className="mt-1 text-xs text-momo-muted">
              {selectedFile ? `${formatFileSize(selectedFile.size)} · Đã tải lên` : "Bill mẫu · Đã tải lên"}
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            AI đã đọc
          </span>
        </div>
      )}

      <section className="rounded-[20px] border border-momo-border bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-momo-violet" />
              <h3 className="text-lg font-extrabold text-momo-text">AI đã đọc hóa đơn</h3>
            </div>
            <p className="mt-1 text-sm text-momo-muted">Kiểm tra và chỉnh sửa trước khi ghi nhận.</p>
          </div>
          <CheckCircle className="h-5 w-5 text-momo-success" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <label className="text-xs font-bold text-momo-muted">
            Cửa hàng
            <input className="mt-1 h-9 w-full rounded-[12px] border border-slate-200 px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => setMerchant(event.target.value)} value={merchant} />
          </label>
          <label className="text-xs font-bold text-momo-muted">
            Ngày
            <input className="mt-1 h-9 w-full rounded-[12px] border border-slate-200 px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => setDate(event.target.value)} type="date" value={date} />
          </label>
          <label className="text-xs font-bold text-momo-muted">
            Nguồn tiền
            <select className="mt-1 h-9 w-full rounded-[12px] border border-slate-200 px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => setSource(event.target.value)} value={source}>
              <option>Tiền mặt</option>
              <option>Ví MoMo</option>
              <option>Tài khoản NH</option>
            </select>
          </label>
          <label className="text-xs font-bold text-momo-muted">
            Tổng tiền
            <input className="mt-1 h-9 w-full rounded-[12px] border border-slate-200 px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => setTotal(event.target.value)} value={total} />
          </label>
        </div>

        <div className="mt-4 max-h-[310px] overflow-y-auto rounded-[16px] border border-slate-100">
          {items.map((item) => (
            <div className="grid grid-cols-1 gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0 sm:grid-cols-[minmax(0,1.4fr)_110px_116px_34px]" key={item.id}>
              <input className="h-9 min-w-0 rounded-[12px] border border-slate-200 px-3 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => updateItem(item.id, { item: event.target.value })} value={item.item} />
              <input className="h-9 rounded-[12px] border border-slate-200 px-3 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => updateItem(item.id, { amount: event.target.value })} value={item.amount} />
              <select className="h-9 rounded-[12px] border border-slate-200 px-2 text-sm font-semibold text-momo-text outline-none focus:border-momo-primary/40" onChange={(event) => updateItem(item.id, { category: event.target.value })} value={item.category}>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <button className="grid h-9 w-9 place-items-center rounded-[12px] text-slate-400 transition hover:bg-orange-50 hover:text-orange-700" onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))} type="button">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <Button className="mt-3" onClick={() => setItems((current) => [...current, { id: Date.now(), item: "Món mới", amount: "0đ", category: "Ăn uống" }])} size="sm" variant="secondary">
          + Thêm món
        </Button>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-[18px] border border-violet-100 bg-violet-50/60 p-3">
          <p className="text-sm font-extrabold text-momo-text">AI phân loại vào ngân sách</p>
          <div className="mt-2 space-y-1 text-sm font-bold text-momo-text">
            {Object.entries(categoryTotals)
              .filter(([, value]) => value > 0)
              .map(([category, value]) => (
                <p key={category}>
                  {category}: {formatAmount(value)}
                </p>
              ))}
            <p>Tiền mặt: -{formatAmount(totalNumber)}</p>
          </div>
        </div>
        <div className="rounded-[18px] border border-slate-100 bg-slate-50 p-3">
          <p className="text-sm font-extrabold text-momo-text">Budget impact</p>
          <div className="mt-2 space-y-1 text-sm font-semibold text-momo-muted">
            <p>Tiền mặt: 220.000đ → 52.000đ</p>
            <p>Ăn uống: 450.000đ → 305.000đ</p>
            <p>Mua sắm: 150.000đ → 127.000đ</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-[16px] border border-slate-100 bg-white px-4 py-3">
        {totalMatches ? (
          <CheckCircle className="h-4 w-4 text-momo-success" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-momo-warning" />
        )}
        <p className="text-sm font-bold text-momo-text">
          {totalMatches ? "Tổng món khớp với hóa đơn" : "Tổng món chưa khớp với tổng hóa đơn"}
        </p>
      </div>

      <div className="rounded-[18px] border border-momo-border bg-momo-soft/65 p-4">
        <div className="flex flex-wrap items-start gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-[14px] bg-white text-momo-primary">
            <Gift className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-momo-text">Ưu đãi phù hợp</p>
            <p className="mt-1 font-bold text-momo-text">Giảm 30.000đ cho thịt, cá</p>
            <p className="mt-1 text-sm text-momo-muted">
              Bill có thịt/cá và tổng hóa đơn trên 120.000đ.
            </p>
            <p className="mt-1 text-xs font-semibold text-momo-muted">Hạn dùng: 07/06/2026</p>
          </div>
          <Button size="sm" variant="secondary">
            Áp dụng ưu đãi
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="secondary">Chỉnh sửa thêm</Button>
        <Button onClick={onUploadSave}>Ghi nhận hóa đơn</Button>
      </div>
    </div>
  );
}
