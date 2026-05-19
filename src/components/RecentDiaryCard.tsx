import {
  BookOpen,
  Clapperboard,
  Coffee,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { diaryItems, type DiaryIcon } from "../data/mockData";
import { cn } from "../lib/utils";
import type { PageId } from "../types/navigation";
import { Card } from "./Card";

const iconMap: Record<DiaryIcon, LucideIcon> = {
  coffee: Coffee,
  food: Utensils,
  cinema: Clapperboard,
  book: BookOpen,
};

export function RecentDiaryCard({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Nhật ký gần đây</h2>
          <p className="mt-1 text-sm text-momo-muted">Visual Diary từ các khoản chi mới nhất</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {diaryItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <div
              className={cn(
                "relative flex aspect-[4/3] min-h-[118px] overflow-hidden rounded-[20px] border border-white bg-gradient-to-br p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]",
                item.gradient,
              )}
              key={item.id}
            >
              <div className="grid h-10 w-10 place-items-center rounded-[16px] bg-white/85 text-momo-primary shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="absolute left-3 top-[60px] text-sm font-bold text-momo-text">
                {item.title}
              </p>
              <span className="absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-momo-text shadow-[0_8px_18px_rgba(17,24,39,0.10)]">
                {item.price}
              </span>
            </div>
          );
        })}
      </div>

      <button
        className="mt-5 text-sm font-bold text-momo-primary transition duration-200 hover:text-momo-magenta"
        onClick={() => onNavigate("Nhật ký ảnh")}
        type="button"
      >
        Xem nhật ký ảnh →
      </button>
    </Card>
  );
}
