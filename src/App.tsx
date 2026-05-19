import { useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./components/HomePage";
import { AISpendCameraPage } from "./pages/AISpendCameraPage";
import { BudgetPage } from "./pages/BudgetPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { SplitBillPage } from "./pages/SplitBillPage";
import { VisualDiaryPage } from "./pages/VisualDiaryPage";
import type { PageId } from "./types/navigation";

function renderPage(activePage: PageId, onNavigate: (page: PageId) => void) {
  if (activePage === "Tổng quan") {
    return <HomePage onNavigate={onNavigate} />;
  }

  if (activePage === "AI Spend Camera") {
    return <AISpendCameraPage />;
  }

  if (activePage === "Ngân sách") {
    return <BudgetPage />;
  }

  if (activePage === "Chia hoá đơn") {
    return <SplitBillPage />;
  }

  if (activePage === "Nhật ký ảnh") {
    return <VisualDiaryPage />;
  }

  return <PlaceholderPage title={activePage} />;
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("Tổng quan");

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage(activePage, setActivePage)}
    </AppLayout>
  );
}
