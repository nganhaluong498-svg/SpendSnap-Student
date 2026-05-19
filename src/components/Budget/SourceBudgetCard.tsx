import { Banknote, CreditCard, Wallet, type LucideIcon } from "lucide-react";
import { sourceBudgets } from "../../data/budgetData";
import { Card } from "../Card";
import { BudgetProgressRow } from "./BudgetProgressRow";

const icons: Record<string, LucideIcon> = {
  "Ví MoMo": Wallet,
  "Tài khoản NH": CreditCard,
  "Tiền mặt": Banknote,
};

export function SourceBudgetCard() {
  return (
    <Card className="h-full p-5">
      <h2 className="text-lg font-extrabold text-momo-text">Theo nguồn tiền</h2>
      <p className="mt-1 text-sm text-momo-muted">Tiền đang nằm ở đâu và đã dùng bao nhiêu.</p>

      <div className="mt-3 divide-y divide-slate-100">
        {sourceBudgets.map((row) => {
          const Icon = icons[row.label] ?? Wallet;

          return (
            <BudgetProgressRow
              icon={<Icon className="h-4 w-4" />}
              iconClassName="bg-momo-soft text-momo-primary"
              key={row.label}
              {...row}
            />
          );
        })}
      </div>
    </Card>
  );
}
