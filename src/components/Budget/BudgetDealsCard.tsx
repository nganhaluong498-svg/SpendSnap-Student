import { Calendar, Gift, Tag } from "lucide-react";
import { studentDeals } from "../../data/budgetData";
import { Button } from "../Button";
import { Card } from "../Card";

export function BudgetDealsCard() {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Ưu đãi phù hợp</h2>
          <p className="mt-1 text-sm text-momo-muted">Gợi ý tiết kiệm khi bạn đã có kế hoạch chi</p>
        </div>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[14px] bg-momo-soft text-momo-primary">
          <Gift className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 space-y-2.5">
        {studentDeals.map((deal) => (
          <div
            className="rounded-[18px] border border-momo-border bg-gradient-to-br from-white to-momo-soft/60 p-3"
            key={deal.title}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-[11px] bg-white text-momo-primary shadow-[0_8px_18px_rgba(229,0,126,0.10)]">
                <Tag className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-momo-text">{deal.title}</h3>
                <p className="mt-1 text-xs leading-5 text-momo-muted">{deal.description}</p>
              </div>
            </div>

            {deal.condition && (
              <p className="mt-2 rounded-[12px] bg-white px-3 py-1.5 text-xs font-bold text-momo-magenta">
                {deal.condition}
              </p>
            )}

            {deal.aiNote && (
              <p className="mt-2 rounded-[12px] border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-semibold leading-5 text-orange-800">
                {deal.aiNote}
              </p>
            )}

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
              {deal.expiry ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-momo-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {deal.expiry}
                </span>
              ) : (
                <span />
              )}
              <Button size="sm" variant="secondary">
                {deal.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
