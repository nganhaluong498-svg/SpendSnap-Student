import { Globe2, Lock, Users } from "lucide-react";
import { useState } from "react";
import { Card } from "../Card";
import { cn } from "../../lib/utils";

const options = [
  { label: "Chỉ mình tôi", subtext: "Riêng tư", icon: Lock },
  { label: "Bạn thân", subtext: "Bạn bè thân thiết xem được", icon: Users },
  { label: "Mọi người", subtext: "Công khai ảnh, ẩn số tiền", icon: Globe2 },
];

export function PrivacyCard() {
  const [selectedOption, setSelectedOption] = useState("Chỉ mình tôi");

  return (
    <Card className="p-5">
      <h2 className="text-lg font-extrabold text-momo-text">Quyền riêng tư</h2>
      <p className="mt-1 text-sm leading-6 text-momo-muted">
        Bạn có thể thay đổi quyền xem sau khi đăng.
      </p>

      <div className="mt-4 grid gap-2.5">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = option.label === selectedOption;

          return (
            <button
              className={cn(
                "flex items-center gap-3 rounded-[18px] border px-3 py-3 text-left transition duration-200",
                isSelected
                  ? "border-momo-primary/35 bg-momo-soft text-momo-primary"
                  : "border-slate-200 bg-white text-momo-text hover:border-momo-border hover:bg-momo-soft/50",
              )}
              key={option.label}
              onClick={() => setSelectedOption(option.label)}
              type="button"
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-[15px]",
                  isSelected ? "bg-white text-momo-primary" : "bg-slate-50 text-slate-400",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{option.label}</span>
                <span className="mt-0.5 block text-xs text-momo-muted">{option.subtext}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
