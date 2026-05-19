import { Bot, SendHorizontal, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { cn } from "../../lib/utils";

interface AIAdvisorModalProps {
  context?: unknown;
  fallbackReply?: string;
  initialMessages?: string[];
  onClose: () => void;
  open: boolean;
  quickPrompts?: string[];
  subtitle?: string;
  title?: string;
}

const defaultAiMessages = [
  "Mua sắm đã dùng 81% ngân sách. Ăn uống đã dùng 70%. Nếu giữ tốc độ này, bạn có thể vượt ngân sách trước cuối tháng.",
  "AI gợi ý giảm 2 lần cafe/trà sữa mỗi tuần và giới hạn ăn ngoài cuối tuần ở mức 250.000đ.",
  "Bạn cũng có thể ưu tiên dùng Student Pass khi ăn uống để giảm chi mà không cần cắt hết các buổi đi chơi.",
];

const defaultQuickPrompts = ["Lập kế hoạch 7 ngày", "Tìm ưu đãi ăn uống", "Chỉnh budget"];

const defaultFallbackResponse =
  "Mình có thể giúp bạn lập kế hoạch 7 ngày. Trước mắt, hãy giảm 50.000đ ở Mua sắm và ưu tiên dùng ưu đãi Student Pass cho các bữa ăn ngoài.";

const budgetContext = {
  month: "Tháng 5",
  totalBudget: 4000000,
  spent: 1650000,
  remaining: 2350000,
  sources: [
    { name: "Ví MoMo", used: 1300000, total: 2000000, remaining: 700000, percent: 65 },
    { name: "Tài khoản NH", used: 1000000, total: 1500000, remaining: 500000, percent: 67 },
    { name: "Tiền mặt", used: 280000, total: 500000, remaining: 220000, percent: 56 },
  ],
  categories: [
    { name: "Ăn uống", used: 1050000, total: 1500000, remaining: 450000, percent: 70 },
    { name: "Mua sắm", used: 650000, total: 800000, remaining: 150000, percent: 81 },
    { name: "Học tập", used: 200000, total: 600000, remaining: 400000, percent: 33 },
    { name: "Giải trí", used: 350000, total: 500000, remaining: 150000, percent: 70 },
  ],
  latestExpense: {
    merchant: "The Coffee House",
    note: "Cà phê sữa đá",
    amount: 45000,
    source: "Ví MoMo",
    category: "Ăn uống",
  },
};

type ChatMessage = {
  id: number;
  role: "ai" | "user";
  text: string;
};

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-momo-violet">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex h-10 items-center gap-1.5 rounded-[18px] rounded-tl-md border border-violet-100 bg-white px-4 shadow-[0_10px_24px_rgba(124,58,237,0.08)]">
        {[0, 120, 240].map((delay) => (
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-momo-violet/60"
            key={delay}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser && "justify-end")}>
      {!isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-momo-violet">
          <Sparkles className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[390px] rounded-[18px] px-4 py-3 text-sm font-semibold leading-6 shadow-[0_10px_24px_rgba(17,24,39,0.06)]",
          isUser
            ? "rounded-tr-md bg-gradient-to-br from-momo-primary to-momo-violet text-white"
            : "rounded-tl-md border border-violet-100 bg-white text-momo-text",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}

export function AIAdvisorModal({
  context = budgetContext,
  fallbackReply = defaultFallbackResponse,
  initialMessages = defaultAiMessages,
  onClose,
  open,
  quickPrompts = defaultQuickPrompts,
  subtitle = "Gợi ý điều chỉnh nhẹ cho tháng này.",
  title = "Tư vấn từ AI SpendSnap",
}: AIAdvisorModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messageIdRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }

  function nextMessageId() {
    messageIdRef.current += 1;
    return messageIdRef.current;
  }

  function scheduleTimer(callback: () => void, delay: number) {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }

  useEffect(() => {
    if (!open) {
      clearTimers();
      setIsTyping(false);
      setIsSending(false);
      return;
    }

    clearTimers();
    messageIdRef.current = 0;
    setInputValue("");
    setMessages([]);
    setIsSending(false);
    setIsTyping(false);

    let offset = 250;
    initialMessages.forEach((text) => {
      scheduleTimer(() => setIsTyping(true), offset);
      offset += 650;
      scheduleTimer(() => {
        setMessages((current) => [...current, { id: nextMessageId(), role: "ai", text }]);
        setIsTyping(false);
      }, offset);
      offset += 350;
    });

    return clearTimers;
  }, [initialMessages, open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  async function fetchAiReply(message: string) {
    const response = await fetch("/api/ai-advisor", {
      body: JSON.stringify({
        context,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = (await response.json().catch(() => null)) as { reply?: unknown } | null;

    if (!response.ok) {
      throw new Error("AI advisor request failed");
    }

    return typeof data?.reply === "string" && data.reply.trim() ? data.reply : fallbackReply;
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    clearTimers();
    setMessages((current) => [...current, { id: nextMessageId(), role: "user", text: trimmed }]);
    setInputValue("");
    setIsTyping(true);
    setIsSending(true);

    try {
      const reply = await fetchAiReply(trimmed);
      setMessages((current) => [
        ...current,
        { id: nextMessageId(), role: "ai", text: reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: nextMessageId(), role: "ai", text: fallbackReply },
      ]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(inputValue);
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
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col overflow-hidden border-l border-violet-100 bg-white shadow-[0_24px_70px_rgba(17,24,39,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[16px] bg-violet-50 text-momo-violet">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-momo-text">{title}</h2>
              <p className="mt-1 text-sm text-momo-muted">{subtitle}</p>
            </div>
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

        <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-violet-50/35 to-white px-6 py-5">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white px-6 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                className="h-8 rounded-full border border-violet-100 bg-violet-50 px-3 text-xs font-bold text-momo-violet transition hover:border-momo-violet/30 hover:bg-violet-100"
                disabled={isSending}
                key={prompt}
                onClick={() => sendMessage(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              className="h-11 min-w-0 flex-1 rounded-[16px] border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-momo-text outline-none transition placeholder:text-momo-muted/70 focus:border-momo-primary/40 focus:bg-white"
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Hỏi AI về ngân sách của bạn..."
              value={inputValue}
            />
            <Button
              aria-label="Gửi tin nhắn"
              className="h-11 px-4"
              disabled={isSending || !inputValue.trim()}
              rightIcon={<SendHorizontal className="h-4 w-4" />}
              type="submit"
              variant="violet"
            >
              Gửi
            </Button>
          </form>

          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <Button
              disabled={isSending}
              onClick={() => sendMessage("Áp dụng gợi ý")}
              size="sm"
              variant="secondary"
            >
              Áp dụng gợi ý
            </Button>
            <Button
              disabled={isSending}
              onClick={() => sendMessage("Tìm ưu đãi")}
              size="sm"
              variant="secondary"
            >
              Tìm ưu đãi
            </Button>
            <Button onClick={onClose} size="sm" variant="ghost">
              Để sau
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
