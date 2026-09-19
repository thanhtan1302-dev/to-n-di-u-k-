import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5500);

app.use(express.json({ limit: "10mb" }));

// Lazy Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const OFFICIAL_SGK_TUTOR_INSTRUCTIONS = `Bạn là AI Gia sư Toán của hệ thống Toán Diệu Kỳ.

Nguồn dữ liệu chính thức là bộ SGK "Kết nối tri thức với cuộc sống", được sử dụng thống nhất trên toàn quốc từ năm học 2026-2027 theo Quyết định 3588/QĐ-BGDĐT.

Nguyên tắc hoạt động bắt buộc:
- Chỉ sử dụng kiến thức thuộc chương trình THCS.
- Luôn bám sát nội dung SGK chính thức.
- Không sử dụng kiến thức đại học hoặc chuyên sâu.
- Không đưa ra nội dung vượt quá khối lớp của học sinh.
- Nếu câu hỏi vượt ngoài phạm vi dữ liệu, hãy thông báo rõ ràng rằng bài toán nằm ngoài phạm vi THCS/SGK hiện hành.
- Chỉ sử dụng nền tảng kiến thức từ các bộ sách: Toán 6, 7, 8, 9 - Kết nối tri thức với cuộc sống.
- Không làm bài hộ học sinh, không đưa đáp án ngay khi chưa hướng dẫn.
- Khuyến khích học sinh tự suy luận, lập luận và kiểm tra lại kết quả.
- Giọng điệu thân thiện, dễ hiểu, gợi mở, khuyến khích tự học.
- Không khuyến khích gian lận học tập.

Phong cách giảng dạy:
- Dẫn dắt bằng câu hỏi gợi mở hoặc ví dụ gần gũi.
- Giải thích từng bước rõ ràng, đúng trình tự logic.
- Khi cần, nêu công thức, định nghĩa hoặc định lý phù hợp với SGK và khối lớp.
- Luôn nhấn mạnh việc kiểm tra điều kiện và kết luận cuối cùng.
- Nếu học sinh chưa đủ dữ kiện, hãy yêu cầu bổ sung thông tin rõ ràng trước khi giải.

Không được:
- Giải vượt quá chương trình THCS/SGK.
- Đưa ra đáp án trái với SGK hoặc không có căn cứ học thuật phù hợp.
- Làm thay học sinh phần suy nghĩ cuối cùng.
- Thay đổi mục tiêu học tập thành giải vội hoặc giải thiếu logic.`;

const AI_GIA_SU_TUTOR_INSTRUCTIONS = `Bạn là giáo viên Toán THCS có 20 năm kinh nghiệm.
Nhiệm vụ:
- Giúp học sinh hiểu bài.
- Không đưa đáp án ngay.
- Hướng dẫn từng bước.
- Khuyến khích học sinh suy nghĩ.
Khi nhận bài toán:
1. Phân tích dạng toán.
2. Nhắc lại kiến thức liên quan.
3. Đưa ra các câu hỏi gợi mở.
4. Chia bài thành nhiều bước nhỏ.
5. Chỉ đưa đáp án cuối cùng khi học sinh yêu cầu.
Ngôn ngữ:
- Thân thiện.
- Dễ hiểu.
- Phù hợp học sinh lớp 6 đến lớp 9.
Nếu học sinh sai:
- Chỉ ra lỗi sai.
- Không chê bai.
- Gợi ý sửa lỗi.
Không làm bài hộ học sinh.`;

const LEARNING_ANALYTICS_INSTRUCTIONS = `Bạn là chuyên gia phân tích học tập.
Dựa vào dữ liệu học sinh: khối lớp, chủ đề học, số câu đúng, số câu sai, thời gian làm bài, tần suất học.
Hãy:
1. Xác định điểm mạnh.
2. Xác định điểm yếu.
3. Đánh giá mức độ thành thạo của từng chuyên đề.
4. Đưa ra nhận xét ngắn gọn.
5. Đề xuất các bài học cần học tiếp theo.
6. Đề xuất kế hoạch học trong 7 ngày.
Xuất kết quả dưới dạng JSON hợp lệ và rõ ràng.`;

// Fallback resolver for demo or when API key is unavailable
function getMockSolverResponse(question: string, grade: string = "Lớp 8") {
  return {
    problem: question,
    grade,
    summary: "Phương pháp phân tích đa thức thành nhân tử và biến đổi đại số tương đương.",
    formulaApplied: "Hằng đẳng thức đáng nhớ: (a + b)² = a² + 2ab + b² hoặc a² - b² = (a - b)(a + b)",
    steps: [
      {
        stepNumber: 1,
        title: "Xác định điều kiện và dạng toán",
        explanation: "Quan sát bài toán, ta nhận thấy biểu thức có thể đưa về dạng tích các nhân tử hoặc thu gọn các hạng tử đồng dạng.",
        mathExpression: question.trim()
      },
      {
        stepNumber: 2,
        title: "Áp dụng định lý / phép biến đổi",
        explanation: "Tách hạng tử thích hợp hoặc sử dụng tính chất giao hoán, kết hợp để nhóm các số hạng.",
        mathExpression: "Biến đổi tương đương: A = (x - 2)(x + 2) + 4 = x²"
      },
      {
        stepNumber: 3,
        title: "Tính toán và kết luận",
        explanation: "Kiểm tra lại nghiệm với điều kiện xác định ban đầu.",
        mathExpression: "Kết quả thỏa mãn điều kiện bài toán."
      }
    ],
    finalAnswer: "Nghiệm / Kết quả cuối cùng: x = 2 hoặc x = -2 (tùy thuộc đề bài cụ thể)",
    mnemonicTip: "💡 Mẹo ghi nhớ: Luôn luôn tìm điều kiện xác định (ĐKXĐ) đầu tiên trước khi biến đổi phương trình!",
    relatedChallenge: {
      question: "Giải phương trình tương tự: x² - 6x + 9 = 0",
      hint: "Nhận dạng hằng đẳng thức dạng bình phương của một hiệu (a - b)²."
    }
  };
}

function buildLearningAnalysis(payload: any) {
  const topics = Array.isArray(payload?.topics) ? payload.topics : [];
  const defaultTopicValue = {
    topic: "Chuyên đề",
    correct: 0,
    wrong: 0,
    timeMinutes: 0,
    studyFrequency: "1 buổi/tuần"
  };

  const mastery = topics.map((item: any, index: number) => {
    const questionCount = Number(item.correct || 0) + Number(item.wrong || 0);
    const accuracy = questionCount > 0 ? Number(item.correct || 0) / questionCount : 0;
    const timeMinutes = Number(item.timeMinutes || item.time_seconds ? item.time_seconds / 60 : 0);
    let level = "Cần cải thiện";
    if (accuracy >= 0.8) level = "Tốt";
    else if (accuracy >= 0.65) level = "Khá";
    else if (accuracy >= 0.5) level = "Trung bình";

    return {
      topic: item.topic || `Chuyên đề ${index + 1}`,
      correct_answers: Number(item.correct || 0),
      wrong_answers: Number(item.wrong || 0),
      time_minutes: timeMinutes,
      accuracy_rate: Number(accuracy.toFixed(2)),
      mastery_level: level,
      evaluation: accuracy >= 0.8
        ? "Nắm chắc kiến thức cơ bản và làm bài tương đối ổn định."
        : accuracy >= 0.65
          ? "Đã có nền tảng tốt, cần luyện tập thêm các dạng bài nâng cao."
          : "Cần củng cố kiến thức nền và làm nhiều bài tập dạng cơ bản hơn."
    };
  });

  const averageAccuracy = mastery.length
    ? mastery.reduce((sum: number, item: any) => sum + Number(item.accuracy_rate), 0) / mastery.length
    : 0;

  const strengths = [
    averageAccuracy >= 0.7 ? "Học sinh có nền tảng khá ổn ở các dạng bài cơ bản." : "Học sinh đang bắt đầu hình thành nền tảng kiến thức cần củng cố thường xuyên.",
    Number(payload?.studyFrequencyDays || 0) >= 3 ? "Tần suất học tương đối đều, thuận lợi cho việc ôn tập liên tục." : "Tần suất học còn chưa đều, nên tăng cường luyện tập theo lịch cố định."
  ];

  const weaknesses = [
    mastery.some((item: any) => item.accuracy_rate < 0.65)
      ? "Một số chuyên đề còn yếu, cần tập trung luyện tập nhiều hơn ở các dạng bài có nhiều bước." : "Mức độ thành thạo đang ổn, nhưng nên tiếp tục giữ thói quen ôn tập đều."
  ];

  const recommendedLessons = mastery
    .filter((item: any) => item.accuracy_rate < 0.75)
    .slice(0, 3)
    .map((item: any) => ({
      lesson: `Ôn tập ${item.topic}`,
      reason: `Mức độ thành thạo đang ở ${item.mastery_level.toLowerCase()}, cần rèn luyện thêm dạng bài ${item.topic.toLowerCase()}.`,
      priority: item.accuracy_rate < 0.6 ? "Cao" : "Trung bình"
    }));

  const sevenDayPlan = [
    { day: 1, focus: "Ôn tập chuyên đề yếu nhất", activities: ["Làm 10 câu cơ bản", "Chữa bài sai", "Ghi lại kiến thức cần nhớ"], goal: "Củng cố nền tảng" },
    { day: 2, focus: "Luyện dạng bài nâng cao", activities: ["Làm 8 câu có độ khó vừa", "Phân tích từng bước giải", "So sánh cách làm nhanh"], goal: "Tăng kỹ năng xử lý bài" },
    { day: 3, focus: "Luyện đề theo chuyên đề", activities: ["Làm 12 câu", "Kiểm tra đáp án", "Chữa lỗi từng câu"], goal: "Tăng độ chính xác" },
    { day: 4, focus: "Ôn lại kiến thức cũ", activities: ["Làm đề ngắn 20 phút", "Ghi lại phần còn lẫn lộn", "Ôn công thức"], goal: "Duy trì kiến thức" },
    { day: 5, focus: "Bài toán thực tế", activities: ["Giải bài toán có lời văn", "Viết mô hình toán học", "Kiểm tra điều kiện"], goal: "Rèn tư duy ứng dụng" },
    { day: 6, focus: "Kiểm tra mini", activities: ["Làm bài kiểm tra 15-20 phút", "Chữa bài", "Tổng kết lỗi"], goal: "Đánh giá tiến độ" },
    { day: 7, focus: "Củng cố và lập mục tiêu tiếp theo", activities: ["Ôn lại 3 chuyên đề yếu", "Lập kế hoạch tuần mới", "Duy trì thói quen học đều"], goal: "Bền vững tiến bộ" }
  ];

  return {
    student_profile: {
      grade: payload?.grade || "Lớp 8",
      study_frequency: payload?.studyFrequency || "2-3 buổi/tuần",
      time_per_session_minutes: Number(payload?.timePerSessionMinutes || 30),
      assessment_scope: topics.map((t: any) => t.topic || "Chuyên đề")
    },
    analysis: {
      strengths,
      weaknesses,
      topic_mastery: mastery,
      short_comment: averageAccuracy >= 0.75
        ? "Học sinh có nền tảng tốt và đang tiến bộ ổn định. Cần duy trì thói quen học đều và tiếp tục luyện tập các dạng bài nâng cao."
        : averageAccuracy >= 0.6
          ? "Học sinh có tiềm năng tốt, nhưng cần tăng cường luyện tập ở các chuyên đề còn yếu để nâng tốc độ và độ chính xác."
          : "Học sinh cần ôn tập nền tảng và tập trung phát triển kỹ năng làm bài từng bước để cải thiện rõ rệt hơn."
    },
    recommended_next_lessons: recommendedLessons.length ? recommendedLessons : [{ lesson: "Ôn tập chuyên đề cơ bản", reason: "Cần củng cố lại kiến thức nền trước khi học nâng cao.", priority: "Cao" }],
    seven_day_plan: sevenDayPlan
  };
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Toán Diệu Kỳ" });
});

// Endpoint: AI Math Solver
app.post("/api/ai/solve", async (req, res) => {
  try {
    const { question, grade = "Lớp 8", imageBase64, mode = "full_solve" } = req.body;

    if (!question && !imageBase64) {
      return res.status(400).json({ error: "Vui lòng nhập đề bài hoặc cung cấp hình ảnh bài toán." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return smart structured fallback
      const mockResult = getMockSolverResponse(question || "Bài toán hình học / đại số THCS", grade);
      return res.json({ result: mockResult, source: "mock" });
    }

    const systemPrompt = `${OFFICIAL_SGK_TUTOR_INSTRUCTIONS}

Yêu cầu bắt buộc khi trả lời:
- Trả về phản hồi dưới dạng JSON thuần túy (không markdown bọc ngoài nếu có thể, hoặc đảm bảo cấu trúc JSON hợp lệ).
- Đảm bảo bài giải phù hợp với học sinh ở ${grade}.
- Nếu đề bài vượt quá phạm vi THCS hoặc SGK, hãy trả về JSON với "summary" mô tả rõ: "Bài toán này vượt ngoài phạm vi kiến thức THCS/SGK Kết nối tri thức với cuộc sống." và "finalAnswer": "Khuyến nghị: em hãy hỏi một bài toán phù hợp với chương trình THCS hoặc đổi sang mức độ phù hợp với lớp học.".
- Không để ra đáp án quá nhanh trước khi hướng dẫn.
- Tự động ưu tiên lời giải theo SGK "Kết nối tri thức với cuộc sống".

Cấu trúc JSON bắt buộc:
{
  "problem": "đề bài tóm tắt",
  "grade": "${grade}",
  "summary": "Tóm tắt hướng giải vắn tắt 1-2 câu",
  "formulaApplied": "Công thức / Định lý toán học áp dụng chính",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Tên bước 1",
      "explanation": "Lời giải thích cặn kẽ cho học sinh",
      "mathExpression": "Biểu thức toán hoặc phép tính cụ thể"
    }
  ],
  "finalAnswer": "Đáp số cuối cùng đóng khung nổi bật",
  "mnemonicTip": "Mẹo ghi nhớ hoặc cảnh báo lỗi sai học sinh hay mắc phải",
  "relatedChallenge": {
    "question": "Một bài toán tương tự để học sinh tự giải",
    "hint": "Gợi ý ngắn"
  }
}`;

    let contentsPayload: any;
    if (imageBase64) {
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, "")
            }
          },
          {
            text: `Giải bài toán trong ảnh cho học sinh ${grade}. Yêu cầu câu hỏi bổ sung: ${question || "Giải chi tiết từng bước"}`
          }
        ]
      };
    } else {
      contentsPayload = `Hãy giải chi tiết bài toán sau cho học sinh ${grade}:
"${question}"
Phương thức: ${mode === "hint_only" ? "Chỉ gợi ý các hướng đi tư duy mở đầu, không lộ đáp số cuối" : "Giải chi tiết từng bước và đáp số"}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text || "";
    try {
      const parsed = JSON.parse(responseText);
      return res.json({ result: parsed, source: "gemini" });
    } catch {
      // If parsing failed, wrap in fallback
      return res.json({
        result: {
          problem: question,
          grade,
          summary: "Hướng dẫn giải chi tiết từ Trợ lý Toán Diệu Kỳ",
          formulaApplied: "Quy tắc biến đổi tương đương & tính chất toán học",
          steps: [
            {
              stepNumber: 1,
              title: "Các bước thực hiện",
              explanation: responseText,
              mathExpression: ""
            }
          ],
          finalAnswer: "Vui lòng xem chi tiết ở các bước trên",
          mnemonicTip: "Kiểm tra kỹ các bước tính toán!",
          relatedChallenge: {
            question: "Luyện tập bài tập tương tự trong SGK",
            hint: "Xem lại lý thuyết bài học"
          }
        },
        source: "gemini_raw"
      });
    }
  } catch (error: any) {
    console.error("AI Solve error:", error);
    // Graceful fallback so student UI never breaks
    const fallback = getMockSolverResponse(req.body.question || "Phương trình bậc nhất / tam giác đồng dạng", req.body.grade || "Lớp 8");
    return res.json({ result: fallback, source: "fallback_on_error", error: error.message });
  }
});

// Endpoint: AI Socratic Chat Hint
app.post("/api/ai/hint", async (req, res) => {
  try {
    const { question, studentCurrentAttempt, grade = "Lớp 8" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        hint: "💡 Thầy gợi ý: Em hãy quan sát xem biểu thức có thể phân tích thành nhân tử bằng cách đặt nhân tử chung hay dùng hằng đẳng thức số mấy nhé!",
        nextQuestion: "Em đã nhận ra nhân tử chung ở đây là gì chưa?"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Đề bài: "${question}".
Học sinh lớp ${grade} đang làm đến bước: "${studentCurrentAttempt || "Chưa biết bắt đầu từ đâu"}".
Hãy đưa ra 1 gợi ý theo phương pháp Socratic (hỏi mở gợi suy nghĩ, KHÔNG nói thẳng đáp án, giọng điệu vui tươi, thân thiện, cổ vũ). Tối đa 3 câu.`,
      config: {
        systemInstruction: `${OFFICIAL_SGK_TUTOR_INSTRUCTIONS}

Bạn hướng dẫn học sinh THCS bằng cách đặt câu hỏi mở, khuyến khích tư duy, không nói thẳng đáp án, và luôn bám sát SGK "Kết nối tri thức với cuộc sống". Tối đa 3 câu, dễ hiểu, thân thiện, khích lệ học sinh tự suy luận.`,
      }
    });

    res.json({ hint: response.text });
  } catch (err: any) {
    res.json({
      hint: "💡 Gợi ý: Em hãy xem lại định nghĩa và vẽ hình minh họa (nếu là hình học) hoặc chuyển vế đổi dấu cẩn thận (nếu là đại số) nhé!"
    });
  }
});

app.post("/api/ai/learning-analysis", async (req, res) => {
  try {
    const payload = req.body || {};
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        result: buildLearningAnalysis(payload),
        source: "rule_based"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: JSON.stringify({
        grade: payload.grade,
        studyFrequency: payload.studyFrequency,
        timePerSessionMinutes: payload.timePerSessionMinutes,
        topics: payload.topics,
      }, null, 2),
      config: {
        systemInstruction: `${LEARNING_ANALYTICS_INSTRUCTIONS}

Bạn phải xuất ra JSON hợp lệ theo cấu trúc:
{
  "student_profile": { "grade": "...", "study_frequency": "...", "time_per_session_minutes": 0, "assessment_scope": ["..."] },
  "analysis": {
    "strengths": ["..."],
    "weaknesses": ["..."],
    "topic_mastery": [
      { "topic": "...", "correct_answers": 0, "wrong_answers": 0, "time_minutes": 0, "accuracy_rate": 0.0, "mastery_level": "Tốt|Khá|Trung bình|Cần cải thiện", "evaluation": "..." }
    ],
    "short_comment": "..."
  },
  "recommended_next_lessons": [
    { "lesson": "...", "reason": "...", "priority": "Cao|Trung bình|Thấp" }
  ],
  "seven_day_plan": [
    { "day": 1, "focus": "...", "activities": ["..."], "goal": "..." }
  ]
}`,
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    });

    const responseText = response.text || "{}";
    try {
      const parsed = JSON.parse(responseText);
      return res.json({ result: parsed, source: "gemini" });
    } catch {
      return res.json({
        result: buildLearningAnalysis(payload),
        source: "gemini_fallback"
      });
    }
  } catch (error: any) {
    return res.json({
      result: buildLearningAnalysis(req.body || {}),
      source: "fallback_on_error",
      error: error.message
    });
  }
});

// Vite middleware for development & static serving for production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Toán Diệu Kỳ server running on http://127.0.0.1:${PORT}`);
  });
}

start();
