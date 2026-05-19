import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);
const model = process.env.OPENAI_MODEL ?? "gpt-5.5";

const fallbackReply =
  "Mình chưa gọi được AI thật lúc này, nhưng dựa trên ngân sách hiện tại, bạn nên chú ý Mua sắm và Ăn uống trước.";

const instructions = `
Bạn là AI SpendSnap, một trợ lý ngân sách thân thiện bằng tiếng Việt cho sinh viên.

Nguyên tắc trả lời:
- Luôn trả lời bằng tiếng Việt.
- Giọng văn thân thiện, ngắn gọn, thực tế, phù hợp với sinh viên.
- Dựa vào budget context được cung cấp trong input.
- Không đưa lời khuyên đầu tư, tài chính phức tạp, vay nợ hoặc sản phẩm tài chính.
- Không nói rằng bạn có thể truy cập dữ liệu MoMo thật; đây chỉ là dữ liệu demo người dùng cung cấp.
- Ưu tiên gợi ý thực tế như giảm cafe/trà sữa, dùng Student Pass khi đã có kế hoạch chi, đặt giới hạn cuối tuần, hoặc chuyển budget chỉ khi thật sự cần.
- Nếu phù hợp, nhắc rõ Mua sắm 81% và Ăn uống 70%.
- Trả lời khoảng 2-5 đoạn ngắn hoặc bullet points.
`;

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/ai-advisor", async (request, response) => {
  const { context, message } = request.body ?? {};

  if (typeof message !== "string" || !message.trim()) {
    response.status(400).json({ reply: "Bạn nhập câu hỏi ngân sách trước nha." });
    return;
  }

  if (!client) {
    response.json({ fallback: true, reply: fallbackReply });
    return;
  }

  try {
    const aiResponse = await client.responses.create({
      model,
      instructions,
      input: JSON.stringify({
        context,
        message: message.trim(),
      }),
    });

    response.json({
      reply: aiResponse.output_text?.trim() || fallbackReply,
    });
  } catch (error) {
    console.error("AI advisor request failed:", error instanceof Error ? error.message : error);
    response.json({ fallback: true, reply: fallbackReply });
  }
});

app.listen(port, () => {
  console.log(`AI advisor server listening on http://localhost:${port}`);
});
