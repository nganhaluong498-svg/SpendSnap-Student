export type FriendStatus = "Online" | "Vừa hoạt động" | "Offline";

export type FriendId =
  | "ngan-ha"
  | "hoang-nam"
  | "quynh-anh"
  | "the-anh"
  | "bao-tam"
  | "dinh-tam"
  | "dat-huy"
  | "nhat-ha";

export type UserId = "you" | FriendId;

export interface AppUser {
  avatarColor: string;
  fullName?: string;
  id: UserId;
  initials: string;
  name: string;
  status?: FriendStatus;
}

export const teamMemberIds: FriendId[] = [
  "ngan-ha",
  "nhat-ha",
  "quynh-anh",
  "bao-tam",
  "dinh-tam",
];

export const friendOrderIds: FriendId[] = [
  ...teamMemberIds,
  "hoang-nam",
  "the-anh",
  "dat-huy",
];

export const currentUser: AppUser = {
  avatarColor: "from-momo-primary to-momo-violet",
  fullName: "Nguyễn Minh Anh",
  id: "you",
  initials: "A",
  name: "You",
};

export const friends: AppUser[] = [
  {
    avatarColor: "from-pink-400 to-momo-primary",
    id: "ngan-ha",
    initials: "NH",
    name: "Ngân Hà",
    status: "Online",
  },
  {
    avatarColor: "from-indigo-400 to-violet-500",
    id: "nhat-ha",
    initials: "JH",
    name: "Nhật Hà",
    status: "Offline",
  },
  {
    avatarColor: "from-orange-300 to-pink-400",
    id: "quynh-anh",
    initials: "QA",
    name: "Quỳnh Anh",
    status: "Vừa hoạt động",
  },
  {
    avatarColor: "from-rose-400 to-fuchsia-500",
    id: "bao-tam",
    initials: "BT",
    name: "Bảo Tâm",
    status: "Online",
  },
  {
    avatarColor: "from-amber-400 to-momo-primary",
    id: "dinh-tam",
    initials: "ĐT",
    name: "Đình Tâm",
    status: "Vừa hoạt động",
  },
  {
    avatarColor: "from-violet-400 to-momo-violet",
    id: "hoang-nam",
    initials: "HN",
    name: "Hoàng Nam",
    status: "Online",
  },
  {
    avatarColor: "from-sky-400 to-violet-400",
    id: "the-anh",
    initials: "TA",
    name: "Thế Anh",
    status: "Offline",
  },
  {
    avatarColor: "from-emerald-400 to-sky-500",
    id: "dat-huy",
    initials: "ĐH",
    name: "Đạt Huy",
    status: "Online",
  },
];

export function isTeamMember(id: UserId): id is FriendId {
  return teamMemberIds.includes(id as FriendId);
}

export function sortFriendsByTeamPriority<T extends Pick<AppUser, "id" | "name">>(items: T[]) {
  return [...items].sort((a, b) => {
    const aIndex = friendOrderIds.indexOf(a.id as FriendId);
    const bIndex = friendOrderIds.indexOf(b.id as FriendId);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.name.localeCompare(b.name, "vi");
  });
}

export const users = [currentUser, ...friends];

export const usersById = users.reduce<Record<UserId, AppUser>>(
  (record, user) => ({ ...record, [user.id]: user }),
  {} as Record<UserId, AppUser>,
);
