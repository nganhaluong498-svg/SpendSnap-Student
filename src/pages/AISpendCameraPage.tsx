import { HelpCircle } from "lucide-react";
import { Button } from "../components/Button";
import { AISuggestionStrip } from "../components/SpendCamera/AISuggestionStrip";
import { BudgetImpactCard } from "../components/SpendCamera/BudgetImpactCard";
import { CaptureRecognitionCard } from "../components/SpendCamera/CaptureRecognitionCard";
import { PrivacyCard } from "../components/SpendCamera/PrivacyCard";
import { RecentAIRecordsCard } from "../components/SpendCamera/RecentAIRecordsCard";
import { VisualDiaryCalendarCard } from "../components/SpendCamera/VisualDiaryCalendarCard";

export function AISpendCameraPage() {
  return (
    <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-normal text-momo-text sm:text-3xl">
            AI Spend Camera ✨
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-momo-muted">
            Chụp ảnh hoặc upload bill, AI sẽ tự động ghi nhận và phân loại chi tiêu giúp bạn.
          </p>
        </div>
        <Button className="w-full sm:w-auto" leftIcon={<HelpCircle className="h-4 w-4" />} variant="secondary">
          Hướng dẫn
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <CaptureRecognitionCard />
        </div>
        <div className="grid gap-5 lg:col-span-5">
          <PrivacyCard />
          <BudgetImpactCard />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <VisualDiaryCalendarCard />
        </div>
        <div className="lg:col-span-5">
          <RecentAIRecordsCard />
        </div>
      </div>

      <AISuggestionStrip />
    </div>
  );
}
