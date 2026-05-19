import { CalendarDays, Gift, Percent, Tag, Ticket, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

const studentDeals = [
  {
    title: "Giảm 30.000đ cho thịt, cá",
    description: "Áp dụng khi mua nhóm hàng thịt, cá từ 120.000đ tại đối tác siêu thị.",
    tag: "Phù hợp với chi tiêu ăn uống",
    expiry: "Hạn dùng: 07/06/2026",
  },
  {
    title: "Haidilao giảm 15% cho sinh viên",
    description: "Ưu đãi trong khung giờ 10:00 - 17:00 cho tài khoản Student Pass.",
    tag: "Ăn nhóm tiết kiệm hơn",
    expiry: "Hạn dùng: 30/06/2026",
  },
  {
    title: "Giảm 20% đồ uống cuối tuần",
    description: "Dành cho cafe, trà sữa và đồ uống tại các quán đối tác.",
    tag: "Giảm chi cho cafe/trà sữa",
    expiry: "Hạn dùng: 15/06/2026",
  },
];

function StudentDealDrawer({
  appliedDeals,
  onApply,
  onClose,
}: {
  appliedDeals: Set<string>;
  onApply: (title: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Ưu đãi phù hợp cho bạn</h2>
            <p className="mt-1 text-sm leading-6 text-momo-muted">
              Student Pass đề xuất theo thói quen chi tiêu của bạn.
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

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-5">
          {studentDeals.map((deal) => {
            const isApplied = appliedDeals.has(deal.title);

            return (
              <div
                className="rounded-[20px] border border-momo-border bg-gradient-to-br from-white to-momo-soft/45 p-4"
                key={deal.title}
              >
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] bg-white text-momo-primary shadow-[0_10px_24px_rgba(229,0,126,0.10)]">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-momo-text">{deal.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-momo-muted">{deal.description}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-momo-magenta">
                    {deal.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-momo-muted">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {deal.expiry}
                  </span>
                </div>

                <Button
                  className="mt-4"
                  onClick={() => onApply(deal.title)}
                  size="sm"
                  variant={isApplied ? "secondary" : "primary"}
                >
                  {isApplied ? "Đã áp dụng" : "Áp dụng ngay"}
                </Button>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

export function StudentDealCard() {
  const [appliedDeals, setAppliedDeals] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");

  function applyDeal(title: string) {
    setAppliedDeals((current) => new Set(current).add(title));
    setToast("Đã lưu ưu đãi vào Student Pass");
    window.setTimeout(() => setToast(""), 2200);
  }

  return (
    <>
      <Card className="h-full p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-momo-text">Ưu đãi phù hợp</h2>
            <p className="mt-1 text-sm text-momo-muted">
              Student Pass đề xuất theo thói quen chi tiêu
            </p>
          </div>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[16px] bg-momo-soft text-momo-primary">
            <Gift className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-5 flex gap-4 rounded-[20px] border border-dashed border-momo-border bg-momo-soft p-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-white text-momo-primary shadow-[0_12px_28px_rgba(229,0,126,0.12)]">
            <Ticket className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-momo-magenta">
              <Percent className="h-3.5 w-3.5" />
              3 ưu đãi
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-momo-text">
              Bạn đang chi nhiều cho ăn uống.
            </p>
            <p className="mt-1 text-sm leading-6 text-momo-muted">
              Có 3 ưu đãi Student Pass có thể giúp giảm chi tuần này.
            </p>
          </div>
        </div>

        <Button
          className="mt-5 w-full sm:w-auto"
          onClick={() => setIsDrawerOpen(true)}
          variant="secondary"
        >
          Khám phá ưu đãi
        </Button>
      </Card>

      {isDrawerOpen && (
        <StudentDealDrawer
          appliedDeals={appliedDeals}
          onApply={applyDeal}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] rounded-[18px] border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-700 shadow-[0_18px_36px_rgba(17,24,39,0.12)]">
          {toast}
        </div>
      )}
    </>
  );
}
