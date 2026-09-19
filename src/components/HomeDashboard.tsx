import React, { useEffect, useState } from 'react';
import { StudentProfile, Badge, LessonUnit, DailyMathHack, NavigationTab } from '../types';
import { QUICK_CHALLENGES } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Flame, 
  Award, 
  ArrowRight, 
  Zap, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  BookOpen, 
  Clock, 
  Trophy,
  ChevronRight,
  RefreshCw,
  Compass
} from 'lucide-react';

interface HomeDashboardProps {
  profile: StudentProfile;
  badges: Badge[];
  recommendedLesson: LessonUnit;
  dailyHacks: DailyMathHack[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenLesson: (lesson: LessonUnit) => void;
  onAddXp: (amount: number) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  badges,
  recommendedLesson,
  dailyHacks,
  onNavigate,
  onOpenLesson,
  onAddXp,
}) => {
  // Quick Challenge state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [learningAnalysis, setLearningAnalysis] = useState<any>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  useEffect(() => {
    const fetchLearningAnalysis = async () => {
      setIsAnalysisLoading(true);
      try {
        const response = await fetch('/api/ai/learning-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: 'STU001',
            name: profile.name,
            grade: profile.grade,
            studyFrequency: '2-3 buổi/tuần',
            timePerSessionMinutes: 35,
            topics: [
              { topic: 'Số hữu tỉ', correct: 18, wrong: 4, timeMinutes: 120 },
              { topic: 'Phân số', correct: 15, wrong: 6, timeMinutes: 150 },
              { topic: 'Biểu thức đại số', correct: 12, wrong: 8, timeMinutes: 180 },
              { topic: 'Hình học cơ bản', correct: 13, wrong: 7, timeMinutes: 170 },
              { topic: 'Thống kê', correct: 16, wrong: 5, timeMinutes: 140 }
            ]
          })
        });

        const data = await response.json();
        setLearningAnalysis(data.result || null);
      } catch (error) {
        console.error('Learning analysis fetch failed:', error);
      } finally {
        setIsAnalysisLoading(false);
      }
    };

    fetchLearningAnalysis();
  }, [profile.name, profile.grade]);

  // Daily Hack state
  const [activeHackIndex, setActiveHackIndex] = useState(0);
  const [showHackDetail, setShowHackDetail] = useState(false);

  const activeHack = dailyHacks[activeHackIndex] || dailyHacks[0];
  const currentQuestion = QUICK_CHALLENGES[currentQuizIndex];

  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + currentQuestion.rewardXp);
      onAddXp(currentQuestion.rewardXp);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < QUICK_CHALLENGES.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  const xpProgressPercent = Math.min(
    100,
    Math.round(((profile.xp % 1000) / 1000) * 100)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. STUDENT GREETING & HERO MOTIVATION BANNER */}
      <section className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-[#14122C] via-[#1E1B4B] to-[#0F172A] p-6 sm:p-8 shadow-2xl shadow-purple-950/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-3xl sm:text-4xl shadow-lg shadow-purple-600/40 ring-4 ring-purple-500/20">
              {profile.avatar}
              <div className="absolute -bottom-1 -right-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950 shadow">
                Lv.{profile.level}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {greetingTime}, Siêu Chiến Binh!
                </span>
                <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
                  {profile.grade}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk',sans-serif]">
                {profile.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                Chuỗi <span className="font-bold text-orange-400">{profile.streakDays} ngày</span> học liên tục! Đạt mục tiêu hôm nay để nhận thêm <span className="font-semibold text-cyan-300">+50 XP</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('lessons')}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Compass className="h-4 w-4" />
              <span>Tiếp tục bản đồ học</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('ai-solver')}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-purple-400/30 px-4 py-3 text-sm font-semibold text-purple-200 transition-all"
            >
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
              <span>Hỏi Thầy AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2-COLUMN DASHBOARD GRID: DUOLINGO / KHAN ACADEMY STYLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: AI RECOMMENDATION, QUICK CHALLENGE, DAILY HACK */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* A. AI RECOMMENDED LESSON (Duolingo & Khan Academy Next Step) */}
          <section className="rounded-2xl border border-purple-800/50 bg-[#0F172A]/90 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Đề xuất thông minh từ AI
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                Dựa trên kết quả luyện tập
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-purple-700/30 bg-gradient-to-r from-purple-950/30 via-slate-900 to-indigo-950/40 p-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-2xl shadow-md">
                  {recommendedLesson.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-300">
                      {recommendedLesson.chapter}
                    </span>
                    <span className="text-[10px] bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded font-mono">
                      +{recommendedLesson.xpReward} XP
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {recommendedLesson.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {recommendedLesson.description}
                  </p>
                </div>
              </div>

              <button
                id="btn-start-recommended-lesson"
                onClick={() => onOpenLesson(recommendedLesson)}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:shadow-cyan-600/50 hover:scale-105 transition-all"
              >
                <span>Vào học ngay</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* B. THỬ THÁCH NHANH (QUICK BLITZ MATH QUIZ) */}
          <section className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                    Thử thách nhanh hôm nay
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Rèn luyện phản xạ tính nhẩm và tư duy logic
                  </p>
                </div>
              </div>

              {!isQuizCompleted && (
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Câu {currentQuizIndex + 1}/{QUICK_CHALLENGES.length}</span>
                </div>
              )}
            </div>

            {!isQuizCompleted ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
                  <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-purple-500/50 hover:bg-slate-800/80";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-1 ring-emerald-500";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200 ring-1 ring-rose-500";
                      }
                    } else if (isSelected) {
                      btnStyle = "border-purple-500 bg-purple-950/50 text-white ring-1 ring-purple-500";
                    }

                    return (
                      <button
                        key={idx}
                        id={`quick-option-${idx}`}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleOptionSelect(idx)}
                        className={`flex items-center justify-between rounded-xl border p-3 text-xs font-medium text-left transition-all ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="rounded-xl bg-slate-900/90 border border-purple-900/40 p-3.5 space-y-1">
                    <p className="text-xs font-bold text-cyan-300">
                      💡 Giải thích:
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isAnswerSubmitted ? (
                    <button
                      id="btn-submit-quick-quiz"
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 disabled:opacity-40 transition-all"
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <button
                      id="btn-next-quick-quiz"
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition-all"
                    >
                      <span>
                        {currentQuizIndex < QUICK_CHALLENGES.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-900/90 border border-emerald-500/30 p-6 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Trophy className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Hoàn thành Thử thách nhanh!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Bạn đã xuất sắc nhận được <span className="font-bold text-amber-400">+{quizScore} XP</span> và duy trì chuỗi phản xạ tuyệt vời.
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-purple-300 border border-purple-500/30 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Luyện tập lại</span>
                </button>
              </div>
            )}
          </section>

          {/* C. PHÂN TÍCH HỌC LỰC (AI LEARNING ANALYTICS) */}
          <section className="rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/30 via-[#0F172A] to-indigo-950/30 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                    Phân tích học lực
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Đánh giá điểm mạnh, điểm yếu và kế hoạch học 7 ngày
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-slate-900/80 border border-slate-700 px-2 py-0.5 text-[10px] text-cyan-300">
                AI cập nhật
              </div>
            </div>

            {isAnalysisLoading ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-300">
                Đang phân tích kết quả học tập của em...
              </div>
            ) : learningAnalysis ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Nhận xét ngắn</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {learningAnalysis.analysis?.short_comment}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {learningAnalysis.analysis?.topic_mastery?.slice(0, 4).map((item: any, index: number) => (
                    <div key={index} className="rounded-xl border border-slate-800 bg-slate-900/75 p-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-200">{item.topic}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                          {item.mastery_level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Đúng: {item.correct_answers}</span>
                        <span>Sai: {item.wrong_answers}</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${Math.max(10, item.accuracy_rate * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Bài học cần học tiếp</p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {learningAnalysis.recommended_next_lessons?.slice(0, 3).map((item: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>
                          <span className="font-semibold text-white">{item.lesson}</span> — {item.reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-300">
                Chưa có dữ liệu phân tích học lực cho em.
              </div>
            )}
          </section>

          {/* D. MẸO TOÁN HỌC MỖI NGÀY (DAILY MATH HACK) */}
          <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-br from-indigo-950/40 via-[#0F172A] to-purple-950/30 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Lightbulb className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                    Mẹo Toán học mỗi ngày
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Bí quyết tính nhẩm & ảo thuật số học kỳ diệu
                  </span>
                </div>
              </div>

              {/* Hack selector buttons */}
              <div className="flex items-center gap-1">
                {dailyHacks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveHackIndex(i);
                      setShowHackDetail(false);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      activeHackIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-purple-500/20 bg-slate-900/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  {activeHack.category}
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">
                  Mẹo #{activeHackIndex + 1}
                </span>
              </div>

              <h4 className="text-base font-bold text-white">
                {activeHack.title}
              </h4>

              <div className="rounded-lg bg-purple-950/40 border border-purple-800/40 p-3 text-xs text-purple-200">
                <span className="font-bold text-white">Ví dụ: </span>
                {activeHack.example}
              </div>

              {showHackDetail ? (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeHack.explanation}
                  </p>
                  <p className="text-[11px] text-cyan-300/90 italic bg-cyan-950/30 p-2 rounded-lg border border-cyan-900/40">
                    ✨ Chuyện bên lề: {activeHack.funFact}
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setShowHackDetail(!showHackDetail)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
                >
                  {showHackDetail ? 'Thu gọn' : 'Khám phá bí mật tại sao đúng →'}
                </button>
                <button
                  onClick={() => {
                    setActiveHackIndex((prev) => (prev + 1) % dailyHacks.length);
                    setShowHackDetail(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
                >
                  <span>Mẹo tiếp theo</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT 1 COLUMN: GAMIFICATION STATS, XP PROGRESS, BADGES SHOWCASE */}
        <div className="space-y-6">
          
          {/* A. TIẾN ĐỘ HỌC TẬP & LEVEL PROGRESS */}
          <section className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-purple-400" />
              Tiến độ học tập
            </h3>

            {/* Level bar */}
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  Cấp độ {profile.level}
                </span>
                <span className="font-mono text-purple-300 font-bold">
                  {profile.xp} / {profile.nextLevelXp} XP
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${xpProgressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Còn {profile.nextLevelXp - profile.xp} XP để mở khóa Cấp {profile.level + 1}
              </p>
            </div>

            {/* Daily Goal Ring / Box */}
            <div className="flex items-center justify-between rounded-xl bg-purple-950/20 border border-purple-900/30 p-3.5">
              <div>
                <p className="text-xs text-slate-400">Mục tiêu hôm nay</p>
                <p className="text-lg font-bold text-white font-mono">
                  {profile.todayEarnedXp} <span className="text-xs text-slate-400 font-normal">/ {profile.dailyGoalXp} XP</span>
                </p>
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center">
                <svg className="h-12 w-12 -rotate-90 transform">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    className="stroke-purple-500 fill-none transition-all duration-500"
                    strokeWidth="4"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (125.6 * Math.min(100, (profile.todayEarnedXp / profile.dailyGoalXp) * 100)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-purple-300 font-mono">
                  {Math.round((profile.todayEarnedXp / profile.dailyGoalXp) * 100)}%
                </span>
              </div>
            </div>

            {/* Quick stats list */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
                <p className="text-lg font-bold text-cyan-300 font-mono">
                  {profile.completedLessonsCount}
                </p>
                <p className="text-[10px] text-slate-400">Bài học hoàn thành</p>
              </div>
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
                <p className="text-lg font-bold text-emerald-400 font-mono">
                  {profile.accuracyRate}%
                </p>
                <p className="text-[10px] text-slate-400">Độ chính xác trung bình</p>
              </div>
            </div>
          </section>

          {/* B. TỦ HUY HIỆU DANH GIÁ (BADGES SHOWCASE) */}
          <section className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                Huy hiệu đạt được
              </h3>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs text-purple-400 hover:text-purple-300 transition"
              >
                Xem tất cả →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {badges.slice(0, 6).map((badge) => (
                <div
                  key={badge.id}
                  title={`${badge.name}: ${badge.description}`}
                  className={`group relative flex flex-col items-center justify-center rounded-xl p-3 text-center border transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-b from-purple-950/40 to-slate-900/90 border-purple-500/30 hover:border-purple-400 hover:scale-105'
                      : 'bg-slate-900/40 border-slate-800/80 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-2xl mb-1">{badge.icon}</span>
                  <span className="text-[11px] font-bold text-slate-200 line-clamp-1">
                    {badge.name}
                  </span>
                  <span className="text-[9px] text-slate-400 line-clamp-1">
                    {badge.unlocked ? badge.unlockedAt : 'Chưa khóa'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* C. QUICK ARENA CALLOUT */}
          <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚔️</span>
              <div>
                <h4 className="text-sm font-bold text-white">Đấu trường Toán học</h4>
                <p className="text-[11px] text-indigo-200">Đấu trí 1v1 theo thời gian thực</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn đang xếp hạng <span className="font-bold text-amber-300">Top 4</span> toàn quốc. Thách đấu ngay để tiến vào Top 3!
            </p>
            <button
              id="btn-goto-arena-home"
              onClick={() => onNavigate('arena')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Vào Đấu Trường</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};
