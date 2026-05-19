import { BookOpen, CheckCircle, Clock, Clapperboard, Coffee, Utensils } from "lucide-react";
import { Card } from "../Card";
import { cn } from "../../lib/utils";

const records = [
  {
    merchant: "The Coffee House",
    time: "10:23 - 10/05/2026",
    category: "Ăn uống",
    amount: "45.000đ",
    status: "Đã ghi nhận",
    statusTone: "success",
    icon: Coffee,
    bg: "bg-momo-soft text-momo-primary",
  },
  {
    merchant: "Bún chả Hà Nội",
    time: "12:05 - 09/05/2026",
    category: "Ăn uống",
    amount: "65.000đ",
    status: "Đã ghi nhận",
    statusTone: "success",
    icon: Utensils,
    bg: "bg-orange-50 text-orange-600",
  },
  {
    merchant: "CGV Vincom Center",
    time: "20:45 - 08/05/2026",
    category: "Giải trí",
    amount: "120.000đ",
    status: "Đã ghi nhận",
    statusTone: "success",
    icon: Clapperboard,
    bg: "bg-violet-50 text-momo-violet",
  },
  {
    merchant: "Nhà sách Fahasa",
    time: "16:10 - 07/05/2026",
    category: "Học tập",
    amount: "85.000đ",
    status: "Chờ kiểm tra",
    statusTone: "warning",
    icon: BookOpen,
    bg: "bg-sky-50 text-sky-600",
  },
];

export function RecentAIRecordsCard() {
  return (
    <Card className="h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Ghi nhận gần đây từ AI</h2>
          <p className="mt-1 text-sm text-momo-muted">4 khoản chi mới nhất</p>
        </div>
        <button
          className="text-sm font-bold text-momo-primary transition hover:text-momo-magenta"
          type="button"
        >
          Xem tất cả
        </button>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {records.map((record) => {
          const Icon = record.icon;
          const isSuccess = record.statusTone === "success";

          return (
            <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={record.merchant}>
              <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-[16px]", record.bg)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-momo-text">{record.merchant}</p>
                <p className="mt-1 truncate text-xs text-momo-muted">
                  {record.time} · {record.category}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-extrabold text-momo-text">{record.amount}</p>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                    isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700",
                  )}
                >
                  {isSuccess ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  {record.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
