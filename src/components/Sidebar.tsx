import {
  Camera,
  Gift,
  Headphones,
  Image,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Button } from "./Button";
import type { PageId } from "../types/navigation";
import { cn } from "../lib/utils";

interface SidebarProps {
  activeItem: PageId;
  onNavigate: (item: PageId) => void;
}

const menuItems: Array<{ label: PageId; icon: LucideIcon }> = [
  { label: "Tổng quan", icon: LayoutDashboard },
  { label: "AI Spend Camera", icon: Camera },
  { label: "Ngân sách", icon: Wallet },
  { label: "Chia hoá đơn", icon: Users },
  { label: "Nhật ký ảnh", icon: Image },
];

const bottomLinks: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Trung tâm hỗ trợ", icon: Headphones },
  { label: "Cài đặt", icon: Settings },
];

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] shrink-0 overflow-y-auto border-r border-momo-border/80 bg-white/95 shadow-[8px_0_30px_rgba(17,24,39,0.03)] backdrop-blur lg:block">
      <div className="flex min-h-full flex-col px-5 py-5">
        <div className="flex items-center gap-3 px-1">
          <img
            alt="MoMo logo"
            className="h-10 w-auto max-w-[82px] shrink-0 object-contain"
            src="/images/momo-wordmark.png"
          />
          <div>
            <p className="text-sm font-bold text-momo-text">MoMo</p>
            <p className="text-xs text-momo-muted">SpendSnap demo</p>
          </div>
        </div>

        <div className="mt-7">
          <p className="px-1 text-[11px] font-bold uppercase tracking-[0.08em] text-momo-muted">
            DỊCH VỤ TRONG MOMO
          </p>
        </div>

        <nav aria-label="SpendSnap" className="mt-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            return (
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex h-12 w-full items-center rounded-[18px] px-3 text-sm font-semibold transition duration-200",
                  isActive
                    ? "bg-momo-soft text-momo-primary shadow-[inset_0_0_0_1px_rgba(229,0,126,0.12)]"
                    : "text-momo-muted hover:bg-momo-soft/60 hover:text-momo-text",
                )}
                key={item.label}
                onClick={() => onNavigate(item.label)}
                type="button"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition duration-200",
                    isActive ? "text-momo-primary" : "text-slate-400 group-hover:text-momo-primary",
                  )}
                />
                <span className="ml-3 truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-5">
          <div className="rounded-[18px] border border-momo-border bg-gradient-to-br from-white to-momo-soft p-3.5 shadow-[0_10px_22px_rgba(229,0,126,0.07)]">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-[14px] bg-white text-momo-primary shadow-[0_8px_18px_rgba(229,0,126,0.10)]">
                <Gift className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-momo-text">Student Pass</p>
                <p className="mt-1 text-xs leading-5 text-momo-muted">
                  Ưu đãi dành riêng cho sinh viên
                </p>
              </div>
            </div>
            <Button className="mt-3 w-full" size="sm" variant="secondary">
              Xem ưu đãi
            </Button>
          </div>

          <div className="mt-5 space-y-1.5">
            {bottomLinks.map((link) => {
              const Icon = link.icon;

              return (
                <button
                  className="flex h-10 w-full items-center rounded-[16px] px-3 text-sm font-medium text-momo-muted transition duration-200 hover:bg-slate-50 hover:text-momo-text"
                  key={link.label}
                  type="button"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="ml-3">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
