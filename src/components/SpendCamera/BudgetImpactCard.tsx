import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { cn } from "../../lib/utils";

type BudgetColor = "pink" | "violet" | "orange" | "blue" | "green";
type MonthName =
  | "Tháng 1"
  | "Tháng 2"
  | "Tháng 3"
  | "Tháng 4"
  | "Tháng 5"
  | "Tháng 6"
  | "Tháng 7"
  | "Tháng 8"
  | "Tháng 9"
  | "Tháng 10"
  | "Tháng 11"
  | "Tháng 12";

type BudgetRowData = {
  color: BudgetColor;
  label: string;
  percent: number;
  remaining: string;
  total: string;
  used: string;
  warning?: string;
};

type BudgetMonthData = {
  categories: BudgetRowData[];
  overview: {
    percent: number;
    remaining: string;
    spent: string;
    totalBudget: string;
  };
  sources: BudgetRowData[];
};

const months: MonthName[] = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const colorClasses: Record<BudgetColor, string> = {
  pink: "bg-momo-primary",
  violet: "bg-momo-violet",
  orange: "bg-momo-warning",
  blue: "bg-sky-500",
  green: "bg-momo-success",
};

const monthlyBudgetImpact: Record<MonthName, BudgetMonthData> = {
  "Tháng 1": createMonthData(38, [58, 49, 35], [62, 42, 31, 28]),
  "Tháng 2": createMonthData(45, [61, 53, 42], [66, 48, 36, 30]),
  "Tháng 3": createMonthData(49, [63, 58, 45], [68, 51, 38, 31]),
  "Tháng 4": createMonthData(43, [60, 55, 39], [64, 47, 35, 29]),
  "Tháng 5": {
    overview: {
      totalBudget: "4.000.000đ",
      spent: "1.650.000đ",
      remaining: "2.350.000đ",
      percent: 41,
    },
    sources: [
      {
        label: "Ví MoMo",
        used: "1.300.000đ",
        total: "2.000.000đ",
        remaining: "700.000đ",
        percent: 65,
        color: "pink",
      },
      {
        label: "Tài khoản NH",
        used: "1.000.000đ",
        total: "1.500.000đ",
        remaining: "500.000đ",
        percent: 67,
        color: "violet",
      },
      {
        label: "Tiền mặt",
        used: "280.000đ",
        total: "500.000đ",
        remaining: "220.000đ",
        percent: 56,
        color: "blue",
      },
    ],
    categories: [
      {
        label: "Ăn uống",
        used: "1.050.000đ",
        total: "1.500.000đ",
        remaining: "450.000đ",
        percent: 70,
        color: "pink",
        warning: "Sắp chạm hạn mức",
      },
      {
        label: "Mua sắm",
        used: "650.000đ",
        total: "1.200.000đ",
        remaining: "550.000đ",
        percent: 54,
        color: "violet",
      },
      {
        label: "Giải trí",
        used: "350.000đ",
        total: "800.000đ",
        remaining: "450.000đ",
        percent: 44,
        color: "orange",
      },
      {
        label: "Học tập",
        used: "200.000đ",
        total: "600.000đ",
        remaining: "400.000đ",
        percent: 33,
        color: "blue",
      },
    ],
  },
  "Tháng 6": createMonthData(46, [62, 59, 41], [65, 52, 40, 34]),
  "Tháng 7": createMonthData(52, [69, 64, 48], [73, 57, 43, 39], "Ăn uống"),
  "Tháng 8": createMonthData(40, [55, 51, 33], [58, 46, 32, 27]),
  "Tháng 9": createMonthData(47, [64, 57, 45], [61, 55, 39, 36]),
  "Tháng 10": createMonthData(50, [66, 62, 46], [69, 58, 41, 37]),
  "Tháng 11": createMonthData(55, [70, 65, 52], [72, 63, 46, 40], "Ăn uống"),
  "Tháng 12": createMonthData(48, [63, 60, 44], [67, 56, 42, 35]),
};

function createMonthData(
  overviewPercent: number,
  sourcePercents: [number, number, number],
  categoryPercents: [number, number, number, number],
  warningCategory?: string,
): BudgetMonthData {
  return {
    overview: {
      totalBudget: "4.000.000đ",
      spent: `${Math.round((overviewPercent / 100) * 4000000).toLocaleString("vi-VN")}đ`,
      remaining: `${(4000000 - Math.round((overviewPercent / 100) * 4000000)).toLocaleString("vi-VN")}đ`,
      percent: overviewPercent,
    },
    sources: [
      makeRow("Ví MoMo", sourcePercents[0], "2.000.000đ", "pink"),
      makeRow("Tài khoản NH", sourcePercents[1], "1.500.000đ", "violet"),
      makeRow("Tiền mặt", sourcePercents[2], "500.000đ", "blue"),
    ],
    categories: [
      makeRow(
        "Ăn uống",
        categoryPercents[0],
        "1.500.000đ",
        "pink",
        warningCategory === "Ăn uống" ? "Sắp chạm hạn mức" : undefined,
      ),
      makeRow("Mua sắm", categoryPercents[1], "1.200.000đ", "violet"),
      makeRow("Giải trí", categoryPercents[2], "800.000đ", "orange"),
      makeRow("Học tập", categoryPercents[3], "600.000đ", "blue"),
    ],
  };
}

function makeRow(
  label: string,
  percent: number,
  total: string,
  color: BudgetColor,
  warning?: string,
): BudgetRowData {
  const totalNumber = Number(total.replace(/\D/g, ""));
  const usedNumber = Math.round((percent / 100) * totalNumber);
  const remainingNumber = totalNumber - usedNumber;

  return {
    label,
    used: `${usedNumber.toLocaleString("vi-VN")}đ`,
    total,
    remaining: `${remainingNumber.toLocaleString("vi-VN")}đ`,
    percent,
    color,
    warning,
  };
}

function BudgetRow({
  color,
  label,
  percent,
  warning,
}: {
  color: BudgetColor;
  label: string;
  percent: number;
  warning?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-momo-text">{label}</span>
        <span className="font-bold text-momo-muted">{percent}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", colorClasses[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
      {warning && (
        <span className="mt-1.5 inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">
          {warning}
        </span>
      )}
    </div>
  );
}

function DetailBudgetRow({ row }: { row: BudgetRowData }) {
  return (
    <div className="py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-extrabold text-momo-text">{row.label}</p>
            {row.warning && (
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">
                {row.warning}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs font-semibold text-momo-muted">
            Đã dùng {row.used} / {row.total}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-momo-muted">Còn {row.remaining}</p>
        </div>
        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-extrabold text-momo-text">
          {row.percent}%
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", colorClasses[row.color])}
          style={{ width: `${row.percent}%` }}
        />
      </div>
    </div>
  );
}

function BudgetDetailDrawer({
  data,
  month,
  onClose,
  open,
}: {
  data: BudgetMonthData;
  month: MonthName;
  onClose: () => void;
  open: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Chi tiết ngân sách</h2>
            <p className="mt-1 text-sm text-momo-muted">Dữ liệu ngân sách của {month}</p>
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

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
          <section className="rounded-[20px] border border-momo-border bg-momo-soft/45 p-4">
            <h3 className="text-sm font-extrabold text-momo-text">Tổng quan tháng</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                ["Tổng ngân sách", data.overview.totalBudget],
                ["Đã chi", data.overview.spent],
                ["Còn lại", data.overview.remaining],
                ["Tiến độ", `${data.overview.percent}%`],
              ].map(([label, value]) => (
                <div className="rounded-[14px] bg-white px-3 py-2" key={label}>
                  <p className="text-xs font-bold text-momo-muted">{label}</p>
                  <p className="mt-1 text-sm font-extrabold text-momo-text">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-slate-100 bg-white p-4">
            <h3 className="text-sm font-extrabold text-momo-text">Khoản chi đang ghi nhận</h3>
            <div className="mt-3 rounded-[16px] bg-slate-50 px-3 py-3">
              <p className="font-extrabold text-momo-text">The Coffee House</p>
              <p className="mt-1 text-sm text-momo-muted">Cà phê sữa đá</p>
              <p className="mt-2 text-xl font-extrabold text-momo-text">45.000đ</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Ví MoMo: -45.000đ", "Ăn uống: -45.000đ"].map((item) => (
                <span
                  className="rounded-full border border-momo-border bg-momo-soft px-3 py-1.5 text-xs font-bold text-momo-primary"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-momo-muted">
              Khoản chi này sẽ được trừ đồng thời vào nguồn tiền và danh mục.
            </p>
          </section>

          <section className="rounded-[20px] border border-slate-100 bg-white p-4">
            <h3 className="text-sm font-extrabold text-momo-text">Theo nguồn tiền</h3>
            <div className="mt-2 divide-y divide-slate-100">
              {data.sources.map((row) => (
                <DetailBudgetRow key={row.label} row={row} />
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-slate-100 bg-white p-4">
            <h3 className="text-sm font-extrabold text-momo-text">Theo danh mục</h3>
            <div className="mt-2 divide-y divide-slate-100">
              {data.categories.map((row) => (
                <DetailBudgetRow key={row.label} row={row} />
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-slate-100 bg-white p-4">
            <h3 className="text-sm font-extrabold text-momo-text">Giao dịch gần đây</h3>
            <div className="mt-3 divide-y divide-slate-100">
              {[
                ["The Coffee House", "45.000đ", "Ăn uống"],
                ["Bún chả Hà Nội", "65.000đ", "Ăn uống"],
                ["CGV Vincom Center", "120.000đ", "Giải trí"],
              ].map(([merchant, amount, category]) => (
                <div className="flex items-center justify-between gap-3 py-2.5" key={merchant}>
                  <div>
                    <p className="text-sm font-bold text-momo-text">{merchant}</p>
                    <p className="mt-0.5 text-xs font-semibold text-momo-muted">{category}</p>
                  </div>
                  <p className="text-sm font-extrabold text-momo-text">{amount}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-violet-100 bg-violet-50/65 p-4">
            <div className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-momo-violet" />
              <div>
                <h3 className="text-sm font-extrabold text-momo-text">Gợi ý từ AI SpendSnap</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-momo-text">
                  Ăn uống đang dùng 70% ngân sách tháng này. Nếu ghi nhận thêm khoản 45.000đ
                  này, bạn nên giới hạn ăn ngoài cuối tuần hoặc ưu tiên dùng ưu đãi Student Pass.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Đóng
          </Button>
          <Button>Đi tới Ngân sách</Button>
        </div>
      </aside>
    </div>
  );
}

export function BudgetImpactCard() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthName>("Tháng 5");
  const data = monthlyBudgetImpact[selectedMonth];

  return (
    <>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-momo-text">Ảnh hưởng ngân sách</h2>
            <p className="mt-1 text-sm leading-6 text-momo-muted">
              Dự kiến sau khi ghi nhận khoản chi này
            </p>
          </div>
          <select
            className="h-9 shrink-0 rounded-[14px] border border-momo-border bg-white px-3 text-sm font-bold text-momo-text outline-none transition hover:bg-momo-soft focus:border-momo-primary/40"
            onChange={(event) => setSelectedMonth(event.target.value as MonthName)}
            value={selectedMonth}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-extrabold text-momo-text">Theo nguồn tiền</p>
            <div className="space-y-3.5">
              {data.sources.map((row) => (
                <BudgetRow key={row.label} {...row} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-extrabold text-momo-text">Theo danh mục</p>
            <div className="space-y-3.5">
              {data.categories.map((row) => (
                <BudgetRow key={row.label} {...row} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="mt-5 text-sm font-bold text-momo-primary transition hover:text-momo-magenta"
          onClick={() => setIsDetailOpen(true)}
          type="button"
        >
          Xem chi tiết ngân sách →
        </button>
      </Card>

      <BudgetDetailDrawer
        data={data}
        month={selectedMonth}
        onClose={() => setIsDetailOpen(false)}
        open={isDetailOpen}
      />
    </>
  );
}
