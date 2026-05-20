import { useState } from "react";
import { Plus, ReceiptText } from "lucide-react";
import { AIAdvisorModal } from "../components/Budget/AIAdvisorModal";
import { BudgetAdvisorCard } from "../components/Budget/BudgetAdvisorCard";
import { BudgetDealsCard } from "../components/Budget/BudgetDealsCard";
import { BudgetOverviewCard } from "../components/Budget/BudgetOverviewCard";
import { BudgetSetupDrawer } from "../components/Budget/BudgetSetupDrawer";
import { BillClassificationCard } from "../components/Budget/BillClassificationCard";
import { CategoryBudgetCard } from "../components/Budget/CategoryBudgetCard";
import { ExpenseImpactDrawer } from "../components/Budget/ExpenseImpactDrawer";
import { LatestExpenseImpactCard } from "../components/Budget/LatestExpenseImpactCard";
import {
  OutsideExpenseDrawer,
  type OutsideExpenseTab,
} from "../components/Budget/OutsideExpenseDrawer";
import { OutsideExpenseCard } from "../components/Budget/OutsideExpenseCard";
import { SourceBudgetCard } from "../components/Budget/SourceBudgetCard";
import { Button } from "../components/Button";

export function BudgetPage() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isImpactOpen, setIsImpactOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isOutsideOpen, setIsOutsideOpen] = useState(false);
  const [outsideInitialTab, setOutsideInitialTab] = useState<OutsideExpenseTab>("manual");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  function openOutsideExpense(tab: OutsideExpenseTab = "manual") {
    setOutsideInitialTab(tab);
    setIsOutsideOpen(true);
  }

  return (
    <div className="mx-auto flex max-w-[1320px] flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-normal text-momo-text sm:text-3xl">
            Ngân sách tháng 5
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-momo-muted">
            Theo dõi tiền theo nguồn và danh mục để biết mình còn bao nhiêu và nên chi gì tiếp theo.
          </p>
          <p className="mt-2 inline-flex rounded-full border border-momo-border bg-momo-soft px-3 py-1.5 text-xs font-bold text-momo-magenta">
            Một khoản chi luôn được trừ vào 2 lớp: nguồn tiền và danh mục chi tiêu.
          </p>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Button className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsSetupOpen(true)}>
            Thêm ngân sách
          </Button>
          <Button
            className="w-full sm:w-auto"
            leftIcon={<ReceiptText className="h-4 w-4" />}
            onClick={() => openOutsideExpense("manual")}
            variant="secondary"
          >
            Nhập chi tiêu ngoài
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <BudgetOverviewCard />
        <BudgetAdvisorCard onConsult={() => setIsAdvisorOpen(true)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SourceBudgetCard />
        <CategoryBudgetCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LatestExpenseImpactCard onOpenDetails={() => setIsImpactOpen(true)} />
        <OutsideExpenseCard
          onOpenManual={() => openOutsideExpense("manual")}
          onOpenUpload={() => openOutsideExpense("upload")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <BillClassificationCard onReview={() => openOutsideExpense("upload")} />
        </div>
        <div className="lg:col-span-5">
          <BudgetDealsCard />
        </div>
      </div>

      <BudgetSetupDrawer
        open={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onSave={() => {
          setIsSetupOpen(false);
          showToast("Đã lưu ngân sách tháng 5");
        }}
      />
      <OutsideExpenseDrawer
        initialTab={outsideInitialTab}
        open={isOutsideOpen}
        onClose={() => setIsOutsideOpen(false)}
        onManualSave={() => {
          setIsOutsideOpen(false);
          showToast("Đã ghi nhận khoản chi thủ công");
        }}
        onUploadSave={() => {
          setIsOutsideOpen(false);
          showToast("Đã ghi nhận hóa đơn Bách Hóa Xanh");
        }}
      />
      <AIAdvisorModal open={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
      <ExpenseImpactDrawer open={isImpactOpen} onClose={() => setIsImpactOpen(false)} />

      {toast && (
        <div className="fixed bottom-24 left-3 right-3 z-[60] rounded-[18px] border border-emerald-100 bg-white px-4 py-3 text-center text-sm font-bold text-emerald-700 shadow-[0_18px_36px_rgba(17,24,39,0.12)] sm:left-auto sm:right-6 sm:bottom-6 sm:text-left">
          {toast}
        </div>
      )}
    </div>
  );
}
