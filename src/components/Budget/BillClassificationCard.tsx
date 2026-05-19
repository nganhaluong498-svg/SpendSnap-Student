import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";

interface BillClassificationCardProps {
  onReview: () => void;
}

export function BillClassificationCard({ onReview }: BillClassificationCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Hóa đơn gần đây</h2>
          <p className="mt-1 text-sm text-momo-muted">Preview kết quả AI, mở để chỉnh sửa chi tiết.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-[20px] border border-momo-border bg-momo-soft/45 p-4 sm:flex-row">
        {imageFailed ? (
          <div className="flex h-[178px] w-[132px] shrink-0 flex-col items-center justify-center rounded-[16px] border border-white bg-white shadow-sm">
            <div className="h-20 w-14 rounded-[10px] border border-dashed border-momo-border bg-momo-soft" />
            <p className="mt-3 text-xs font-bold text-momo-muted">Receipt</p>
          </div>
        ) : (
          <img
            alt="Hóa đơn Bách Hóa Xanh"
            className="h-[178px] w-[132px] shrink-0 rounded-[16px] border border-white bg-white object-cover shadow-sm"
            onError={() => setImageFailed(true)}
            src="/images/bach-hoa-xanh-bill.png"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-extrabold text-momo-text">Bách Hóa Xanh</p>
              <p className="mt-2 text-2xl font-extrabold leading-none text-momo-text">168.000đ</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">
              <AlertTriangle className="h-3 w-3" />
              Cần kiểm tra
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-momo-muted">
            AI đã phân loại: Ăn uống 145.000đ, Mua sắm 23.000đ
          </p>
          <Button className="mt-4" onClick={onReview} size="sm" variant="secondary">
            Xem & chỉnh sửa
          </Button>
        </div>
      </div>
    </Card>
  );
}
