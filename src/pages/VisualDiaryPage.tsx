import {
  Camera,
  ChevronDown,
  ChevronRight,
  Globe2,
  Heart,
  Image as ImageIcon,
  Lock,
  MessageCircle,
  Reply,
  SendHorizontal,
  Upload,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import {
  friendOrderIds,
  friends,
  isTeamMember,
  sortFriendsByTeamPriority,
  usersById,
  type AppUser,
  type FriendId,
  type UserId,
} from "../data/users";
import { cn } from "../lib/utils";

type Privacy = "private" | "friends" | "public";
type FilterId = "all" | "you" | "friends" | UserId;

interface DiaryPost {
  amount: string;
  caption: string;
  category: string;
  id: string;
  image: string;
  likeCount: number;
  ownerId: UserId;
  privacy: Privacy;
  timeAgo: string;
}

interface DiaryComment {
  authorId: UserId;
  id: string;
  likes: number;
  replies?: DiaryComment[];
  text: string;
  timeAgo: string;
}

type DiaryMomentSeed = Omit<DiaryPost, "id" | "ownerId">;

const diaryMomentsByUser: Record<UserId, DiaryMomentSeed[]> = {
  you: [
    { amount: "85.000đ", caption: "thưởng bản thân", category: "Ăn uống", image: "/images/diary/food-1.png", likeCount: 8, privacy: "private", timeAgo: "19h" },
    { amount: "65.000đ", caption: "mì cay tối qua", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 14, privacy: "public", timeAgo: "5h" },
    { amount: "168.000đ", caption: "bill cá nhân", category: "Mua sắm", image: "/images/diary/bill-1.png", likeCount: 5, privacy: "private", timeAgo: "1d" },
    { amount: "35.000đ", caption: "photo tài liệu", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 11, privacy: "friends", timeAgo: "1d" },
    { amount: "45.000đ", caption: "cafe sau giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 18, privacy: "public", timeAgo: "2d" },
    { amount: "12.000đ", caption: "ăn sáng vội", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 9, privacy: "friends", timeAgo: "2d" },
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 22, privacy: "public", timeAgo: "3d" },
    { amount: "0đ", caption: "chạy deadline", category: "Học tập", image: "/images/diary/class-1.png", likeCount: 16, privacy: "friends", timeAgo: "4d" },
    { amount: "45.000đ", caption: "trà sữa sau deadline", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 13, privacy: "private", timeAgo: "5d" },
    { amount: "80.000đ", caption: "lẩu với nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 20, privacy: "public", timeAgo: "6d" },
    { amount: "22.000đ", caption: "xe ôm tới lớp", category: "Di chuyển", image: "/images/diary/shopping-1.png", likeCount: 7, privacy: "friends", timeAgo: "1w" },
    { amount: "85.000đ", caption: "mua sách tham khảo", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 15, privacy: "private", timeAgo: "1w" },
  ],
  "ngan-ha": [
    { amount: "45.000đ", caption: "cafe sau giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 12, privacy: "friends", timeAgo: "2h" },
    { amount: "129.000đ", caption: "sắm đồ dùng mới", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 17, privacy: "public", timeAgo: "3d" },
    { amount: "35.000đ", caption: "học bài thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 10, privacy: "friends", timeAgo: "1w" },
    { amount: "18.000đ", caption: "ăn sáng vội", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 9, privacy: "public", timeAgo: "1w" },
    { amount: "25.000đ", caption: "bus về ký túc xá", category: "Di chuyển", image: "/images/diary/class-1.png", likeCount: 8, privacy: "friends", timeAgo: "8d" },
    { amount: "60.000đ", caption: "trà sữa cuối tuần", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 21, privacy: "public", timeAgo: "9d" },
    { amount: "0đ", caption: "học nhóm marketing", category: "Học tập", image: "/images/diary/friends-1.png", likeCount: 13, privacy: "friends", timeAgo: "10d" },
    { amount: "85.000đ", caption: "mua sách", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 16, privacy: "public", timeAgo: "11d" },
    { amount: "72.000đ", caption: "đi siêu thị", category: "Mua sắm", image: "/images/diary/bill-1.png", likeCount: 7, privacy: "friends", timeAgo: "12d" },
    { amount: "90.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/food-1.png", likeCount: 19, privacy: "public", timeAgo: "2w" },
    { amount: "110.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 18, privacy: "friends", timeAgo: "2w" },
    { amount: "0đ", caption: "selfie sau bài thuyết trình", category: "Học tập", image: "/images/diary/selfie-1.png", likeCount: 24, privacy: "public", timeAgo: "2w" },
  ],
  "hoang-nam": [
    { amount: "80.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 18, privacy: "public", timeAgo: "4h" },
    { amount: "65.000đ", caption: "ăn nhẹ cùng nhóm", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 11, privacy: "public", timeAgo: "5d" },
    { amount: "0đ", caption: "chạy deadline", category: "Học tập", image: "/images/diary/class-1.png", likeCount: 15, privacy: "friends", timeAgo: "6d" },
    { amount: "42.000đ", caption: "cafe làm bài", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 9, privacy: "public", timeAgo: "1w" },
    { amount: "30.000đ", caption: "gửi xe cả tuần", category: "Di chuyển", image: "/images/diary/shopping-1.png", likeCount: 6, privacy: "friends", timeAgo: "8d" },
    { amount: "100.000đ", caption: "lẩu với nhóm", category: "Chia bill", image: "/images/diary/food-1.png", likeCount: 20, privacy: "public", timeAgo: "9d" },
    { amount: "25.000đ", caption: "photo tài liệu", category: "Học tập", image: "/images/diary/bill-1.png", likeCount: 8, privacy: "friends", timeAgo: "10d" },
    { amount: "55.000đ", caption: "trà sữa sau deadline", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 14, privacy: "public", timeAgo: "11d" },
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 17, privacy: "friends", timeAgo: "12d" },
    { amount: "0đ", caption: "học bài ở thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 12, privacy: "public", timeAgo: "2w" },
    { amount: "145.000đ", caption: "mua hoodie sale", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 10, privacy: "friends", timeAgo: "2w" },
    { amount: "0đ", caption: "ảnh nhóm câu lạc bộ", category: "Giải trí", image: "/images/diary/selfie-1.png", likeCount: 22, privacy: "public", timeAgo: "3w" },
  ],
  "quynh-anh": [
    { amount: "85.000đ", caption: "mua sách", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 13, privacy: "public", timeAgo: "1d" },
    { amount: "0đ", caption: "selfie sau bài thuyết trình", category: "Học tập", image: "/images/diary/selfie-1.png", likeCount: 25, privacy: "friends", timeAgo: "4d" },
    { amount: "40.000đ", caption: "cafe sau giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 16, privacy: "public", timeAgo: "5d" },
    { amount: "20.000đ", caption: "photo tài liệu", category: "Học tập", image: "/images/diary/bill-1.png", likeCount: 7, privacy: "friends", timeAgo: "6d" },
    { amount: "75.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 19, privacy: "public", timeAgo: "1w" },
    { amount: "110.000đ", caption: "đi siêu thị", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 11, privacy: "friends", timeAgo: "8d" },
    { amount: "35.000đ", caption: "cơm trưa căn tin", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 9, privacy: "public", timeAgo: "9d" },
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 18, privacy: "friends", timeAgo: "10d" },
    { amount: "0đ", caption: "chạy deadline", category: "Học tập", image: "/images/diary/class-1.png", likeCount: 14, privacy: "public", timeAgo: "11d" },
    { amount: "55.000đ", caption: "trà sữa sau deadline", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 15, privacy: "friends", timeAgo: "12d" },
    { amount: "24.000đ", caption: "đặt xe đi học", category: "Di chuyển", image: "/images/diary/study-1.png", likeCount: 6, privacy: "public", timeAgo: "2w" },
    { amount: "68.000đ", caption: "mì cay tối qua", category: "Ăn uống", image: "/images/diary/food-1.png", likeCount: 20, privacy: "friends", timeAgo: "2w" },
  ],
  "the-anh": [
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 16, privacy: "friends", timeAgo: "2d" },
    { amount: "0đ", caption: "tụ tập sau giờ học", category: "Giải trí", image: "/images/diary/friends-1.png", likeCount: 21, privacy: "public", timeAgo: "1w" },
    { amount: "80.000đ", caption: "lẩu với nhóm", category: "Chia bill", image: "/images/diary/food-1.png", likeCount: 18, privacy: "public", timeAgo: "8d" },
    { amount: "45.000đ", caption: "cafe sau giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 12, privacy: "friends", timeAgo: "9d" },
    { amount: "0đ", caption: "học bài ở thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 10, privacy: "public", timeAgo: "10d" },
    { amount: "32.000đ", caption: "xe bus về nhà", category: "Di chuyển", image: "/images/diary/class-1.png", likeCount: 7, privacy: "friends", timeAgo: "11d" },
    { amount: "58.000đ", caption: "trà sữa sau deadline", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 13, privacy: "public", timeAgo: "12d" },
    { amount: "90.000đ", caption: "mua sách", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 11, privacy: "friends", timeAgo: "2w" },
    { amount: "150.000đ", caption: "đi siêu thị", category: "Mua sắm", image: "/images/diary/bill-1.png", likeCount: 9, privacy: "public", timeAgo: "2w" },
    { amount: "0đ", caption: "ảnh nhóm sau workshop", category: "Giải trí", image: "/images/diary/selfie-1.png", likeCount: 24, privacy: "friends", timeAgo: "2w" },
    { amount: "68.000đ", caption: "ăn sáng vội", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 8, privacy: "public", timeAgo: "3w" },
    { amount: "180.000đ", caption: "mua balo mới", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 15, privacy: "friends", timeAgo: "3w" },
  ],
  "bao-tam": [
    { amount: "55.000đ", caption: "trà sữa sau deadline", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 14, privacy: "public", timeAgo: "3h" },
    { amount: "28.000đ", caption: "mua bút highlight", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 9, privacy: "friends", timeAgo: "6h" },
    { amount: "45.000đ", caption: "cafe học nhóm", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 18, privacy: "public", timeAgo: "1d" },
    { amount: "18.000đ", caption: "ăn sáng vội", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 8, privacy: "friends", timeAgo: "2d" },
    { amount: "92.000đ", caption: "đi siêu thị mini", category: "Mua sắm", image: "/images/diary/bill-1.png", likeCount: 11, privacy: "public", timeAgo: "3d" },
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 19, privacy: "friends", timeAgo: "4d" },
    { amount: "0đ", caption: "chạy deadline", category: "Học tập", image: "/images/diary/class-1.png", likeCount: 13, privacy: "public", timeAgo: "5d" },
    { amount: "80.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 17, privacy: "friends", timeAgo: "6d" },
    { amount: "35.000đ", caption: "bánh mì sáng", category: "Ăn uống", image: "/images/diary/food-1.png", likeCount: 10, privacy: "public", timeAgo: "1w" },
    { amount: "22.000đ", caption: "xe ôm về nhà", category: "Di chuyển", image: "/images/diary/shopping-1.png", likeCount: 7, privacy: "friends", timeAgo: "1w" },
    { amount: "0đ", caption: "selfie sau workshop", category: "Giải trí", image: "/images/diary/selfie-1.png", likeCount: 22, privacy: "public", timeAgo: "2w" },
    { amount: "70.000đ", caption: "ăn vặt sau giờ học", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 15, privacy: "friends", timeAgo: "2w" },
  ],
  "dinh-tam": [
    { amount: "25.000đ", caption: "photo tài liệu", category: "Học tập", image: "/images/diary/bill-1.png", likeCount: 8, privacy: "friends", timeAgo: "4h" },
    { amount: "32.000đ", caption: "cơm trưa căn tin", category: "Ăn uống", image: "/images/diary/food-1.png", likeCount: 12, privacy: "public", timeAgo: "9h" },
    { amount: "0đ", caption: "chạy deadline", category: "Học tập", image: "/images/diary/class-1.png", likeCount: 15, privacy: "friends", timeAgo: "1d" },
    { amount: "60.000đ", caption: "mua sách cũ", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 11, privacy: "public", timeAgo: "2d" },
    { amount: "95.000đ", caption: "lẩu với nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 20, privacy: "friends", timeAgo: "3d" },
    { amount: "8.000đ", caption: "vé xe buýt", category: "Di chuyển", image: "/images/diary/shopping-1.png", likeCount: 6, privacy: "public", timeAgo: "4d" },
    { amount: "45.000đ", caption: "cafe trước giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 13, privacy: "friends", timeAgo: "5d" },
    { amount: "120.000đ", caption: "vé phim", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 17, privacy: "public", timeAgo: "6d" },
    { amount: "22.000đ", caption: "nước suối thư viện", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 9, privacy: "friends", timeAgo: "1w" },
    { amount: "130.000đ", caption: "mua áo khoác mỏng", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 10, privacy: "public", timeAgo: "1w" },
    { amount: "0đ", caption: "học ở thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 14, privacy: "friends", timeAgo: "2w" },
    { amount: "50.000đ", caption: "trà đào cuối tuần", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 16, privacy: "public", timeAgo: "2w" },
  ],
  "dat-huy": [
    { amount: "42.000đ", caption: "cafe trước giờ học", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 13, privacy: "public", timeAgo: "1h" },
    { amount: "85.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/friends-1.png", likeCount: 18, privacy: "friends", timeAgo: "5h" },
    { amount: "220.000đ", caption: "mua tai nghe", category: "Mua sắm", image: "/images/diary/shopping-1.png", likeCount: 12, privacy: "public", timeAgo: "1d" },
    { amount: "18.000đ", caption: "bánh mì sáng", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 8, privacy: "friends", timeAgo: "2d" },
    { amount: "120.000đ", caption: "vé phim", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 15, privacy: "public", timeAgo: "3d" },
    { amount: "12.000đ", caption: "nước suối thư viện", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 7, privacy: "friends", timeAgo: "4d" },
    { amount: "30.000đ", caption: "photo tài liệu", category: "Học tập", image: "/images/diary/bill-1.png", likeCount: 9, privacy: "public", timeAgo: "5d" },
    { amount: "0đ", caption: "học bài ở thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 11, privacy: "friends", timeAgo: "6d" },
    { amount: "80.000đ", caption: "lẩu với nhóm", category: "Chia bill", image: "/images/diary/food-1.png", likeCount: 19, privacy: "public", timeAgo: "1w" },
    { amount: "28.000đ", caption: "xe bus tới lớp", category: "Di chuyển", image: "/images/diary/class-1.png", likeCount: 6, privacy: "friends", timeAgo: "1w" },
    { amount: "0đ", caption: "ảnh nhóm câu lạc bộ", category: "Giải trí", image: "/images/diary/selfie-1.png", likeCount: 21, privacy: "public", timeAgo: "2w" },
    { amount: "75.000đ", caption: "đồ ăn vặt", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 14, privacy: "friends", timeAgo: "2w" },
  ],
  "nhat-ha": [
    { amount: "68.000đ", caption: "mì cay tối qua", category: "Ăn uống", image: "/images/diary/food-1.png", likeCount: 12, privacy: "public", timeAgo: "7h" },
    { amount: "55.000đ", caption: "sổ tay mới", category: "Học tập", image: "/images/diary/bookstore-1.png", likeCount: 9, privacy: "friends", timeAgo: "1d" },
    { amount: "50.000đ", caption: "trà đào cuối tuần", category: "Ăn uống", image: "/images/diary/drink-1.png", likeCount: 16, privacy: "public", timeAgo: "2d" },
    { amount: "0đ", caption: "học ở thư viện", category: "Học tập", image: "/images/diary/study-1.png", likeCount: 11, privacy: "friends", timeAgo: "3d" },
    { amount: "35.000đ", caption: "ăn sáng vội", category: "Ăn uống", image: "/images/diary/food-2.png", likeCount: 10, privacy: "public", timeAgo: "4d" },
    { amount: "25.000đ", caption: "đi chơi công viên", category: "Giải trí", image: "/images/diary/friends-1.png", likeCount: 18, privacy: "friends", timeAgo: "5d" },
    { amount: "45.000đ", caption: "cafe học nhóm", category: "Ăn uống", image: "/images/diary/coffee-1.png", likeCount: 13, privacy: "public", timeAgo: "6d" },
    { amount: "15.000đ", caption: "gửi xe", category: "Di chuyển", image: "/images/diary/class-1.png", likeCount: 6, privacy: "friends", timeAgo: "1w" },
    { amount: "120.000đ", caption: "xem phim cuối tuần", category: "Giải trí", image: "/images/diary/cinema-1.png", likeCount: 17, privacy: "public", timeAgo: "1w" },
    { amount: "75.000đ", caption: "đi siêu thị mini", category: "Mua sắm", image: "/images/diary/bill-1.png", likeCount: 8, privacy: "friends", timeAgo: "2w" },
    { amount: "0đ", caption: "selfie sau bài thuyết trình", category: "Học tập", image: "/images/diary/selfie-1.png", likeCount: 20, privacy: "public", timeAgo: "2w" },
    { amount: "90.000đ", caption: "đi ăn nhóm", category: "Chia bill", image: "/images/diary/food-1.png", likeCount: 15, privacy: "friends", timeAgo: "3w" },
  ],
};

const posts: DiaryPost[] = (Object.keys(diaryMomentsByUser) as UserId[]).flatMap((ownerId) =>
  diaryMomentsByUser[ownerId].map((moment, index) => ({
    ...moment,
    id: `${ownerId}-${index + 1}`,
    ownerId,
  })),
);

const initialComments: Record<string, DiaryComment[]> = {
  "ngan-ha-1": [
    {
      authorId: "you",
      id: "c1",
      likes: 2,
      text: "Quán này dùng Student Pass được không Hà?",
      timeAgo: "1h",
    },
    {
      authorId: "ngan-ha",
      id: "c2",
      likes: 1,
      text: "Có nha, cuối tuần giảm đồ uống khá ổn.",
      timeAgo: "42p",
    },
  ],
  "the-anh-1": [
    {
      authorId: "quynh-anh",
      id: "c3",
      likes: 3,
      text: "Phim vui, lần sau đi sớm hơn để kịp combo sinh viên.",
      timeAgo: "1d",
    },
  ],
  "you-2": [
    {
      authorId: "ngan-ha",
      id: "c4",
      likes: 4,
      replies: [
        {
          authorId: "you",
          id: "c4-r1",
          likes: 1,
          text: "Mai rủ thêm Quỳnh Anh đi chung nha.",
          timeAgo: "3h",
        },
      ],
      text: "Nhìn ngon quá 😭",
      timeAgo: "4h",
    },
    {
      authorId: "hoang-nam",
      id: "c5",
      likes: 2,
      text: "Mai đi nữa không?",
      timeAgo: "45m",
    },
  ],
  "hoang-nam-1": [
    {
      authorId: "you",
      id: "c6",
      likes: 2,
      text: "Nhớ gửi mình split bill nha.",
      timeAgo: "2h",
    },
  ],
};

const filterOptions: Array<{ label: string; value: FilterId }> = [
  { label: "Mọi người", value: "all" },
  { label: "You", value: "you" },
  { label: "Bạn thân", value: "friends" },
  ...sortFriendsByTeamPriority(friends).map((friend) => ({ label: friend.name, value: friend.id })),
];

const privacyMeta: Record<Privacy, { Icon: LucideIcon; label: string }> = {
  friends: { Icon: Users, label: "Bạn thân" },
  private: { Icon: Lock, label: "Chỉ mình tôi" },
  public: { Icon: Globe2, label: "Mọi người" },
};

function getOwnerDisplayName(post: DiaryPost) {
  return post.ownerId === "you" ? "You" : usersById[post.ownerId].name;
}

function getFilterTitle(filter: FilterId) {
  if (filter === "all") return "Khoảnh khắc của mọi người";
  if (filter === "you") return "Nhật ký của bạn";
  if (filter === "friends") return "Khoảnh khắc bạn thân";
  return `Nhật ký của ${usersById[filter].name}`;
}

function countComments(comments: DiaryComment[]) {
  return comments.reduce((total, comment) => total + 1 + (comment.replies?.length ?? 0), 0);
}

function isVisibleForFilter(post: DiaryPost, filter: FilterId) {
  if (filter === "all") return post.privacy !== "private";
  if (filter === "you") return post.ownerId === "you";
  if (filter === "friends") return post.privacy === "friends";
  return post.ownerId === filter && post.privacy !== "private";
}

function getOwnerSortIndex(ownerId: UserId) {
  if (ownerId === "you") return friendOrderIds.length + 1;
  const index = friendOrderIds.indexOf(ownerId as FriendId);
  return index === -1 ? friendOrderIds.length : index;
}

function sortPostsByTeamPriority(items: DiaryPost[]) {
  return [...items].sort((a, b) => {
    const ownerDiff = getOwnerSortIndex(a.ownerId) - getOwnerSortIndex(b.ownerId);
    if (ownerDiff !== 0) return ownerDiff;
    return posts.indexOf(a) - posts.indexOf(b);
  });
}

function isUserFilter(value: FilterId): value is UserId {
  return value !== "all" && value !== "friends";
}

function Avatar({ user, size = "md" }: { size?: "sm" | "md"; user: AppUser }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(17,24,39,0.14)]",
        user.avatarColor,
        size === "sm" ? "h-9 w-9" : "h-11 w-11",
      )}
    >
      {user.initials}
    </div>
  );
}

function FilterIcon({ value }: { value: FilterId }) {
  if (value === "all") {
    return (
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-50 text-momo-violet">
        <Globe2 className="h-4 w-4" />
      </div>
    );
  }

  if (value === "friends") {
    return (
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-momo-soft text-momo-primary">
        <Users className="h-4 w-4" />
      </div>
    );
  }

  return <Avatar size="sm" user={usersById[value]} />;
}

function DiaryFilterDropdown({
  filter,
  onChange,
}: {
  filter: FilterId;
  onChange: (filter: FilterId) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = filterOptions.find((option) => option.value === filter) ?? filterOptions[0];

  function selectFilter(nextFilter: FilterId) {
    onChange(nextFilter);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        className="flex h-11 min-w-[220px] items-center justify-between gap-3 rounded-full border border-momo-border bg-white px-3 text-sm font-extrabold text-momo-text shadow-card transition hover:border-momo-primary/30 hover:bg-momo-soft/50"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="flex items-center gap-2">
          <FilterIcon value={activeOption.value} />
          {activeOption.label}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-momo-muted transition", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-20 max-h-[520px] w-[292px] overflow-y-auto rounded-[22px] border border-momo-border bg-white p-2 shadow-[0_22px_50px_rgba(17,24,39,0.14)]">
          {filterOptions.map((option, index) => {
            const selected = option.value === filter;
            const showTeamSection = index === 3;
            const showOtherSection =
              isUserFilter(option.value) &&
              option.value !== "you" &&
              !isTeamMember(option.value) &&
              filterOptions
                .slice(0, index)
                .every(
                  (previous) =>
                    !isUserFilter(previous.value) ||
                    previous.value === "you" ||
                    isTeamMember(previous.value),
                );
            const isTeamOption =
              isUserFilter(option.value) && option.value !== "you" && isTeamMember(option.value);

            return (
              <div key={option.value}>
                {showTeamSection && (
                  <p className="px-3 pb-1 pt-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-momo-muted">
                    Thành viên nhóm
                  </p>
                )}
                {showOtherSection && (
                  <p className="px-3 pb-1 pt-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-momo-muted">
                    Bạn bè khác
                  </p>
                )}
                <button
                  className={cn(
                    "flex h-12 w-full items-center gap-3 rounded-[16px] px-3 text-left text-sm font-bold transition",
                    selected
                      ? "bg-momo-soft text-momo-primary"
                      : "text-momo-text hover:bg-slate-50",
                  )}
                  onClick={() => selectFilter(option.value)}
                  type="button"
                >
                  <FilterIcon value={option.value} />
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {isTeamOption && (
                    <span className="shrink-0 rounded-full bg-momo-soft px-2 py-0.5 text-[10px] font-bold text-momo-primary">
                      Thành viên nhóm
                    </span>
                  )}
                  <ChevronRight
                    className={cn("h-4 w-4 shrink-0", selected ? "text-momo-primary" : "text-slate-300")}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ImageFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid place-items-center bg-gradient-to-br from-momo-soft via-white to-violet-50 text-momo-primary",
        className,
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-[20px] bg-white/80 shadow-card">
        <ImageIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

function DiaryImage({
  alt,
  className,
  errored,
  onError,
  src,
}: {
  alt: string;
  className: string;
  errored: boolean;
  onError: () => void;
  src: string;
}) {
  if (errored) {
    return <ImageFallback className={className} />;
  }

  return <img alt={alt} className={className} onError={onError} src={src} />;
}

export function VisualDiaryPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(() => new Set());
  const [comments, setComments] = useState<Record<string, DiaryComment[]>>(initialComments);
  const [likedComments, setLikedComments] = useState<Set<string>>(() => new Set());
  const [commentDraft, setCommentDraft] = useState("");
  const [replyTarget, setReplyTarget] = useState<{ authorName: string; commentId: string } | null>(
    null,
  );

  const visiblePosts = useMemo(() => {
    const filteredPosts = posts.filter((post) => isVisibleForFilter(post, filter));
    return filter === "all" || filter === "friends"
      ? sortPostsByTeamPriority(filteredPosts)
      : filteredPosts;
  }, [filter]);
  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;
  const selectedOwner = selectedPost ? usersById[selectedPost.ownerId] : null;
  const selectedComments = selectedPost ? comments[selectedPost.id] ?? [] : [];
  const selectedCommentCount = countComments(selectedComments);

  function togglePostLike(postId: string) {
    setLikedPosts((current) => {
      const next = new Set(current);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }

  function toggleCommentLike(commentId: string) {
    setLikedComments((current) => {
      const next = new Set(current);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  }

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPost || !commentDraft.trim()) return;

    const nextComment: DiaryComment = {
      authorId: "you",
      id: `comment-${Date.now()}`,
      likes: 0,
      text: commentDraft.trim(),
      timeAgo: "Vừa xong",
    };

    setComments((current) => {
      const postComments = current[selectedPost.id] ?? [];

      if (replyTarget) {
        return {
          ...current,
          [selectedPost.id]: postComments.map((comment) =>
            comment.id === replyTarget.commentId
              ? { ...comment, replies: [...(comment.replies ?? []), nextComment] }
              : comment,
          ),
        };
      }

      return {
        ...current,
        [selectedPost.id]: [...postComments, nextComment],
      };
    });
    setCommentDraft("");
    setReplyTarget(null);
  }

  function openPost(postId: string) {
    setSelectedPostId(postId);
    setCommentDraft("");
    setReplyTarget(null);
  }

  function closePost() {
    setSelectedPostId(null);
    setCommentDraft("");
    setReplyTarget(null);
  }

  function startReply(comment: DiaryComment) {
    const authorName = usersById[comment.authorId].name;
    setReplyTarget({ authorName, commentId: comment.id });
    setCommentDraft("");
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-momo-primary">SpendSnap Student</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-normal text-momo-text sm:text-3xl">
              Nhật ký ảnh
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-momo-muted">
              Xem lại các khoảnh khắc chi tiêu và chia sẻ cùng bạn bè.
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Button className="w-full sm:w-auto" leftIcon={<Camera className="h-4 w-4" />}>
              Chụp ảnh mới
            </Button>
            <Button className="w-full sm:w-auto" leftIcon={<Upload className="h-4 w-4" />} variant="secondary">
              Upload ảnh
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-momo-text">{getFilterTitle(filter)}</h2>
              <p className="mt-1 text-sm text-momo-muted">
                {visiblePosts.length} ảnh đang hiển thị theo quyền xem hiện tại.
              </p>
            </div>
            <DiaryFilterDropdown filter={filter} onChange={setFilter} />
          </div>

          {visiblePosts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {visiblePosts.map((post, index) => {
                const owner = usersById[post.ownerId];
                const PrivacyIcon = privacyMeta[post.privacy].Icon;
                const isTall = index % 5 === 0 || index % 5 === 3;

                return (
                  <button
                    className="group relative min-w-0 overflow-hidden rounded-[24px] border border-momo-border/75 bg-white text-left shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                    key={post.id}
                    onClick={() => openPost(post.id)}
                    type="button"
                  >
                    <div className={cn("relative overflow-hidden", isTall ? "aspect-[3/4]" : "aspect-[4/5]")}>
                      <DiaryImage
                        alt={post.caption}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        errored={Boolean(imageErrors[post.id])}
                        onError={() => setImageErrors((current) => ({ ...current, [post.id]: true }))}
                        src={post.image}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 via-slate-950/18 to-transparent" />

                      <div className="absolute left-4 top-4">
                        <Avatar size="sm" user={owner} />
                      </div>

                      <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-momo-muted shadow-sm backdrop-blur">
                        <PrivacyIcon className="h-4 w-4" />
                      </div>

                      <div className="absolute inset-x-4 bottom-4">
                        <p className="text-sm font-extrabold text-white">{getOwnerDisplayName(post)}</p>
                        <p className="mt-1 line-clamp-1 text-sm font-semibold text-white/90">
                          {post.caption}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-momo-text backdrop-blur">
                            {post.amount}
                          </span>
                          <span className="rounded-full bg-momo-primary/90 px-3 py-1 text-xs font-bold text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid min-h-[280px] place-items-center rounded-[24px] border border-dashed border-momo-border bg-momo-soft/40 p-6 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-[20px] bg-white text-momo-primary shadow-card">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-base font-extrabold text-momo-text">
                  Chưa có ảnh nào trong mục này.
                </p>
                <p className="mt-2 text-sm text-momo-muted">
                  Thử đổi bộ lọc để xem thêm nhật ký ảnh từ bạn bè.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {selectedPost && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-2 backdrop-blur-sm sm:p-4">
          <button
            aria-label="Đóng trình xem ảnh"
            className="absolute inset-0"
            onClick={closePost}
            type="button"
          />

          <div className="relative grid h-[calc(100dvh-24px)] max-h-[760px] w-[calc(100vw-16px)] grid-rows-[minmax(190px,34dvh)_minmax(0,1fr)] overflow-hidden rounded-[22px] border border-white/40 bg-white shadow-[0_28px_80px_rgba(17,24,39,0.28)] sm:h-[calc(100vh-80px)] sm:w-[min(1100px,92vw)] sm:rounded-[28px] lg:grid-cols-[1.4fr_0.9fr] lg:grid-rows-1">
            <div className="relative min-h-0 bg-slate-950/5">
              <DiaryImage
                alt={selectedPost.caption}
                className="h-full w-full object-cover"
                errored={Boolean(imageErrors[selectedPost.id])}
                onError={() => setImageErrors((current) => ({ ...current, [selectedPost.id]: true }))}
                src={selectedPost.image}
              />
            </div>

            <div className="flex min-h-0 flex-col overflow-hidden">
              <div className="shrink-0 flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar user={selectedOwner} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-momo-text">
                      {getOwnerDisplayName(selectedPost)}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-momo-muted">
                      <span>{selectedPost.timeAgo}</span>
                      <span>•</span>
                      {(() => {
                        const PrivacyIcon = privacyMeta[selectedPost.privacy].Icon;
                        return (
                          <span className="inline-flex items-center gap-1">
                            <PrivacyIcon className="h-3.5 w-3.5" />
                            {privacyMeta[selectedPost.privacy].label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Đóng"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
                  onClick={closePost}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="shrink-0 px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-base font-extrabold text-momo-text sm:text-lg">{selectedPost.caption}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-momo-soft px-3 py-1 text-xs font-extrabold text-momo-primary">
                    {selectedPost.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-momo-text">
                    {selectedPost.amount}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 border-y border-slate-100 py-3">
                  <Button
                    className={cn(
                      likedPosts.has(selectedPost.id) &&
                        "border-momo-primary/30 bg-momo-soft text-momo-primary",
                    )}
                    leftIcon={
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          likedPosts.has(selectedPost.id) && "fill-current",
                        )}
                      />
                    }
                    onClick={() => togglePostLike(selectedPost.id)}
                    size="sm"
                    variant="secondary"
                  >
                    {likedPosts.has(selectedPost.id) ? "Đã thích" : "Thích"}
                  </Button>
                  <span className="text-sm font-bold text-momo-text">
                    {selectedPost.likeCount + (likedPosts.has(selectedPost.id) ? 1 : 0)} lượt thích
                  </span>
                  <div className="inline-flex h-9 items-center gap-2 rounded-[14px] bg-slate-50 px-3 text-sm font-semibold text-momo-muted">
                    <MessageCircle className="h-4 w-4" />
                    {selectedCommentCount} bình luận
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
                <div className="space-y-4">
                  {selectedComments.map((comment) => {
                    const author = usersById[comment.authorId];
                    const liked = likedComments.has(comment.id);

                    return (
                      <div className="space-y-3" key={comment.id}>
                        <div className="flex gap-3">
                          <Avatar size="sm" user={author} />
                          <div className="min-w-0 flex-1">
                            <div className="rounded-[18px] bg-slate-50 px-4 py-3">
                              <p className="text-sm font-extrabold text-momo-text">
                                {comment.authorId === "you" ? "You" : author.name}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-momo-muted">{comment.text}</p>
                            </div>
                            <div className="mt-2 flex items-center gap-3 px-1 text-xs font-bold text-momo-muted">
                              <span>{comment.timeAgo}</span>
                              <button
                                className={cn(
                                  "inline-flex items-center gap-1 transition hover:text-momo-primary",
                                  liked && "text-momo-primary",
                                )}
                                onClick={() => toggleCommentLike(comment.id)}
                                type="button"
                              >
                                <Heart className={cn("h-3.5 w-3.5", liked && "fill-current")} />
                                {comment.likes + (liked ? 1 : 0)}
                              </button>
                              <button
                                className="inline-flex items-center gap-1 transition hover:text-momo-primary"
                                onClick={() => startReply(comment)}
                                type="button"
                              >
                                <Reply className="h-3.5 w-3.5" />
                                Trả lời
                              </button>
                            </div>

                            {comment.replies?.length ? (
                              <div className="mt-3 space-y-3 border-l border-momo-border pl-3">
                                {comment.replies.map((reply) => {
                                  const replyAuthor = usersById[reply.authorId];
                                  const replyLiked = likedComments.has(reply.id);

                                  return (
                                    <div className="flex gap-2" key={reply.id}>
                                      <Avatar size="sm" user={replyAuthor} />
                                      <div className="min-w-0 flex-1">
                                        <div className="rounded-[16px] bg-momo-soft/60 px-3 py-2">
                                          <p className="text-xs font-extrabold text-momo-text">
                                            {reply.authorId === "you" ? "You" : replyAuthor.name}
                                          </p>
                                          <p className="mt-1 text-sm leading-6 text-momo-muted">
                                            {reply.text}
                                          </p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-3 px-1 text-xs font-bold text-momo-muted">
                                          <span>{reply.timeAgo}</span>
                                          <button
                                            className={cn(
                                              "inline-flex items-center gap-1 transition hover:text-momo-primary",
                                              replyLiked && "text-momo-primary",
                                            )}
                                            onClick={() => toggleCommentLike(reply.id)}
                                            type="button"
                                          >
                                            <Heart
                                              className={cn("h-3.5 w-3.5", replyLiked && "fill-current")}
                                            />
                                            {reply.likes + (replyLiked ? 1 : 0)}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form
                className="shrink-0 flex gap-2 border-t border-slate-100 bg-white px-4 py-3 sm:px-5 sm:py-4"
                onSubmit={submitComment}
              >
                <input
                  className="h-11 min-w-0 flex-1 rounded-[16px] border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-momo-text outline-none transition placeholder:text-momo-muted/70 focus:border-momo-primary/40 focus:bg-white"
                  onChange={(event) => setCommentDraft(event.target.value)}
                  placeholder={
                    replyTarget ? `Trả lời ${replyTarget.authorName}...` : "Viết bình luận..."
                  }
                  value={commentDraft}
                />
                <Button
                  aria-label="Gửi bình luận"
                  className="px-3 sm:px-5"
                  disabled={!commentDraft.trim()}
                  rightIcon={<SendHorizontal className="h-4 w-4" />}
                  type="submit"
                >
                  Gửi
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
