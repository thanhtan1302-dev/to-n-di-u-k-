import React, { useState } from 'react';
import { GradeLevel, AiSolvedResult } from '../types';
import { SAMPLE_AI_QUESTIONS } from '../data/mockData';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  BookmarkCheck, 
  Loader2, 
  HelpCircle, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface AiSolverViewProps {
  currentGrade: GradeLevel;
  onAddXp: (amount: number) => void;
}

export const AiSolverView: React.FC<AiSolverViewProps> = ({
  currentGrade,
  onAddXp,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [solverMode, setSolverMode] = useState<'full_solve' | 'hint_only'>('full_solve');
  const [isLoading, setIsLoading] = useState(false);
  const [solvedResult, setSolvedResult] = useState<AiSolvedResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [socraticHintText, setSocraticHintText] = useState<string | null>(null);

  // Quick Math Symbols Palette
  const mathSymbols = ['²', '³', '√', 'π', '±', '≠', '≤', '≥', 'Δ', '∈', '∽', '⊥', '//', 'x', 'y', 'α', 'β'];

  const insertSymbol = (sym: string) => {
    setQuestionText((prev) => prev + sym);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSolve = async () => {
    if (!questionText.trim() && !uploadedImage) return;

    setIsLoading(true);
    setSolvedResult(null);
    setSocraticHintText(null);

    try {
      if (solverMode === 'hint_only') {
        const response = await fetch('/api/ai/hint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: questionText,
            studentCurrentAttempt: "Em đang bắt đầu suy nghĩ về bài toán này",
            grade: selectedGrade,
          }),
        });
        const data = await response.json();
        setSocraticHintText(data.hint || "Hãy xem lại định nghĩa và các điều kiện bài toán.");
        onAddXp(15);
      } else {
        const response = await fetch('/api/ai/solve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: questionText,
            grade: selectedGrade,
            imageBase64: uploadedImage,
            mode: 'full_solve',
          }),
        });

        const data = await response.json();
        if (data.result) {
          setSolvedResult(data.result);
          onAddXp(25);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const loadSampleQuestion = (q: { question: string; grade: string }) => {
    setQuestionText(q.question);
    setSelectedGrade(q.grade as GradeLevel);
    setUploadedImage(null);
    setSolvedResult(null);
    setSocraticHintText(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Bot className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Trợ Lý Học Tập Thông Minh
          </span>
          <span className="rounded-full bg-purple-950 border border-purple-500/40 px-2 py-0.5 text-[10px] font-mono text-purple-300">
            Gemini 3.8 Flash
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-['Space_Grotesk',sans-serif]">
          Góc Giải Toán AI & Trợ Lý Socratic
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Nhập đề bài hoặc chụp ảnh bài tập sách giáo khoa. Thầy AI sẽ hướng dẫn từng bước tư duy rõ ràng, không chỉ đưa đáp án, và luôn bám sát SGK Toán 6–9 Kết nối tri thức với cuộc sống.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (Input & Controls) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl border border-purple-900/40 bg-[#0F172A]/90 p-5 shadow-xl space-y-4">
            
            {/* Grade and Mode selectors */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium">Lớp:</span>
                {(['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-2 py-1 text-xs font-semibold rounded-lg transition ${
                      selectedGrade === g
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                <button
                  onClick={() => setSolverMode('full_solve')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                    solverMode === 'full_solve'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Giải chi tiết
                </button>
                <button
                  onClick={() => setSolverMode('hint_only')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                    solverMode === 'hint_only'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  💡 Gợi ý tư duy
                </button>
              </div>
            </div>

            {/* Input Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Nội dung đề bài:</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Hỗ trợ cả Đại số, Hình học & Bài toán thực tế
                </span>
              </label>

              <textarea
                id="ai-question-input"
                rows={5}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ví dụ: Cho tam giác ABC vuông tại A, có AB = 6cm, AC = 8cm. Tính độ dài đường cao AH..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none transition"
              />
            </div>

            {/* Math Symbols Virtual Keyboard Toolbar */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Chèn ký hiệu toán học nhanh:</span>
              <div className="flex flex-wrap gap-1.5">
                {mathSymbols.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => insertSymbol(sym)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 hover:bg-purple-900/50 hover:text-purple-300 border border-slate-700/60 text-xs font-mono font-bold text-slate-200 transition"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="math-image-upload"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 border border-slate-700 cursor-pointer transition"
                >
                  <Upload className="h-3.5 w-3.5 text-purple-400" />
                  <span>{uploadedImage ? 'Đổi ảnh đề bài' : 'Tải ảnh đề bài (SGK/vở)'}</span>
                </label>
                <input
                  id="math-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {uploadedImage && (
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Xóa ảnh
                  </button>
                )}
              </div>

              {uploadedImage && (
                <div className="mt-3 relative rounded-xl border border-purple-600/40 overflow-hidden max-h-36 bg-slate-950 flex items-center justify-center">
                  <img
                    src={uploadedImage}
                    alt="Uploaded problem"
                    className="object-contain max-h-36 w-full"
                  />
                  <span className="absolute bottom-1 right-2 bg-slate-900/80 text-[10px] text-cyan-300 px-1.5 py-0.5 rounded">
                    Ảnh đã sẵn sàng
                  </span>
                </div>
              )}
            </div>

            {/* Action Submit Button */}
            <div className="pt-2">
              <button
                id="btn-trigger-solve"
                disabled={isLoading || (!questionText.trim() && !uploadedImage)}
                onClick={handleSolve}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thầy AI đang phân tích và giải toán...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                    <span>
                      {solverMode === 'full_solve' ? 'Giải chi tiết từng bước' : 'Nhận gợi ý tư duy Socratic'}
                    </span>
                    <Send className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sample Questions Library */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
              Câu hỏi mẫu thử nghiệm ngay
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_AI_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => loadSampleQuestion(q)}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-left text-xs text-slate-300 hover:border-purple-500/50 hover:bg-slate-800/80 transition group"
                >
                  <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold mb-1">
                    <span>{q.title}</span>
                    <span className="text-slate-500">{q.grade}</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] text-slate-400 group-hover:text-slate-200">
                    {q.question}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Solved Output / Socratic Hint) */}
        <div className="lg:col-span-6 space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-[#0F172A]/90 p-12 text-center space-y-4 shadow-xl">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
                <Bot className="h-8 w-8 animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Đang phân tích bài toán...
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Áp dụng định lý chương trình {selectedGrade}, tìm kiếm phương pháp giải tối ưu và ngắn gọn nhất.
                </p>
              </div>
            </div>
          )}

          {/* Socratic Hint Output */}
          {socraticHintText && !isLoading && (
            <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-[#0F172A] to-purple-950/30 p-6 shadow-xl space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-cyan-300">
                <Lightbulb className="h-5 w-5 text-amber-300" />
                <h3 className="text-base font-bold">Gợi ý mở từ Thầy AI</h3>
              </div>
              <div className="rounded-xl bg-slate-900/90 border border-cyan-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
                <p>{socraticHintText}</p>
              </div>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-400">Em đã nghĩ ra hướng giải chưa?</span>
                <button
                  onClick={() => {
                    setSolverMode('full_solve');
                    handleSolve();
                  }}
                  className="rounded-xl bg-purple-600 hover:bg-purple-500 px-3 py-1.5 font-bold text-white transition"
                >
                  Xem lời giải chi tiết →
                </button>
              </div>
            </div>
          )}

          {/* Full Solved Result */}
          {solvedResult && !isLoading && (
            <div className="rounded-2xl border border-purple-500/40 bg-[#0F172A]/95 p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
              
              {/* Problem summary & Key Formula */}
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-950 border border-cyan-500/40 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                    {solvedResult.grade}
                  </span>
                  <button
                    onClick={() => handleCopy(solvedResult.formulaApplied)}
                    className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white transition"
                  >
                    {copiedFormula ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedFormula ? 'Đã sao chép' : 'Sao chép công thức'}</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-white">
                  {solvedResult.summary}
                </h3>
                {solvedResult.formulaApplied && (
                  <div className="rounded-xl bg-purple-950/40 border border-purple-800/40 p-3 font-mono text-xs font-bold text-purple-200">
                    <span className="text-amber-400 font-sans">📐 Công thức: </span>
                    {solvedResult.formulaApplied}
                  </div>
                )}
              </div>

              {/* Step by step */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <BookmarkCheck className="h-4 w-4 text-emerald-400" />
                  Các bước giải chi tiết:
                </h4>

                {solvedResult.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                        {step.stepNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {step.title}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
                      {step.explanation}
                    </p>

                    {step.mathExpression && (
                      <div className="ml-7 rounded-lg bg-slate-950 p-2.5 font-mono text-xs text-cyan-300 border border-slate-800">
                        {step.mathExpression}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Answer Highlight */}
              <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/30 p-4 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  ĐÁP SỐ CUỐI CÙNG
                </span>
                <p className="text-base sm:text-lg font-extrabold text-white">
                  {solvedResult.finalAnswer}
                </p>
              </div>

              {/* Mnemonic Tip */}
              {solvedResult.mnemonicTip && (
                <div className="rounded-xl bg-amber-950/30 border border-amber-800/40 p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    {solvedResult.mnemonicTip}
                  </p>
                </div>
              )}

              {/* Related Challenge Drill */}
              {solvedResult.relatedChallenge && (
                <div className="rounded-xl border border-indigo-700/30 bg-indigo-950/30 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300">
                      🎯 Bài toán tương tự để em tự luyện:
                    </span>
                    <span className="text-[10px] bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded">
                      +20 XP
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    {solvedResult.relatedChallenge.question}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    Gợi ý: {solvedResult.relatedChallenge.hint}
                  </p>
                </div>
              )}

            </div>
          )}

          {!solvedResult && !socraticHintText && !isLoading && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-[#0F172A]/50 p-12 text-center text-slate-400 space-y-3">
              <Bot className="h-12 w-12 text-purple-400/50" />
              <h4 className="text-sm font-semibold text-slate-300">
                Chưa có câu hỏi nào được giải
              </h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Hãy nhập một bài toán hóc búa ở cột bên trái hoặc chọn một câu hỏi mẫu để trải nghiệm sức mạnh giải toán của Trợ lý AI!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
