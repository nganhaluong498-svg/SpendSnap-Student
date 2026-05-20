import {
  Bell,
  Camera,
  CheckCircle,
  MessageCircle,
  Receipt,
  Search,
  Send,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import {
  friends as appFriends,
  isTeamMember,
  sortFriendsByTeamPriority,
  type AppUser,
  type FriendId,
  type FriendStatus,
} from "../data/users";
import { cn } from "../lib/utils";

type Friend = AppUser & {
  id: FriendId;
  selected: boolean;
  status: FriendStatus;
};

type ReminderTone = "Nhẹ nhàng" | "Vui vẻ" | "Ngắn gọn";
type SplitMethod = "equal" | "items";
type PaymentStatus = "Chờ thanh toán" | "Đã trả";
type EqualSplitConfig = {
  totalAmount: number;
  totalPeople: number;
  payer: string;
};

const billName = "Lẩu Thái Dookki";
const initialEqualSplit: EqualSplitConfig = {
  payer: "Nguyễn Minh Anh",
  totalAmount: 600000,
  totalPeople: 6,
};
const billPeopleCount = initialEqualSplit.totalPeople;
const billFriendCount = 5;
const billFriendIds: FriendId[] = [
  "ngan-ha",
  "nhat-ha",
  "quynh-anh",
  "bao-tam",
  "dinh-tam",
];
const defaultSelectedFriendIds = new Set<FriendId>(billFriendIds);
const unpaidFriendIds = new Set<FriendId>(["ngan-ha", "nhat-ha", "dinh-tam"]);
const paidFriendIds = new Set<FriendId>(["quynh-anh", "bao-tam"]);
const billStatusOverrides: Partial<Record<FriendId, FriendStatus>> = {
  "nhat-ha": "Online",
};

const initialFriends: Friend[] = sortFriendsByTeamPriority(appFriends).map((friend) => ({
  ...friend,
  id: friend.id as FriendId,
  selected: defaultSelectedFriendIds.has(friend.id as FriendId),
  status: billStatusOverrides[friend.id as FriendId] ?? friend.status ?? "Offline",
}));

function getBillFriends(friends: Friend[]) {
  const friendsById = new Map(friends.map((friend) => [friend.id, friend]));
  return billFriendIds
    .map((id) => friendsById.get(id))
    .filter((friend): friend is Friend => Boolean(friend));
}

function getPaymentStatus(friendId: FriendId): PaymentStatus {
  return paidFriendIds.has(friendId) ? "Đã trả" : "Chờ thanh toán";
}

const vndFormatter = new Intl.NumberFormat("vi-VN");

function formatVnd(amount: number) {
  return `${vndFormatter.format(Math.max(0, Math.round(amount)))}đ`;
}

function parseVndInput(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function getEqualSplitSummary(totalAmount: number, totalPeople: number) {
  const safePeople = Math.max(totalPeople, 1);
  const hasRemainder = totalAmount % safePeople !== 0;
  const perPersonAmount = Math.round(totalAmount / safePeople);
  const amountToCollectValue = Math.max(totalAmount - perPersonAmount, 0);

  return {
    amountToCollectValue,
    hasRemainder,
    perPersonAmount,
  };
}

const itemSplitRows = [
  { amount: "300.000đ", item: "Lẩu Thái Dookki", owners: "Món chung" },
  { amount: "60.000đ", item: "Nước ngọt", owners: "Ngân Hà, Nhật Hà" },
  { amount: "60.000đ", item: "Khoai chiên", owners: "Quỳnh Anh, Bảo Tâm" },
  { amount: "120.000đ", item: "Buffet thêm", owners: "Đình Tâm" },
  { amount: "30.000đ", item: "Khăn lạnh", owners: "Chia đều" },
  { amount: "30.000đ", item: "Phí dịch vụ", owners: "Chia đều" },
];

function getRecalculatedSplit(splitAmountText: string) {
  return [
    ["Nguyễn Minh Anh", splitAmountText],
    ["Ngân Hà", splitAmountText],
    ["Nhật Hà", splitAmountText],
    ["Quỳnh Anh", splitAmountText],
    ["Bảo Tâm", splitAmountText],
    ["Đình Tâm", splitAmountText],
  ];
}

function getReminderMessages(splitAmountText: string): Record<ReminderTone, string> {
  return {
    "Nhẹ nhàng": `Nhật Hà ơi, phần bill Lẩu Thái Dookki của bạn là ${splitAmountText} nha. Chuyển mình qua MoMo khi tiện nhé 🙌`,
    "Vui vẻ": `Đồng bọn ơi, bill Dookki tới rồi 😆 Mỗi người ${splitAmountText} nha.`,
    "Ngắn gọn": `Bill Lẩu Thái Dookki: ${splitAmountText}/người.`,
  };
}

function ReceiptPreview({
  billTotalText,
  splitAmountText,
  totalPeople,
}: {
  billTotalText: string;
  splitAmountText: string;
  totalPeople: number;
}) {
  return (
    <div className="relative min-h-[170px] rounded-[22px] border border-momo-border bg-white p-4 shadow-[0_14px_28px_rgba(17,24,39,0.06)]">
      <div className="absolute left-0 right-0 top-0 h-3 rounded-t-[22px] bg-[linear-gradient(135deg,transparent_8px,#fff_0),linear-gradient(225deg,transparent_8px,#fff_0)] bg-[length:16px_16px] bg-repeat-x" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-momo-muted">Receipt</p>
          <h3 className="mt-1 font-extrabold text-momo-text">{billName}</h3>
          <p className="mt-1 text-xs font-semibold text-momo-muted">10/05/2026</p>
        </div>
        <Receipt className="h-5 w-5 text-momo-primary" />
      </div>
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
          <span className="text-momo-muted">Tổng bill</span>
          <span className="font-extrabold text-momo-text">{billTotalText}</span>
        </div>
        <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
          <span className="text-momo-muted">Số người</span>
          <span className="font-extrabold text-momo-text">{totalPeople} người</span>
        </div>
        <div className="flex justify-between">
          <span className="text-momo-muted">Gợi ý</span>
          <span className="font-extrabold text-momo-primary">{splitAmountText}/người</span>
        </div>
      </div>
    </div>
  );
}

function NewBillCard({
  amountToCollectText,
  billTotalText,
  onOpenFriends,
  onOpenEqualSplit,
  onOpenSplitItems,
  onOpenUpload,
  splitAmountText,
  totalPeople,
}: {
  amountToCollectText: string;
  billTotalText: string;
  onOpenEqualSplit: () => void;
  onOpenFriends: () => void;
  onOpenSplitItems: () => void;
  onOpenUpload: () => void;
  splitAmountText: string;
  totalPeople: number;
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Bill mới AI vừa đọc</h2>
          <p className="mt-1 text-sm text-momo-muted">Bạn trả trước, AI gợi ý cách chia nhanh.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          <CheckCircle className="h-3.5 w-3.5" />
          Độ tin cậy cao
        </span>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <ReceiptPreview
          billTotalText={billTotalText}
          splitAmountText={splitAmountText}
          totalPeople={totalPeople}
        />

        <div className="min-w-0">
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ["Tổng tiền", billTotalText],
              ["AI nhận diện", `Bàn ${totalPeople} người`],
              ["Gợi ý chia", `${splitAmountText}/người`],
              ["Bạn đã ứng", billTotalText],
              ["Phần của bạn", splitAmountText],
              ["Cần thu lại", amountToCollectText],
            ].map(([label, value]) => (
              <div className="rounded-[16px] border border-slate-100 bg-slate-50 px-3 py-2.5" key={label}>
                <p className="text-xs font-bold text-momo-muted">{label}</p>
                <p className="mt-1 text-sm font-extrabold text-momo-text">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={onOpenEqualSplit} size="sm" variant="secondary">
                Chỉnh chia đều
              </Button>
              <Button onClick={onOpenSplitItems} size="sm" variant="secondary">
                Chia theo món
              </Button>
              <Button onClick={onOpenUpload} size="sm" variant="secondary">
                Chỉnh bill
              </Button>
            </div>
            <Button leftIcon={<Users className="h-4 w-4" />} onClick={onOpenFriends} size="sm">
              Chọn bạn để chia bill
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FriendSelectionDrawer({
  onClose,
  onSend,
  open,
  friends,
  setFriends,
  splitAmountText,
}: {
  onClose: () => void;
  onSend: () => void;
  open: boolean;
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  splitAmountText: string;
}) {
  const [limitMessage, setLimitMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCount = friends.filter((friend) => friend.selected).length;
  const isValidSelection = selectedCount === billFriendCount;
  const visibleFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  function toggleFriend(id: FriendId) {
    const target = friends.find((friend) => friend.id === id);
    if (!target) return;

    if (!target.selected && selectedCount >= billFriendCount) {
      setLimitMessage(
        `Bill này có ${billPeopleCount} người, gồm bạn và ${billFriendCount} bạn bè. Chỉ chọn tối đa ${billFriendCount} bạn.`,
      );
      return;
    }

    setLimitMessage("");
    setFriends(
      friends.map((friend) =>
        friend.id === id ? { ...friend, selected: !friend.selected } : friend,
      ),
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Chọn bạn để chia bill</h2>
            <p className="mt-1 text-sm leading-6 text-momo-muted">
              Bill {billPeopleCount} người gồm bạn + {billFriendCount} bạn bè. Chọn đúng {billFriendCount} bạn để gửi yêu cầu thanh toán.
            </p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <label className="flex h-10 items-center gap-2 rounded-[16px] border border-slate-200 bg-slate-50 px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-momo-muted/70"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Tìm bạn trong MoMo..."
              value={searchQuery}
            />
          </label>

          <div className="mt-4 max-h-[430px] divide-y divide-slate-100 overflow-y-auto rounded-[20px] border border-slate-100">
            {visibleFriends.map((friend) => (
              <label
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left",
                  !friend.selected && selectedCount >= billFriendCount && "cursor-not-allowed opacity-60",
                )}
                key={friend.id}
              >
                <input
                  checked={friend.selected}
                  className="h-4 w-4 shrink-0 accent-momo-primary"
                  disabled={!friend.selected && selectedCount >= billFriendCount}
                  onChange={() => toggleFriend(friend.id)}
                  type="checkbox"
                />
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white shadow-sm",
                    friend.avatarColor,
                  )}
                >
                  {friend.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-extrabold text-momo-text">{friend.name}</p>
                    {isTeamMember(friend.id) && (
                      <span className="rounded-full bg-momo-soft px-2 py-0.5 text-[11px] font-bold text-momo-primary">
                        Thành viên nhóm
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-0.5 text-xs font-semibold",
                      friend.status === "Offline" ? "text-momo-muted" : "text-emerald-600",
                    )}
                  >
                    {friend.status}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {limitMessage && <p className="mt-3 text-xs font-bold text-orange-700">{limitMessage}</p>}
        </div>

        <div className="border-t border-slate-100 px-6 py-4">
          <div className="rounded-[18px] border border-momo-border bg-momo-soft/55 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-bold text-momo-text">Đã chọn {selectedCount} bạn</span>
              <span className="font-bold text-momo-primary">Mỗi người cần trả {splitAmountText}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-momo-muted">
              Bill {billPeopleCount} người gồm bạn + {billFriendCount} bạn bè. Chọn đúng {billFriendCount} bạn để gửi yêu cầu.
            </p>
          </div>
          <Button
            className={cn(
              "mt-3 w-full",
              !isValidSelection && "border border-momo-border bg-white text-momo-muted shadow-none hover:bg-white",
            )}
            disabled={!isValidSelection}
            leftIcon={<Send className="h-4 w-4" />}
            onClick={onSend}
            size="sm"
          >
            Gửi yêu cầu thanh toán
          </Button>
        </div>
      </aside>
    </div>
  );
}

function EqualSplitDrawer({
  friends,
  onApply,
  onClose,
  open,
  split,
}: {
  friends: Friend[];
  onApply: (split: EqualSplitConfig) => void;
  onClose: () => void;
  open: boolean;
  split: EqualSplitConfig;
}) {
  const participantFriends = getBillFriends(friends);
  const participantCount = participantFriends.length + 1;
  const [totalInput, setTotalInput] = useState(formatVnd(split.totalAmount));
  const [peopleInput, setPeopleInput] = useState(String(split.totalPeople));
  const [payer, setPayer] = useState(split.payer);

  useEffect(() => {
    if (!open) return;

    setTotalInput(formatVnd(split.totalAmount));
    setPeopleInput(String(split.totalPeople));
    setPayer(split.payer);
  }, [open, split.payer, split.totalAmount, split.totalPeople]);

  if (!open) return null;

  const totalAmount = parseVndInput(totalInput);
  const totalPeople = Math.max(1, Number(peopleInput) || 1);
  const { amountToCollectValue, hasRemainder, perPersonAmount } = getEqualSplitSummary(
    totalAmount,
    totalPeople,
  );
  const perPersonText = formatVnd(perPersonAmount);
  const participantRows = [
    { label: "Bạn", name: "Nguyễn Minh Anh", status: "Người trả trước" },
    ...participantFriends.map((friend) => ({
      label: "",
      name: friend.name,
      status: getPaymentStatus(friend.id),
    })),
  ];
  const payerOptions = ["Nguyễn Minh Anh", ...participantFriends.map((friend) => friend.name)];
  const hasValidParticipantCount = totalPeople === participantCount;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[540px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Chỉnh chia đều</h2>
            <p className="mt-1 text-sm leading-6 text-momo-muted">
              Kiểm tra tổng tiền, số người và số tiền mỗi người trước khi gửi yêu cầu.
            </p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="rounded-[22px] border border-momo-border bg-momo-soft/35 p-4">
            <p className="text-sm font-extrabold text-momo-text">Thông tin bill</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold text-momo-muted">
                Tên bill
                <input
                  className="mt-1 h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  readOnly
                  value={billName}
                />
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Tổng tiền
                <input
                  className="mt-1 h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  inputMode="numeric"
                  onBlur={() => setTotalInput(formatVnd(totalAmount))}
                  onChange={(event) => setTotalInput(event.target.value)}
                  value={totalInput}
                />
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Số người
                <input
                  className="mt-1 h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  inputMode="numeric"
                  min={1}
                  onChange={(event) => setPeopleInput(event.target.value)}
                  type="number"
                  value={peopleInput}
                />
              </label>
              <label className="text-xs font-bold text-momo-muted">
                Người trả trước
                <select
                  className="mt-1 h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                  onChange={(event) => setPayer(event.target.value)}
                  value={payer}
                >
                  {payerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-4 rounded-[22px] border border-violet-100 bg-violet-50/65 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-momo-violet" />
              <p className="text-sm font-extrabold text-momo-text">Cách tính chia đều</p>
            </div>
            <p className="mt-3 text-lg font-extrabold text-momo-text">
              {formatVnd(totalAmount)} / {totalPeople} người ={" "}
              <span className="text-momo-primary">{perPersonText}/người</span>
            </p>
            {hasRemainder && (
              <p className="mt-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                Số tiền lẻ sẽ được làm tròn ở người trả trước
              </p>
            )}
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                ["Bạn đã ứng", formatVnd(totalAmount)],
                ["Phần của bạn", perPersonText],
                ["Cần thu lại", formatVnd(amountToCollectValue)],
              ].map(([label, value]) => (
                <div className="rounded-[16px] bg-white px-3 py-2.5" key={label}>
                  <p className="text-xs font-bold text-momo-muted">{label}</p>
                  <p className="mt-1 text-sm font-extrabold text-momo-text">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[22px] border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-extrabold text-momo-text">Danh sách chia tiền</p>
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-momo-muted">
                {participantCount} người
              </span>
            </div>
            <div className="spendsnap-scrollbar mt-3 max-h-[260px] divide-y divide-slate-100 overflow-y-auto pr-2">
              {participantRows.map((row) => (
                <div className="flex h-[58px] items-center gap-3 py-2" key={row.name}>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-50 text-xs font-extrabold text-momo-text">
                    {row.name
                      .split(" ")
                      .slice(-2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-momo-text">{row.name}</p>
                      {row.label && (
                        <span className="rounded-full bg-momo-soft px-2 py-0.5 text-[11px] font-bold text-momo-primary">
                          {row.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-momo-muted">{perPersonText}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                      row.status === "Đã trả" && "bg-emerald-50 text-emerald-700",
                      row.status === "Chờ thanh toán" && "bg-orange-50 text-orange-700",
                      row.status === "Người trả trước" && "bg-violet-50 text-momo-violet",
                    )}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p
            className={cn(
              "mt-4 rounded-[16px] px-3 py-2 text-sm font-bold",
              hasValidParticipantCount
                ? "bg-emerald-50 text-emerald-700"
                : "bg-orange-50 text-orange-700",
            )}
          >
            {hasValidParticipantCount
              ? "Tổng số người đã khớp với bill"
              : "Số người chưa khớp với danh sách chia tiền"}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button
            disabled={totalAmount <= 0 || totalPeople <= 0}
            onClick={() => onApply({ payer, totalAmount, totalPeople })}
          >
            Áp dụng chia đều
          </Button>
        </div>
      </aside>
    </div>
  );
}

function SplitParticipantsCard({
  friends,
  onOpenSplitItems,
  splitAmountText,
  splitMethod,
  setSplitMethod,
}: {
  friends: Friend[];
  onOpenSplitItems: () => void;
  splitAmountText: string;
  setSplitMethod: (method: SplitMethod) => void;
  splitMethod: SplitMethod;
}) {
  const participantFriends = getBillFriends(friends);
  const rows = [
    ["Nguyễn Minh Anh", "Bạn", splitAmountText, "Người trả trước"],
    ...participantFriends.map((friend) => [
      friend.name,
      "",
      splitAmountText,
      getPaymentStatus(friend.id),
    ]),
  ];

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Bảng chia tiền</h2>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded-[14px] bg-slate-50 p-1">
          <button
            className={cn(
              "h-8 rounded-[11px] px-3 text-xs font-bold transition",
              splitMethod === "equal" ? "bg-white text-momo-primary shadow-sm" : "text-momo-muted",
            )}
            onClick={() => setSplitMethod("equal")}
            type="button"
          >
            Chia đều
          </button>
          <button
            className={cn(
              "h-8 rounded-[11px] px-3 text-xs font-bold transition",
              splitMethod === "items" ? "bg-white text-momo-primary shadow-sm" : "text-momo-muted",
            )}
            onClick={onOpenSplitItems}
            type="button"
          >
            Chia theo món
          </button>
        </div>
      </div>

      <div className="spendsnap-scrollbar mt-4 max-h-[240px] divide-y divide-slate-100 overflow-y-auto pr-2">
        {rows.map(([name, label, amount, status]) => (
          <div className="flex h-[60px] items-center gap-3 py-2" key={name}>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-50 text-xs font-extrabold text-momo-text">
              {name
                .split(" ")
                .slice(-2)
                .map((word) => word[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-extrabold text-momo-text">{name}</p>
                {label && (
                  <span className="rounded-full bg-momo-soft px-2 py-0.5 text-[11px] font-bold text-momo-primary">
                    {label}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs font-semibold text-momo-muted">{amount}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  status === "Đã trả" && "bg-emerald-50 text-emerald-700",
                  status === "Chờ thanh toán" && "bg-orange-50 text-orange-700",
                  status === "Người trả trước" && "bg-violet-50 text-momo-violet",
                )}
              >
                {status}
              </span>
              {status === "Chờ thanh toán" && (
                <Button className="h-8 px-2 text-xs" size="sm" variant="ghost">
                  Nhắc
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReminderRecipientsDialog({
  recipients,
  onClose,
  onConfirm,
  selectedRecipientIds,
  setSelectedRecipientIds,
}: {
  recipients: Array<Friend & { paymentStatus: PaymentStatus }>;
  onClose: () => void;
  onConfirm: () => void;
  selectedRecipientIds: FriendId[];
  setSelectedRecipientIds: (recipients: FriendId[]) => void;
}) {
  function toggleRecipient(id: FriendId) {
    setSelectedRecipientIds(
      selectedRecipientIds.includes(id)
        ? selectedRecipientIds.filter((recipientId) => recipientId !== id)
        : [...selectedRecipientIds, id],
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <section className="relative w-full max-w-[420px] rounded-[24px] border border-momo-border bg-white p-5 shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-momo-text">Chọn bạn để gửi nhắc</h3>
            <p className="mt-1 text-sm text-momo-muted">Chọn một hoặc nhiều bạn nhận tin nhắn.</p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[13px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-slate-100 rounded-[18px] border border-slate-100">
          {recipients.map((recipient) => (
            <label className="flex cursor-pointer items-center gap-3 px-4 py-3" key={recipient.id}>
              <input
                checked={selectedRecipientIds.includes(recipient.id)}
                className="h-4 w-4 accent-momo-primary"
                onChange={() => toggleRecipient(recipient.id)}
                type="checkbox"
              />
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-extrabold text-white shadow-sm",
                  recipient.avatarColor,
                )}
              >
                {recipient.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-momo-text">{recipient.name}</p>
                <p
                  className={cn(
                    "mt-0.5 text-xs font-bold",
                    recipient.paymentStatus === "Đã trả" ? "text-emerald-700" : "text-orange-700",
                  )}
                >
                  {recipient.paymentStatus}
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button onClick={onClose} size="sm" variant="secondary">
            Hủy
          </Button>
          <Button disabled={selectedRecipientIds.length === 0} onClick={onConfirm} size="sm">
            Xác nhận gửi nhắc
          </Button>
        </div>
      </section>
    </div>
  );
}

function ReminderMessageCard({
  friends,
  splitAmountText,
}: {
  friends: Friend[];
  splitAmountText: string;
}) {
  const [isRecipientDialogOpen, setIsRecipientDialogOpen] = useState(false);
  const recipientFriends = getBillFriends(friends);
  const reminderMessages = getReminderMessages(splitAmountText);
  const reminderRecipients = recipientFriends.map((friend) => ({
    ...friend,
    paymentStatus: getPaymentStatus(friend.id),
  }));
  const defaultReminderRecipientIds = recipientFriends
    .filter((friend) => unpaidFriendIds.has(friend.id))
    .map((friend) => friend.id);
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<FriendId[]>(() =>
    defaultReminderRecipientIds.length ? defaultReminderRecipientIds : recipientFriends.slice(0, 1).map((friend) => friend.id),
  );
  const [tone, setTone] = useState<ReminderTone>("Nhẹ nhàng");
  const [sentAt, setSentAt] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");

  useEffect(() => {
    setSelectedRecipientIds((current) => {
      const recipientIds = new Set(recipientFriends.map((friend) => friend.id));
      const valid = current.filter((recipientId) => recipientIds.has(recipientId));
      return valid.length
        ? valid
        : defaultReminderRecipientIds.length
          ? defaultReminderRecipientIds
          : recipientFriends.slice(0, 1).map((friend) => friend.id);
    });
  }, [defaultReminderRecipientIds.join("|"), recipientFriends.map((friend) => friend.id).join("|")]);

  function confirmReminder() {
    const selectedNames = reminderRecipients
      .filter((recipient) => selectedRecipientIds.includes(recipient.id))
      .map((recipient) => recipient.name);
    const label =
      selectedNames.length === 1
        ? selectedNames[0]
        : `${selectedNames.length} bạn`;
    setSentAt(`Đã gửi nhắc cho ${label}`);
    setIsRecipientDialogOpen(false);
  }

  function copyReminderMessage() {
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(reminderMessages[tone]).catch(() => undefined);
    }
    setCopiedMessage("Đã sao chép tin nhắn");
  }

  return (
    <>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-momo-text">Tin nhắn nhắc thanh toán</h2>
          </div>
          <MessageCircle className="h-5 w-5 text-momo-violet" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["Nhẹ nhàng", "Vui vẻ", "Ngắn gọn"] as ReminderTone[]).map((item) => (
            <button
              className={cn(
                "h-8 rounded-full px-3 text-xs font-bold transition",
                tone === item
                  ? "bg-momo-primary text-white shadow-pink"
                  : "border border-momo-border bg-white text-momo-muted hover:bg-momo-soft",
              )}
              key={item}
              onClick={() => setTone(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-[20px] border border-momo-border bg-momo-soft/55 p-4">
          <div className="max-w-[360px] rounded-[18px] rounded-tl-md bg-white px-4 py-3 text-sm font-semibold leading-6 text-momo-text shadow-sm">
            {reminderMessages[tone]}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            leftIcon={<Bell className="h-4 w-4" />}
            onClick={() => setIsRecipientDialogOpen(true)}
            size="sm"
          >
            Gửi nhắc
          </Button>
          <Button onClick={copyReminderMessage} size="sm" variant="secondary">
            Sao chép tin nhắn
          </Button>
          {sentAt && <span className="text-xs font-bold text-emerald-700">{sentAt}</span>}
          {copiedMessage && <span className="text-xs font-bold text-emerald-700">{copiedMessage}</span>}
        </div>
      </Card>

      {isRecipientDialogOpen && (
        <ReminderRecipientsDialog
          onClose={() => setIsRecipientDialogOpen(false)}
          onConfirm={confirmReminder}
          recipients={reminderRecipients}
          selectedRecipientIds={selectedRecipientIds}
          setSelectedRecipientIds={setSelectedRecipientIds}
        />
      )}
    </>
  );
}

function TrackedBillsCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-momo-text">Hóa đơn đang theo dõi</h2>
          <p className="mt-1 text-sm text-momo-muted">Theo dõi ai đã trả, ai còn thiếu.</p>
        </div>
        <Users className="h-5 w-5 text-momo-primary" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[20px] border border-orange-100 bg-orange-50/35 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-momo-text">Gà rán cuối tuần</h3>
              <p className="mt-1 text-xs font-semibold text-momo-muted">09/05/2026</p>
            </div>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
              Còn 1 bạn chưa trả
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <p className="text-sm font-bold text-momo-text">280.000đ</p>
            <p className="text-sm font-semibold text-momo-muted">4 người · 70.000đ/người</p>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-bold text-momo-muted">
              <span>Đã thu: 140.000đ / 210.000đ</span>
              <span>Còn thiếu: 70.000đ</span>
            </div>
            <ProgressBar className="h-2" tone="warning" value={67} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Ngân Hà — Đã trả", "Quỳnh Anh — Chưa trả", "Hoàng Nam — Đã trả"].map((item) => (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  item.includes("Chưa") ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700",
                )}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              Nhắc Quỳnh Anh
            </Button>
            <Button size="sm" variant="ghost">
              Xem chi tiết
            </Button>
          </div>
        </div>

        <div className="rounded-[20px] border border-emerald-100 bg-emerald-50/35 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-momo-text">Bún đậu cuối tuần</h3>
              <p className="mt-1 text-xs font-semibold text-momo-muted">08/05/2026</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <CheckCircle className="h-3 w-3" />
              Đã thanh toán xong
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <p className="text-sm font-bold text-momo-text">240.000đ</p>
            <p className="text-sm font-semibold text-momo-muted">3 người · 80.000đ/người</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Ngân Hà — Đã trả", "Hoàng Nam — Đã trả"].map((item) => (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700" key={item}>
                {item}
              </span>
            ))}
          </div>
          <Button className="mt-4" size="sm" variant="ghost">
            Xem chi tiết
          </Button>
        </div>

        <div className="rounded-[20px] border border-orange-100 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-momo-text">Trà sữa sau giờ học</h3>
              <p className="mt-1 text-xs font-semibold text-momo-muted">07/05/2026</p>
            </div>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
              Còn 1 bạn chưa trả
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <p className="text-sm font-bold text-momo-text">180.000đ</p>
            <p className="text-sm font-semibold text-momo-muted">4 người · 45.000đ/người</p>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-bold text-momo-muted">
              <span>Đã thu: 90.000đ / 135.000đ</span>
              <span>Còn thiếu: 45.000đ</span>
            </div>
            <ProgressBar className="h-2" tone="warning" value={67} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Ngân Hà — Đã trả", "Nhật Hà — Chưa trả", "Quỳnh Anh — Đã trả"].map((item) => (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  item.includes("Chưa") ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700",
                )}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              Nhắc Nhật Hà
            </Button>
            <Button size="sm" variant="ghost">
              Xem chi tiết
            </Button>
          </div>
        </div>

        <div className="rounded-[20px] border border-orange-100 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-momo-text">Ăn nhóm cuối tuần</h3>
              <p className="mt-1 text-xs font-semibold text-momo-muted">06/05/2026</p>
            </div>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
              Còn 1 bạn chưa trả
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <p className="text-sm font-bold text-momo-text">120.000đ</p>
            <p className="text-sm font-semibold text-momo-muted">3 người · 40.000đ/người</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Bảo Tâm — Đã trả", "Đình Tâm — Chưa trả", "Ngân Hà — Đã trả"].map((item) => (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  item.includes("Chưa") ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700",
                )}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              Nhắc Đình Tâm
            </Button>
            <Button size="sm" variant="ghost">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SplitByItemsDrawer({
  onApply,
  onClose,
  open,
  splitAmountText,
}: {
  onApply: () => void;
  onClose: () => void;
  open: boolean;
  splitAmountText: string;
}) {
  if (!open) return null;

  const recalculatedSplit = getRecalculatedSplit(splitAmountText);

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[560px] flex-col overflow-hidden border-l border-momo-border bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Chia theo món</h2>
            <p className="mt-1 text-sm text-momo-muted">Tag món cho từng người, AI sẽ tính lại phần cần trả.</p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="divide-y divide-slate-100 rounded-[20px] border border-slate-100 bg-white">
            {itemSplitRows.map((row) => (
              <div className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[1fr_100px_1.2fr]" key={row.item}>
                <span className="font-extrabold text-momo-text">{row.item}</span>
                <span className="font-bold text-momo-text">{row.amount}</span>
                <span className="font-semibold text-momo-muted">{row.owners}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[20px] border border-violet-100 bg-violet-50/60 p-4">
            <p className="text-sm font-extrabold text-momo-text">AI tính lại</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {recalculatedSplit.map(([name, amount]) => (
                <div className="rounded-[14px] bg-white px-3 py-2 text-sm" key={name}>
                  <span className="font-bold text-momo-text">{name}: </span>
                  <span className="font-extrabold text-momo-primary">{amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button onClick={onApply}>Áp dụng cách chia</Button>
        </div>
      </aside>
    </div>
  );
}

function UploadBillModal({
  billTotalText,
  onClose,
  onContinue,
  open,
  splitAmountText,
  totalPeople,
}: {
  billTotalText: string;
  onClose: () => void;
  onContinue: () => void;
  open: boolean;
  splitAmountText: string;
  totalPeople: number;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [hasBill, setHasBill] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDragging(false);
    setHasBill(true);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <button
        aria-label="Đóng lớp phủ"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <section className="relative max-h-[92vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] border border-momo-border bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-momo-text">Upload bill chia hoá đơn</h2>
            <p className="mt-1 text-sm text-momo-muted">AI sẽ đọc tổng tiền, số người và gợi ý cách chia.</p>
          </div>
          <button
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-slate-400 transition hover:bg-momo-soft hover:text-momo-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <input
          accept="image/png,image/jpeg,image/jpg,application/pdf"
          className="hidden"
          onChange={() => setHasBill(true)}
          ref={fileInputRef}
          type="file"
        />
        <button
          className={cn(
            "mt-5 flex w-full flex-col items-center justify-center rounded-[20px] border border-dashed px-4 py-5 text-center transition",
            isDragging
              ? "border-momo-primary bg-momo-soft"
              : "border-momo-primary/35 bg-momo-soft/55 hover:border-momo-primary hover:bg-momo-soft",
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDrop={handleDrop}
          type="button"
        >
          <div className="flex items-center gap-2 text-momo-primary">
            <Camera className="h-5 w-5" />
            <Upload className="h-5 w-5" />
          </div>
          <span className="mt-2 text-sm font-extrabold text-momo-text">
            Kéo & thả bill vào đây hoặc click để chọn file
          </span>
          <span className="mt-1 text-xs text-momo-muted">JPG, PNG, PDF tối đa 10MB</span>
        </button>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button leftIcon={<Camera className="h-4 w-4" />} size="sm">
            Chụp bill
          </Button>
          <Button leftIcon={<Upload className="h-4 w-4" />} size="sm" variant="secondary">
            Upload ảnh
          </Button>
          <Button onClick={() => setHasBill(true)} size="sm" variant="secondary">
            Dùng bill mẫu
          </Button>
        </div>

        {hasBill && (
          <div className="mt-5 rounded-[22px] border border-violet-100 bg-violet-50/60 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-momo-violet" />
              <h3 className="font-extrabold text-momo-text">AI đã đọc bill</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Tên bill", billName],
                ["Tổng tiền", billTotalText],
                ["Số người", String(totalPeople)],
                ["Cách chia", "Chia đều"],
              ].map(([label, value]) => (
                <label className="text-xs font-bold text-momo-muted" key={label}>
                  {label}
                  <input
                    className="mt-1 h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-bold text-momo-text outline-none focus:border-momo-primary/40"
                    defaultValue={value}
                  />
                </label>
              ))}
            </div>
            <p className="mt-4 rounded-[16px] bg-white px-3 py-2 text-sm font-semibold text-momo-text">
              Gợi ý chia đều: {splitAmountText}/người
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button onClick={onContinue}>Tiếp tục chia tiền</Button>
        </div>
      </section>
    </div>
  );
}

export function SplitBillPage() {
  const [friends, setFriends] = useState(initialFriends);
  const [equalSplit, setEqualSplit] = useState<EqualSplitConfig>(initialEqualSplit);
  const [isEqualDrawerOpen, setIsEqualDrawerOpen] = useState(false);
  const [isFriendDrawerOpen, setIsFriendDrawerOpen] = useState(false);
  const [isSplitDrawerOpen, setIsSplitDrawerOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("equal");
  const [toast, setToast] = useState("");
  const equalSummary = getEqualSplitSummary(equalSplit.totalAmount, equalSplit.totalPeople);
  const billTotalText = formatVnd(equalSplit.totalAmount);
  const splitAmountText = formatVnd(equalSummary.perPersonAmount);
  const amountToCollectText = formatVnd(equalSummary.amountToCollectValue);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <div className="mx-auto flex max-w-[1320px] flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-normal text-momo-text sm:text-3xl">
            Chia hoá đơn
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-momo-muted">
            Upload bill, AI chia tiền và nhắc bạn bè chuyển khoản nhanh hơn.
          </p>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Button className="w-full sm:w-auto" leftIcon={<Camera className="h-4 w-4" />} onClick={() => setIsUploadOpen(true)}>
            Chụp bill
          </Button>
          <Button
            className="w-full sm:w-auto"
            leftIcon={<Upload className="h-4 w-4" />}
            onClick={() => setIsUploadOpen(true)}
            variant="secondary"
          >
            Upload bill
          </Button>
        </div>
      </div>

      <NewBillCard
        amountToCollectText={amountToCollectText}
        billTotalText={billTotalText}
        onOpenEqualSplit={() => setIsEqualDrawerOpen(true)}
        onOpenFriends={() => setIsFriendDrawerOpen(true)}
        onOpenSplitItems={() => setIsSplitDrawerOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        splitAmountText={splitAmountText}
        totalPeople={equalSplit.totalPeople}
      />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SplitParticipantsCard
          friends={friends}
          onOpenSplitItems={() => setIsSplitDrawerOpen(true)}
          setSplitMethod={setSplitMethod}
          splitAmountText={splitAmountText}
          splitMethod={splitMethod}
        />
        <ReminderMessageCard friends={friends} splitAmountText={splitAmountText} />
      </div>

      <TrackedBillsCard />

      <EqualSplitDrawer
        friends={friends}
        onApply={(nextSplit) => {
          setEqualSplit(nextSplit);
          setSplitMethod("equal");
          setIsEqualDrawerOpen(false);
          showToast("Đã áp dụng chia đều");
        }}
        onClose={() => setIsEqualDrawerOpen(false)}
        open={isEqualDrawerOpen}
        split={equalSplit}
      />
      <SplitByItemsDrawer
        onApply={() => {
          setSplitMethod("items");
          setIsSplitDrawerOpen(false);
        }}
        onClose={() => setIsSplitDrawerOpen(false)}
        open={isSplitDrawerOpen}
        splitAmountText={splitAmountText}
      />
      <UploadBillModal
        billTotalText={billTotalText}
        onClose={() => setIsUploadOpen(false)}
        onContinue={() => setIsUploadOpen(false)}
        open={isUploadOpen}
        splitAmountText={splitAmountText}
        totalPeople={equalSplit.totalPeople}
      />
      <FriendSelectionDrawer
        friends={friends}
        onClose={() => setIsFriendDrawerOpen(false)}
        onSend={() => {
          setIsFriendDrawerOpen(false);
          showToast("Đã gửi yêu cầu thanh toán cho 5 bạn");
        }}
        open={isFriendDrawerOpen}
        setFriends={setFriends}
        splitAmountText={splitAmountText}
      />

      {toast && (
        <div className="fixed bottom-24 left-3 right-3 z-[60] rounded-[18px] border border-emerald-100 bg-white px-4 py-3 text-center text-sm font-bold text-emerald-700 shadow-[0_18px_36px_rgba(17,24,39,0.12)] sm:left-auto sm:right-6 sm:bottom-6 sm:text-left">
          {toast}
        </div>
      )}
    </div>
  );
}
