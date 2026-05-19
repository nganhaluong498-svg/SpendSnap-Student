import { Bot, Sparkles } from "lucide-react";
import { Button } from "../Button";
import { Card } from "../Card";

export function AISuggestionStrip() {
  return (
    <Card className="overflow-hidden border-violet-100 bg-gradient-to-r from-white via-violet-50/60 to-momo-soft p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-violet-50 text-momo-violet">
            <Bot className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-momo-violet" />
              <h2 className="font-extrabold text-momo-text">Gợi ý từ AI SpendSnap</h2>
            </div>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-momo-muted">
              Bạn đang chi tiêu nhiều nhất cho ăn uống. Thử giảm 10% chi tiêu ăn uống để dành thêm
              cho mục tiêu học tập.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="violet">Đặt mục tiêu ngay</Button>
          <div className="rounded-[18px] border border-momo-border bg-white/90 p-3 shadow-[0_8px_20px_rgba(17,24,39,0.05)]">
            <p className="text-xs font-bold text-momo-magenta">Ưu đãi dành riêng cho sinh viên</p>
            <p className="mt-1 text-sm font-bold text-momo-text">
              Giảm đến 30% đồ uống với Student Pass
            </p>
            <button
              className="mt-2 text-xs font-extrabold text-momo-primary transition hover:text-momo-magenta"
              type="button"
            >
              Xem ưu đãi
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
