import { BookOpen, Gamepad2, ShoppingBag, Utensils, type LucideIcon } from "lucide-react";
import { categoryBudgets } from "../../data/budgetData";
import { Card } from "../Card";
import { BudgetProgressRow } from "./BudgetProgressRow";

const icons: Record<string, LucideIcon> = {
  "Ăn uống": Utensils,
  "Mua sắm": ShoppingBag,
  "Học tập": BookOpen,
  "Giải trí": Gamepad2,
};

export function CategoryBudgetCard() {
  return (
    <Card className="h-full p-5">
      <h2 className="text-lg font-extrabold text-momo-text">Theo danh mục</h2>
      <p className="mt-1 text-sm text-momo-muted">Tiền được dùng cho việc gì.</p>

      <div className="mt-3 divide-y divide-slate-100">
        {categoryBudgets.map((row) => {
          const Icon = icons[row.label] ?? Utensils;

          return (
            <BudgetProgressRow
              icon={<Icon className="h-4 w-4" />}
              iconClassName="bg-violet-50 text-momo-violet"
              key={row.label}
              {...row}
            />
          );
        })}
      </div>
    </Card>
  );
}
