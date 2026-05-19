import type { ReactNode } from "react";
import type { PageId } from "../types/navigation";
import { Sidebar } from "./Sidebar";
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
        <main className="min-h-screen pt-[76px]">
          <div className="px-4 py-6 md:px-7 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
