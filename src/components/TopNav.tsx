import { Bell, ChevronDown, Search } from "lucide-react";
import { topNavItems } from "../data/mockData";
import { cn } from "../lib/utils";

export function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-momo-border/70 bg-white/95 backdrop-blur lg:left-[260px] lg:h-[76px]">
      <div className="flex h-full min-w-0 items-center gap-3 px-3 sm:px-4 md:px-7 lg:gap-6 lg:px-8">
        <nav
          aria-label="MoMo"
          className="hidden min-w-0 flex-1 items-center gap-7 overflow-hidden lg:flex"
        >
          {topNavItems.map((item) => {
            const isActive = item === "Dịch vụ";

            return (
              <button
                className={cn(
                  "relative flex h-[76px] shrink-0 items-center whitespace-nowrap text-[14px] font-semibold leading-none transition duration-200 hover:text-momo-primary",
                  isActive ? "text-momo-primary" : "text-momo-muted",
                )}
                key={item}
                type="button"
              >
                {item}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-momo-primary" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1 lg:hidden">
          <p className="truncate text-sm font-bold text-momo-text">SpendSnap Student</p>
          <p className="text-xs text-momo-muted">Dịch vụ</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <label className="hidden h-10 w-[220px] shrink-0 items-center gap-2 rounded-[14px] border border-slate-200 bg-slate-50 px-3 text-sm text-momo-muted transition duration-200 focus-within:border-momo-primary/30 focus-within:bg-white xl:flex 2xl:w-[250px]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              aria-label="Tìm kiếm"
              className="min-w-0 flex-1 bg-transparent text-momo-text outline-none placeholder:text-momo-muted"
              placeholder="Tìm kiếm"
              type="search"
            />
          </label>

          <button
            aria-label="Thông báo"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[14px] border border-slate-200 bg-white text-slate-500 transition duration-200 hover:border-momo-border hover:bg-momo-soft hover:text-momo-primary max-[360px]:hidden"
            type="button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-momo-primary" />
          </button>

          <button
            className="flex h-10 w-10 shrink-0 items-center gap-2 rounded-[14px] border border-slate-200 bg-white p-1 transition duration-200 hover:border-momo-border hover:bg-momo-soft sm:w-[204px] sm:pr-2"
            type="button"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-momo-primary to-momo-violet text-sm font-bold text-white">
              A
            </span>
            <span className="hidden min-w-0 text-left sm:block">
              <span className="block truncate text-[13px] font-bold text-momo-text">
                Nguyễn Minh Anh
              </span>
              <span className="block truncate text-[11px] font-medium text-momo-muted">
                Ví MoMo: 1.250.000đ
              </span>
            </span>
            <ChevronDown className="ml-auto hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
