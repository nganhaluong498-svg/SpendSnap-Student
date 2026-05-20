import { useState } from "react";
import { AIInsightCard } from "./AIInsightCard";
import { BudgetSummaryCard } from "./BudgetSummaryCard";
import { AIAdvisorModal } from "./Budget/AIAdvisorModal";
import { HeroCard } from "./HeroCard";
import { QuickActions } from "./QuickActions";
import { RecentDiaryCard } from "./RecentDiaryCard";
import { StudentDealCard } from "./StudentDealCard";
import type { PageId } from "../types/navigation";

const homepageAiMessages = [
  "Bạn đã dùng 70% ngân sách ăn uống trong tháng này. Nếu tiếp tục tốc độ này, bạn có thể gần chạm hạn mức trước cuối tháng.",
  "Dùng ưu đãi Student Pass có thể giúp bạn tiết kiệm khoảng 40.000đ–60.000đ tuần này.",
  "Gợi ý cụ thể: dùng ưu đãi giảm 20% đồ uống cuối tuần, ưu đãi giảm 30.000đ cho nhóm hàng thịt/cá, hoặc ưu đãi sinh viên khi đi ăn nhóm. Nếu bạn vẫn có kế hoạch ăn ngoài, hãy ưu tiên các ưu đãi này để giảm chi.",
];

const homepageQuickPrompts = [
  "Tìm ưu đãi ăn uống",
  "Lập kế hoạch tiết kiệm",
  "Chỉnh budget ăn uống",
];

const homepageAiContext = {
  month: "Tháng 5",
  totalBudget: 4000000,
  spent: 1650000,
  remaining: 2350000,
  categories: [
    { name: "Ăn uống", used: 1050000, total: 1500000, remaining: 450000, percent: 70 },
    { name: "Mua sắm", used: 650000, total: 1200000, remaining: 550000, percent: 54 },
    { name: "Giải trí", used: 350000, total: 800000, remaining: 450000, percent: 44 },
  ],
  studentPassDeals: [
    "Giảm 20% đồ uống cuối tuần",
    "Giảm 30.000đ cho nhóm hàng thịt/cá",
    "Ưu đãi sinh viên khi đi ăn nhóm",
  ],
};

const homepageFallbackReply =
  "Dựa trên ngân sách ăn uống 70%, bạn nên ưu tiên ưu đãi Student Pass cho cafe/trà sữa và các bữa ăn nhóm. Tuần này có thể đặt mục tiêu tiết kiệm 40.000đ–60.000đ bằng cách dùng ưu đãi đồ uống cuối tuần hoặc giảm một buổi ăn ngoài.";

export function HomePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [isSavingsChatOpen, setIsSavingsChatOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:gap-5">
        <HeroCard />

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BudgetSummaryCard onNavigate={onNavigate} />
          </div>
          <div className="lg:col-span-4">
            <AIInsightCard onOpenChat={() => setIsSavingsChatOpen(true)} />
          </div>
        </div>

        <QuickActions onNavigate={onNavigate} />

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RecentDiaryCard onNavigate={onNavigate} />
          </div>
          <div className="lg:col-span-5">
            <StudentDealCard />
          </div>
        </div>
      </div>

      <AIAdvisorModal
        context={homepageAiContext}
        fallbackReply={homepageFallbackReply}
        initialMessages={homepageAiMessages}
        onClose={() => setIsSavingsChatOpen(false)}
        open={isSavingsChatOpen}
        quickPrompts={homepageQuickPrompts}
        subtitle="Gợi ý ưu đãi và cách giảm chi tuần này."
        title="AI SpendSnap tư vấn tiết kiệm"
      />
    </>
  );
}
