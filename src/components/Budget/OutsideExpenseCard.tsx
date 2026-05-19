import { Receipt, Upload, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { cn } from "../../lib/utils";

interface OutsideExpenseCardProps {
  onOpenManual: () => void;
  onOpenUpload: () => void;
}

export function OutsideExpenseCard({ onOpenManual, onOpenUpload }: OutsideExpenseCardProps) {
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
  const isManual = activeTab === "manual";

  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Nhập chi tiêu ngoài</h2>
          <p className="mt-1 text-sm leading-6 text-momo-muted">
            Ghi lại tiền mặt, chuyển khoản ngoài MoMo hoặc hóa đơn giấy.
          </p>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] bg-violet-50 text-momo-violet">
          <Receipt className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-[14px] bg-slate-50 p-1">
        <button
          className={cn(
            "h-9 rounded-[11px] px-3 text-sm font-bold transition",
            isManual ? "bg-white text-momo-primary shadow-sm" : "text-momo-muted",
          )}
          onClick={() => setActiveTab("manual")}
          type="button"
        >
          Nhập thủ công
        </button>
        <button
          className={cn(
            "h-9 rounded-[11px] px-3 text-sm font-bold transition",
            !isManual ? "bg-white text-momo-primary shadow-sm" : "text-momo-muted",
          )}
          onClick={() => setActiveTab("upload")}
          type="button"
        >
          Upload hóa đơn
        </button>
      </div>

      <div className="mt-3 rounded-[18px] border border-slate-100 bg-white p-3">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[12px] bg-momo-soft text-momo-primary">
            {isManual ? <WalletCards className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-momo-text">
              {isManual ? "Nhập thủ công" : "Upload hóa đơn"}
            </p>
            <p className="mt-1 text-sm text-momo-muted">
              {isManual
                ? "Tiền mặt lặt vặt không có hóa đơn."
                : "AI đọc bill và phân loại vào ngân sách."}
            </p>
            <p className="mt-2 rounded-[12px] bg-slate-50 px-3 py-1.5 text-xs font-medium text-momo-muted">
              {isManual
                ? "Gửi xe, nước suối, bánh mì, photocopy"
                : "Bách Hóa Xanh, nhà sách, siêu thị mini"}
            </p>
          </div>
        </div>
      </div>

      <Button
        className="mt-3"
        onClick={isManual ? onOpenManual : onOpenUpload}
        size="sm"
        variant="secondary"
      >
        {isManual ? "Nhập khoản chi" : "Upload hóa đơn"}
      </Button>
    </Card>
  );
}
