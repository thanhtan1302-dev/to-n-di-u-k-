import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ALLOWED_ORIGIN =
  'https://thienbaodepzai.github.io';

const SYSTEM_INSTRUCTION = `
Bạn là MathBot, gia sư Toán THCS thân thiện,
giải thích bằng tiếng Việt dễ hiểu.
Hãy giải từng bước, nêu lý do của từng phép biến đổi,
kiểm tra kết quả và không bịa ra dữ kiện đề bài.
Nếu đề bài thiếu thông tin, hãy hỏi lại học sinh.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.headers.origin &&
      req.headers.origin !== ALLOWED_ORIGIN) {
    return res.status(403).json({
      error: 'Origin không được phép'
    });
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      error: 'Chỉ hỗ trợ POST'
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Máy chủ chưa cấu hình GEMINI_API_KEY'
    });
  }

  const body = req.body ?? {};
  const message = body.message;
  const grade = String(body.grade ?? '');
  const topic = String(body.topic ?? 'Toán THCS');

  if (typeof message !== 'string' ||
      !message.trim() ||
      message.length > 4000) {
    return res.status(400).json({
      error: 'Câu hỏi phải có nội dung và không quá 4000 ký tự'
    });
  }

  const history = Array.isArray(body.history)
    ? body.history.slice(-6)
    : [];

  const contents = [];

  for (const item of history) {
    if (
      item &&
      (item.role === 'user' || item.role === 'model') &&
      typeof item.content === 'string' &&
      item.content.length <= 4000
    ) {
      contents.push({
        role: item.role,
        parts: [{ text: item.content }]
      });
    }
  }

  contents.push({
    role: 'user',
    parts: [{
      text:
        `Lớp: ${grade || 'chưa xác định'}\n` +
        `Chủ đề: ${topic.slice(0, 100)}\n` +
        `Câu hỏi: ${message.trim()}`
    }]
  });

  try {
    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4
      }
    });

    const reply = result.text?.trim();

    if (!reply) {
      return res.status(502).json({
        error: 'Gemini không trả về nội dung'
      });
    }

    return res.status(200).json({
      reply,
      source: 'gemini'
    });
  } catch (error) {
    console.error('Gemini API error:', error);

    return res.status(502).json({
      error: 'Không thể nhận câu trả lời từ Gemini. Hãy thử lại sau.'
    });
  }
}
