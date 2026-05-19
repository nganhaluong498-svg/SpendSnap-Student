import { Bot, Sparkles } from "lucide-react";
import { Button } from "../Button";
import { Card } from "../Card";

interface BudgetAdvisorCardProps {
  onConsult: () => void;
}

export function BudgetAdvisorCard({ onConsult }: BudgetAdvisorCardProps) {
  return (
    <Card className="h-full border-violet-100 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Gợi ý từ AI SpendSnap</h2>
          <p className="mt-1 text-sm text-momo-muted">Dựa trên ngân sách tháng này</p>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] bg-violet-50 text-momo-violet">
          <Bot className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 rounded-[18px] border border-violet-100 bg-violet-50/70 p-3.5">
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-momo-violet" />
          <p className="text-sm font-semibold leading-6 text-momo-text">
            Bạn đang chi hơi nhiều cho Mua sắm và Ăn uống.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={onConsult} size="sm" variant="violet">
          Tư vấn ngay
        </Button>
        <Button size="sm" variant="secondary">
          Chỉnh budget
        </Button>
      </div>
    </Card>
  );
}
