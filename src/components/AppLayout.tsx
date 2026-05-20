import type { ReactNode } from "react";
import type { PageId } from "../types/navigation";
import { cn } from "../lib/utils";
import { Sidebar, spendSnapNavItems } from "./Sidebar";
import { TopNav } from "./TopNav";

interface AppLayoutProps {
  activePage: PageId;
  children: ReactNode;
  onNavigate: (page: PageId) => void;
}

export function AppLayout({ activePage, children, onNavigate }: AppLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden text-momo-text">
      <Sidebar activeItem={activePage} onNavigate={onNavigate} />
      <div className="min-w-0 lg:pl-[260px]">
        <TopNav />
        <main className="min-h-screen pb-28 pt-16 lg:pb-0 lg:pt-[76px]">
          <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-7 lg:px-8">{children}</div>
        </main>
      </div>
      <nav
        aria-label="SpendSnap mobile"
        className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 rounded-[24px] border border-momo-border/80 bg-white/95 p-1.5 shadow-[0_18px_48px_rgba(17,24,39,0.18)] backdrop-blur lg:hidden"
      >
        <div className="grid grid-cols-5 gap-1">
          {spendSnapNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.label;
            const shortLabel =
              item.label === "AI Spend Camera"
                ? "AI Camera"
                : item.label === "Chia hoá đơn"
                  ? "Chia bill"
                  : item.label === "Nhật ký ảnh"
                    ? "Nhật ký"
                    : item.label;

            return (
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex h-[58px] min-w-0 flex-col items-center justify-center gap-1 rounded-[18px] px-1 text-[10px] font-bold leading-tight transition",
                  isActive
                    ? "bg-momo-soft text-momo-primary"
                    : "text-momo-muted hover:bg-momo-soft/60 hover:text-momo-text",
                )}
                key={item.label}
                onClick={() => onNavigate(item.label)}
                type="button"
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-momo-primary" : "text-slate-400")} />
                <span className="w-full truncate text-center">{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
