import { BookOpen, CalendarDays, Clapperboard, Coffee, ImagePlus, ShoppingBag, Utensils } from "lucide-react";
import { Card } from "../Card";
import { cn } from "../../lib/utils";

const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const capturedDays: Record<number, { tone: string; label: string }> = {
  1: { tone: "from-pink-100 to-violet-100", label: "Cafe" },
  3: { tone: "from-orange-100 to-pink-100", label: "Food" },
  5: { tone: "from-sky-100 to-pink-100", label: "Book" },
  7: { tone: "from-violet-100 to-pink-100", label: "Film" },
  10: { tone: "from-pink-200 to-violet-100", label: "Cafe" },
  12: { tone: "from-orange-100 to-white", label: "Food" },
  14: { tone: "from-pink-100 to-white", label: "Store" },
  17: { tone: "from-violet-100 to-white", label: "Film" },
  19: { tone: "from-sky-100 to-white", label: "Book" },
};

const previewItems = [
  {
    title: "Coffee",
    price: "45.000đ",
    category: "Ăn uống",
    date: "Hôm nay",
    icon: Coffee,
    gradient: "from-[#FFE8F4] to-violet-50",
  },
  {
    title: "Food",
    price: "65.000đ",
    category: "Ăn uống",
    date: "Hôm qua",
    icon: Utensils,
    gradient: "from-orange-50 to-[#FFE8F4]",
  },
  {
    title: "Store",
    price: "129.000đ",
    category: "Mua sắm",
    date: "08/05",
    icon: ShoppingBag,
    gradient: "from-pink-50 to-sky-50",
  },
  {
    title: "Cinema",
    price: "120.000đ",
    category: "Giải trí",
    date: "07/05",
    icon: Clapperboard,
    gradient: "from-violet-50 to-pink-50",
  },
];

const calendarCells = [
  null,
  null,
  ...Array.from({ length: 31 }, (_, index) => index + 1),
  null,
  null,
];

export function VisualDiaryCalendarCard() {
  return (
    <Card className="h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Visual Diary Calendar</h2>
          <p className="mt-1 text-sm text-momo-muted">Những ngày đã chụp trong tháng 5</p>
        </div>
        <button
          className="text-sm font-bold text-momo-primary transition hover:text-momo-magenta"
          type="button"
        >
          Xem tất cả
        </button>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <div className="grid grid-cols-7 gap-2">
            {weekdays.map((day) => (
              <div className="text-center text-xs font-bold text-momo-muted" key={day}>
                {day}
              </div>
            ))}

            {calendarCells.map((day, index) => {
              const captured = day ? capturedDays[day] : undefined;
              const isSelected = day === 10;

              return (
                <div
                  className={cn(
                    "relative min-h-[62px] rounded-[16px] border p-2 transition",
                    day ? "border-slate-100 bg-white" : "border-transparent bg-transparent",
                    captured && "bg-slate-50",
                    isSelected && "border-momo-primary bg-momo-primary text-white shadow-pink",
                  )}
                  key={`${day ?? "empty"}-${index}`}
                >
                  {day && (
                    <>
                      <span
                        className={cn(
                          "text-xs font-extrabold",
                          isSelected ? "text-white" : "text-momo-text",
                        )}
                      >
                        {day}
                      </span>
                      {captured && (
                        <div
                          className={cn(
                            "absolute bottom-2 left-2 right-2 flex h-7 items-center justify-center rounded-[10px] bg-gradient-to-br text-[10px] font-bold",
                            captured.tone,
                            isSelected ? "text-momo-primary" : "text-momo-text",
                          )}
                        >
                          {captured.label}
                        </div>
                      )}
                      {day === 10 && (
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-momo-primary" />
            <h3 className="text-sm font-extrabold text-momo-text">Ảnh đã chụp</h3>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5 xl:grid-cols-1">
            {previewItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-white p-2.5 shadow-[0_8px_18px_rgba(17,24,39,0.04)]"
                  key={item.title}
                >
                  <div
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-gradient-to-br text-momo-primary",
                      item.gradient,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-momo-text">{item.title}</p>
                    <p className="truncate text-[11px] font-bold text-momo-text">{item.price}</p>
                    <p className="truncate text-[11px] text-momo-muted">
                      {item.category} · {item.date}
                    </p>
                  </div>
                </div>
              );
            })}
            <button
              className="flex min-h-[64px] flex-col items-center justify-center rounded-[18px] border border-dashed border-momo-border bg-momo-soft/60 text-momo-primary transition hover:border-momo-primary hover:bg-momo-soft"
              type="button"
            >
              <span className="text-xl font-extrabold leading-none">+</span>
              <ImagePlus className="mt-0.5 h-4 w-4" />
              <span className="mt-1 text-xs font-bold">Xem thêm</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
