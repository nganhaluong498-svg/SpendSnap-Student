export type BudgetColor = "pink" | "violet" | "orange" | "blue" | "green";

export const sourceBudgets = [
  {
    label: "Ví MoMo",
    total: "2.000.000đ",
    used: "1.300.000đ",
    remaining: "700.000đ",
    percent: 65,
    color: "pink",
  },
  {
    label: "Tài khoản NH",
    total: "1.500.000đ",
    used: "1.000.000đ",
    remaining: "500.000đ",
    percent: 67,
    color: "violet",
  },
  {
    label: "Tiền mặt",
    total: "500.000đ",
    used: "280.000đ",
    remaining: "220.000đ",
    percent: 56,
    color: "blue",
  },
] satisfies Array<{
  label: string;
  total: string;
  used: string;
  remaining: string;
  percent: number;
  color: BudgetColor;
}>;

export const categoryBudgets = [
  {
    label: "Ăn uống",
    total: "1.500.000đ",
    used: "1.050.000đ",
    remaining: "450.000đ",
    percent: 70,
    color: "pink",
    warning: "Sắp chạm hạn mức",
  },
  {
    label: "Mua sắm",
    total: "800.000đ",
    used: "650.000đ",
    remaining: "150.000đ",
    percent: 81,
    color: "violet",
    warning: "Cần chú ý",
  },
  {
    label: "Học tập",
    total: "600.000đ",
    used: "200.000đ",
    remaining: "400.000đ",
    percent: 33,
    color: "blue",
  },
  {
    label: "Giải trí",
    total: "500.000đ",
    used: "350.000đ",
    remaining: "150.000đ",
    percent: 70,
    color: "orange",
  },
] satisfies Array<{
  label: string;
  total: string;
  used: string;
  remaining: string;
  percent: number;
  color: BudgetColor;
  warning?: string;
}>;

export const latestExpenseImpact = {
  merchant: "The Coffee House",
  expense: "Cà phê sữa đá",
  amount: "45.000đ",
  impacts: ["Ví MoMo -45.000đ", "Ăn uống -45.000đ"],
  beforeAfter: ["Ví MoMo: 700.000đ → 655.000đ", "Ăn uống: 450.000đ → 405.000đ"],
};

export const bachHoaXanhBillItems = [
  { item: "Rau cải", amount: "15.000đ", category: "Ăn uống" },
  { item: "Trứng gà", amount: "28.000đ", category: "Ăn uống" },
  { item: "Ức gà", amount: "42.000đ", category: "Ăn uống" },
  { item: "Cá basa", amount: "38.000đ", category: "Ăn uống" },
  { item: "Sữa tươi", amount: "22.000đ", category: "Ăn uống" },
  { item: "Khăn giấy", amount: "15.000đ", category: "Mua sắm" },
  { item: "Túi đựng rác", amount: "8.000đ", category: "Mua sắm" },
];

export const aiBillSummary = ["Ăn uống: 145.000đ", "Mua sắm: 23.000đ", "Tiền mặt: -168.000đ"];

export const studentDeals = [
  {
    title: "Giảm 30.000đ cho thịt, cá",
    description: "Bill của bạn có thịt/cá và tổng hóa đơn trên 120.000đ.",
    condition: "Áp dụng cho sinh viên Student Pass",
    expiry: "Hạn dùng: 07/06/2026",
    cta: "Xem ưu đãi",
  },
  {
    title: "Haidilao giảm 15% cho sinh viên",
    description: "Ưu đãi trong khung giờ 10:00 - 17:00.",
    aiNote:
      "Ăn uống của bạn đang gần chạm hạn mức. Nếu vẫn có kế hoạch đi ăn nhóm, hãy dùng ưu đãi để giảm chi.",
    cta: "Xem ngay",
  },
];
