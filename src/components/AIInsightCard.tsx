import { Bot, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";

export function AIInsightCard({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <Card className="relative h-full overflow-hidden border-violet-100 p-6">
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-momo-text">Gợi ý từ AI SpendSnap</h2>
            <p className="mt-1 text-sm text-momo-muted">Dựa trên budget tháng này</p>
          </div>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[16px] bg-violet-50 text-momo-violet">
            <Bot className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[18px] border border-violet-100 bg-violet-50/70 px-4 py-3">
            <div className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-momo-violet" />
              <p className="text-sm font-semibold leading-6 text-momo-text">
                Bạn đã dùng 70% ngân sách ăn uống trong tháng này.
              </p>
            </div>
          </div>
          <p className="text-sm leading-6 text-momo-muted">
            Dùng ưu đãi Student Pass có thể giúp bạn tiết kiệm 40.000đ–60.000đ tuần này.
          </p>
        </div>

        <Button className="mt-5 w-full sm:w-auto" onClick={onOpenChat} variant="violet">
          Xem gợi ý tiết kiệm
        </Button>
      </div>
    </Card>
  );
}
