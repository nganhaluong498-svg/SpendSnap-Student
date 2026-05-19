export const topNavItems = [
  "Trang chủ",
  "Chuyển tiền",
  "Thanh toán",
  "Dịch vụ",
  "Nạp/Rút",
  "Ưu đãi",
  "Quản lý",
] as const;

export type CategoryTone = "pink" | "violet" | "warning";

export const budgetCategories: Array<{
  label: string;
  value: number;
  tone: CategoryTone;
}> = [
  { label: "Ăn uống", value: 70, tone: "warning" },
  { label: "Mua sắm", value: 54, tone: "pink" },
  { label: "Giải trí", value: 44, tone: "violet" },
];

export type QuickActionIcon = "camera" | "users" | "wallet";

export const quickActions: Array<{
  id: string;
  title: string;
  description: string;
  icon: QuickActionIcon;
}> = [
  {
    id: "capture",
    title: "Chụp khoản chi",
    description: "AI nhận diện món, quán và danh mục",
    icon: "camera",
  },
  {
    id: "upload",
    title: "Xem Ngân Sách",
    description: "Theo dõi nguồn tiền và danh mục chi tiêu",
    icon: "wallet",
  },
  {
    id: "split",
    title: "Chia hoá đơn nhóm",
    description: "Chia tiền và theo dõi ai đã trả",
    icon: "users",
  },
];

export type DiaryIcon = "coffee" | "food" | "cinema" | "book";

export const diaryItems: Array<{
  id: string;
  title: string;
  price: string;
  icon: DiaryIcon;
  gradient: string;
}> = [
  {
    id: "coffee",
    title: "Coffee",
    price: "45.000đ",
    icon: "coffee",
    gradient: "from-[#FFE8F4] via-[#FFF7FB] to-[#EDE9FE]",
  },
  {
    id: "food",
    title: "Food",
    price: "65.000đ",
    icon: "food",
    gradient: "from-[#FFF1DF] via-[#FFF9F0] to-[#FFE8F4]",
  },
  {
    id: "cinema",
    title: "Cinema",
    price: "120.000đ",
    icon: "cinema",
    gradient: "from-[#EDE9FE] via-[#F8F5FF] to-[#FCE7F3]",
  },
  {
    id: "bookstore",
    title: "Bookstore",
    price: "85.000đ",
    icon: "book",
    gradient: "from-[#E0F2FE] via-[#F7FBFF] to-[#FFE8F4]",
  },
];
