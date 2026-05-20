import { GraduationCap, Plus, Upload } from "lucide-react";
import { Button } from "./Button";
import { StudentPaymentIllustration } from "./StudentPaymentIllustration";

export function HeroCard() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-[22px] border border-momo-border/80 bg-gradient-to-br from-white via-white to-momo-soft p-5 shadow-card sm:p-6 md:min-h-[276px] md:p-8"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_500px]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-momo-border bg-white px-3 py-1.5 text-xs font-bold text-momo-magenta shadow-[0_8px_20px_rgba(229,0,126,0.08)]">
            <GraduationCap className="h-4 w-4" />
            Student Pass dashboard
          </div>
          <h1
            className="mt-5 text-3xl font-extrabold leading-[1.04] tracking-normal text-momo-text sm:text-4xl md:text-[48px]"
            id="hero-title"
          >
            SpendSnap Student
          </h1>
          <p className="mt-3 text-lg font-semibold text-momo-text sm:text-xl">
            Chụp một khoản chi, để MoMo nhớ giúp bạn.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-momo-muted md:text-base">
            Theo dõi budget, chia bill và nhận gợi ý ưu đãi sinh viên đúng lúc.
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Button className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
              Chụp khoản chi
            </Button>
            <Button className="w-full sm:w-auto" leftIcon={<Upload className="h-4 w-4" />} variant="secondary">
              Upload bill
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[280px] items-center justify-center overflow-hidden rounded-[28px] lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50" />
          <div className="absolute h-56 w-56 rounded-full bg-pink-200/30 blur-2xl" />
          <StudentPaymentIllustration />
        </div>
      </div>
    </section>
  );
}
