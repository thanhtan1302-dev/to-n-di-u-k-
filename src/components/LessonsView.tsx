import React, { useState } from 'react';
import { LessonUnit, GradeLevel, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Lock, 
  Star, 
  BookOpen, 
  Sparkles, 
  Award, 
  ChevronRight, 
  X, 
  Check, 
  Lightbulb, 
  BookMarked,
  Filter
} from 'lucide-react';

interface LessonsViewProps {
  lessons: LessonUnit[];
  selectedGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  onCompleteLesson: (lessonId: string, earnedStars: number, earnedXp: number) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  lessons,
  selectedGrade,
  onGradeChange,
  onCompleteLesson,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'algebra' | 'geometry' | 'statistics'>('all');
  const [activeLesson, setActiveLesson] = useState<LessonUnit | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<'theory' | 'samples' | 'quiz'>('theory');

  // Quiz state within modal
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Filter lessons for the selected grade and category
  const filteredLessons = lessons.filter((lesson) => {
    const matchesGrade = lesson.grade === selectedGrade;
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    return matchesGrade && matchesCategory;
  });

  const handleOpenLesson = (lesson: LessonUnit) => {
    if (lesson.isLocked) return;
    setActiveLesson(lesson);
    setActiveLessonTab('theory');
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setIsAnswerChecked(false);
    setQuizCorrectCount(0);
    setIsQuizFinished(false);
  };

  const handleCloseModal = () => {
    setActiveLesson(null);
  };

  const handleCheckQuizAnswer = (currentQ: QuizQuestion) => {
    if (selectedQuizOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);
    if (selectedQuizOption === currentQ.correctIndex) {
      setQuizCorrectCount((prev) => prev + 1);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNextQuizQuestion = (totalQuestions: number) => {
    if (quizIndex < totalQuestions - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsQuizFinished(true);
      const earnedStars = Math.max(1, Math.round(((quizCorrectCount + 1) / totalQuestions) * 3));
      if (activeLesson) {
        onCompleteLesson(activeLesson.id, earnedStars, activeLesson.xpReward);
      }
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 text-xs font-semibold">
              Chương trình GDPT Toán THCS
            </span>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              {selectedGrade}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-['Space_Grotesk',sans-serif]">
            Bản Đồ Kỹ Năng & Bài Học
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Lộ trình học theo từng chặng, tích lũy sao và mở khóa hòm kho báu kiến thức.
          </p>
        </div>

        {/* Grade tabs & Subject Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
            <Filter className="h-3.5 w-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedCategory('algebra')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                selectedCategory === 'algebra'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Đại số
            </button>
            <button
              onClick={() => setSelectedCategory('geometry')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                selectedCategory === 'geometry'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hình học
            </button>
          </div>
        </div>
      </div>

      {/* LEARNING PATH / SKILL TREE DISPLAY */}
      <div className="relative max-w-4xl mx-auto py-4">
        {/* Curving background connector line like Duolingo */}
        <div className="absolute left-8 sm:left-12 top-8 bottom-8 w-1 bg-gradient-to-b from-purple-600 via-indigo-600 to-cyan-500 rounded-full opacity-30 -z-0" />

        <div className="space-y-6 relative z-10">
          {filteredLessons.map((unit) => {
            const isAvailable = !unit.isLocked;
            const isCompleted = unit.isCompleted;

            return (
              <div
                key={unit.id}
                className={`relative flex items-start gap-4 sm:gap-6 group transition-all duration-300 ${
                  unit.isLocked ? 'opacity-60' : 'hover:translate-x-1'
                }`}
              >
                {/* Node icon / circle */}
                <div
                  onClick={() => handleOpenLesson(unit)}
                  className={`relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 cursor-pointer items-center justify-center rounded-2xl sm:rounded-3xl border text-2xl sm:text-3xl shadow-xl transition-all ${
                    isCompleted
                      ? 'border-emerald-500/50 bg-gradient-to-tr from-emerald-950/80 to-slate-900 text-white shadow-emerald-950/50 ring-2 ring-emerald-500/40 hover:scale-105'
                      : isAvailable
                      ? 'border-purple-500/60 bg-gradient-to-tr from-purple-900/90 via-indigo-950 to-slate-900 text-white shadow-purple-900/50 ring-4 ring-purple-500/20 hover:scale-105'
                      : 'border-slate-800 bg-slate-900/80 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isAvailable ? unit.icon : <Lock className="h-6 w-6 text-slate-500" />}

                  {/* Stars counter on bottom */}
                  {isAvailable && (
                    <div className="absolute -bottom-2 flex items-center gap-0.5 rounded-full bg-slate-950 px-2 py-0.5 border border-slate-700 shadow">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-2.5 w-2.5 ${
                            starIdx <= unit.stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div
                  onClick={() => handleOpenLesson(unit)}
                  className={`flex-1 rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                    isCompleted
                      ? 'border-emerald-800/40 bg-slate-900/80 hover:border-emerald-500/50'
                      : isAvailable
                      ? 'border-purple-700/40 bg-[#0F172A]/90 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-900/30'
                      : 'border-slate-800/60 bg-slate-950/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-purple-400">
                          {unit.chapter}
                        </span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300 font-mono">
                          +{unit.xpReward} XP
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                            <Check className="h-3 w-3" /> Đã hoàn thành
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                        {unit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                        {unit.description}
                      </p>
                    </div>

                    <div className="shrink-0 pt-2 sm:pt-0">
                      {isAvailable ? (
                        <button
                          className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 transition-all"
                        >
                          <span>{isCompleted ? 'Ôn tập' : 'Bắt đầu học'}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" /> Chưa mở khóa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLessons.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">
              <BookMarked className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <p>Chưa có bài học cho bộ lọc hiện tại. Vui lòng chọn lớp học khác!</p>
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE LESSON MODAL */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-3xl border border-purple-600/40 bg-[#0B1120] text-slate-100 shadow-2xl shadow-purple-950/80 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/70">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-purple-950/60 border border-purple-700/40">
                  {activeLesson.icon}
                </span>
                <div>
                  <span className="text-xs text-purple-400 font-semibold">
                    {activeLesson.chapter}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {activeLesson.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex border-b border-slate-800 px-6 bg-slate-950/50">
              <button
                onClick={() => setActiveLessonTab('theory')}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition ${
                  activeLessonTab === 'theory'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>1. Lý thuyết cốt lõi</span>
              </button>
              <button
                onClick={() => setActiveLessonTab('samples')}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition ${
                  activeLessonTab === 'samples'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="h-4 w-4" />
                <span>2. Ví dụ mẫu trực quan</span>
              </button>
              <button
                onClick={() => setActiveLessonTab('quiz')}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition ${
                  activeLessonTab === 'quiz'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>3. Bài tập thực hành</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: THEORY */}
              {activeLessonTab === 'theory' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-cyan-300" />
                      Công thức then chốt cần nhớ
                    </h4>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {activeLesson.keyFormulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-slate-900/90 border border-purple-800/40 p-3 font-mono text-xs sm:text-sm font-bold text-cyan-300 shadow-sm"
                        >
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
                    <h4 className="text-sm font-bold text-white">Nội dung bài giảng</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeLesson.theoryContent.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveLessonTab('samples')}
                      className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2.5 text-xs font-bold text-white transition"
                    >
                      <span>Xem Ví dụ minh họa</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: SAMPLES */}
              {activeLessonTab === 'samples' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {activeLesson.sampleProblems.map((sample, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/40 px-2 py-0.5 text-[10px] font-bold">
                            Ví dụ {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {sample.question}
                          </span>
                        </div>
                        <div className="rounded-xl bg-purple-950/30 border border-purple-900/40 p-3 text-xs text-purple-200 leading-relaxed">
                          <span className="font-bold text-cyan-300">Lời giải: </span>
                          {sample.solution}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveLessonTab('theory')}
                      className="text-xs font-semibold text-slate-400 hover:text-white transition"
                    >
                      ← Quay lại lý thuyết
                    </button>
                    <button
                      onClick={() => setActiveLessonTab('quiz')}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition"
                    >
                      <span>Luyện tập tính điểm</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: QUIZ PRACTICE */}
              {activeLessonTab === 'quiz' && (
                <div className="space-y-4">
                  {!isQuizFinished ? (
                    (() => {
                      const currentQ = activeLesson.quiz[quizIndex] || activeLesson.quiz[0];
                      if (!currentQ) {
                        return <p className="text-xs text-slate-400">Bài tập đang được cập nhật.</p>;
                      }

                      return (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Câu hỏi {quizIndex + 1} / {activeLesson.quiz.length}</span>
                            <span className="text-purple-300 font-mono">
                              +{activeLesson.xpReward} XP khi hoàn thành
                            </span>
                          </div>

                          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              {currentQ.question}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQ.options.map((opt, oIdx) => {
                              const isSelected = selectedQuizOption === oIdx;
                              const isCorrect = oIdx === currentQ.correctIndex;
                              let btnClass = "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-purple-500/60";

                              if (isAnswerChecked) {
                                if (isCorrect) {
                                  btnClass = "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500";
                                } else if (isSelected && !isCorrect) {
                                  btnClass = "border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500";
                                }
                              } else if (isSelected) {
                                btnClass = "border-purple-500 bg-purple-950/60 text-white ring-1 ring-purple-500";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isAnswerChecked}
                                  onClick={() => setSelectedQuizOption(oIdx)}
                                  className={`rounded-xl border p-3.5 text-xs font-semibold text-left transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswerChecked && isCorrect && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswerChecked && (
                            <div className="rounded-xl bg-slate-900/90 border border-purple-900/40 p-4 space-y-1">
                              <p className="text-xs font-bold text-cyan-300">💡 Hướng dẫn:</p>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {currentQ.explanation}
                              </p>
                            </div>
                          )}

                          <div className="flex justify-end pt-2">
                            {!isAnswerChecked ? (
                              <button
                                disabled={selectedQuizOption === null}
                                onClick={() => handleCheckQuizAnswer(currentQ)}
                                className="rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 px-5 py-2.5 text-xs font-bold text-white transition"
                              >
                                Kiểm tra
                              </button>
                            ) : (
                              <button
                                onClick={() => handleNextQuizQuestion(activeLesson.quiz.length)}
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition"
                              >
                                <span>{quizIndex < activeLesson.quiz.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài học'}</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-8 text-center space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                        <Award className="h-10 w-10" />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Tuyệt vời! Bạn đã vượt qua bài học!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto">
                        Đã cộng <span className="font-bold text-amber-300">+{activeLesson.xpReward} XP</span> vào hồ sơ và cập nhật số sao vinh danh.
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition"
                      >
                        Trở về bản đồ bài học
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
