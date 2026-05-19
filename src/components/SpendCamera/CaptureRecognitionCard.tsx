import { Camera, CheckCircle, Edit3, Upload, X } from "lucide-react";
import { Button } from "../Button";
import { Card } from "../Card";

const recognitionRows = [
  { label: "Cửa hàng", value: "The Coffee House" },
  { label: "Danh mục gợi ý", value: "Ăn uống", pill: true },
  { label: "Số tiền", value: "45.000đ" },
  { label: "Thời gian", value: "10:23 - 10/05/2026" },
  { label: "Ghi chú", value: "Cà phê sữa đá" },
];

export function CaptureRecognitionCard() {
  return (
    <Card className="h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Nhận diện khoản chi</h2>
          <p className="mt-1 text-sm text-momo-muted">Ảnh bill thử nghiệm, không dùng dữ liệu thật</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          <CheckCircle className="h-3.5 w-3.5" />
          Sẵn sàng
        </span>
      </div>

      <div className="mt-5 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="relative mx-auto h-[340px] w-full max-w-[260px] overflow-hidden rounded-[24px] border border-momo-border bg-momo-soft shadow-[0_16px_32px_rgba(17,24,39,0.08)]">
          <img
            alt="Ảnh khoản chi"
            className="h-full w-full object-cover"
            src="/images/coffee-house.jpg"
          />
          <button
            aria-label="Đóng ảnh"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:text-momo-primary"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
          <button
            className="absolute bottom-5 left-1/2 h-9 -translate-x-1/2 rounded-full bg-white px-5 text-sm font-bold text-momo-primary shadow-sm transition hover:bg-momo-soft"
            type="button"
          >
            Xem lại ảnh
          </button>
        </div>

        <div className="min-w-0 space-y-5">
          <div>
            <p className="text-sm font-bold text-momo-text">Chụp hoặc upload bill</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button leftIcon={<Camera className="h-4 w-4" />}>Chụp ảnh</Button>
              <Button leftIcon={<Upload className="h-4 w-4" />} variant="secondary">
                Upload ảnh
              </Button>
            </div>
            <button
              className="mt-4 flex w-full flex-col items-center justify-center rounded-[20px] border border-dashed border-momo-primary/40 bg-momo-soft/70 px-4 py-5 text-center transition hover:border-momo-primary hover:bg-momo-soft"
              type="button"
            >
              <Upload className="h-6 w-6 text-momo-primary" />
              <span className="mt-2 text-sm font-bold text-momo-text">Kéo & thả bill vào đây</span>
              <span className="mt-1 text-xs text-momo-muted">hoặc click để chọn file</span>
              <span className="mt-1 text-xs text-momo-muted">JPG, PNG, PDF tối đa 10MB</span>
            </button>
          </div>

          <div className="rounded-[20px] border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-extrabold text-momo-text">AI đã nhận diện</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5" />
                Độ tin cậy cao
              </span>
            </div>

            <div className="mt-4 divide-y divide-slate-200/80">
              {recognitionRows.map((row) => (
                <div className="flex items-center justify-between gap-4 py-2.5" key={row.label}>
                  <span className="text-sm text-momo-muted">{row.label}</span>
                  <span className="flex items-center gap-2 text-right text-sm font-bold text-momo-text">
                    {row.pill ? (
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-momo-violet">
                        {row.value}
                      </span>
                    ) : (
                      row.value
                    )}
                    <Edit3 className="h-3.5 w-3.5 text-slate-300" />
                  </span>
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full">Ghi nhận chi tiêu</Button>
            <p className="mt-2 text-center text-xs leading-5 text-momo-muted">
              AI có thể sai, vui lòng kiểm tra lại thông tin trước khi lưu.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
