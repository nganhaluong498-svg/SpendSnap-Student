import { Camera, ChevronRight, Users, Wallet, type LucideIcon } from "lucide-react";
import { quickActions, type QuickActionIcon } from "../data/mockData";
import { cn } from "../lib/utils";
import type { PageId } from "../types/navigation";

const iconMap: Record<QuickActionIcon, LucideIcon> = {
  camera: Camera,
  users: Users,
  wallet: Wallet,
};

const iconToneMap: Record<QuickActionIcon, string> = {
  camera: "bg-momo-soft text-momo-primary",
  users: "bg-emerald-50 text-emerald-600",
  wallet: "bg-violet-50 text-momo-violet",
};

const actionPageMap: Record<string, PageId> = {
  capture: "AI Spend Camera",
  split: "Chia hoá đơn",
  upload: "Ngân sách",
};

export function QuickActions({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section aria-label="Thao tác nhanh" className="grid gap-5 md:grid-cols-3">
      {quickActions.map((action) => {
        const Icon = iconMap[action.icon];

        return (
          <button
            className="group flex min-h-[88px] w-full items-center gap-4 rounded-[20px] border border-momo-border/75 bg-white p-4 text-left shadow-[0_10px_26px_rgba(17,24,39,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-momo-primary/20 hover:shadow-lift"
            key={action.id}
            onClick={() => onNavigate(actionPageMap[action.id])}
            type="button"
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-[16px]",
                iconToneMap[action.icon],
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold text-momo-text">{action.title}</span>
              <span className="mt-1 block text-sm leading-5 text-momo-muted">
                {action.description}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition duration-200 group-hover:translate-x-0.5 group-hover:text-momo-primary" />
          </button>
        );
      })}
    </section>
  );
}
