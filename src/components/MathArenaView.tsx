import React, { useState, useEffect } from 'react';
import { StudentProfile, LeaderboardUser } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Trophy, 
  Flame, 
  Clock, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Crown, 
  Award,
  RefreshCw,
  Users
} from 'lucide-react';

interface MathArenaViewProps {
  profile: StudentProfile;
  onAddXp: (amount: number) => void;
}

const ARENA_QUESTIONS = [
  {
    question: "Giá trị của x thỏa mãn: 2x + 10 = 34 là?",
    options: ["10", "12", "14", "16"],
    correctIndex: 1,
    timeLimit: 12
  },
  {
    question: "Tam giác đều có mỗi góc trong bằng bao nhiêu độ?",
    options: ["45°", "60°", "90°", "120°"],
    correctIndex: 1,
    timeLimit: 10
  },
  {
    question: "Khai triển (x + 2)² ta được biểu thức nào?",
    options: ["x² + 4", "x² + 2x + 4", "x² + 4x + 4", "x² + 4x + 2"],
    correctIndex: 2,
    timeLimit: 12
  },
  {
    question: "Căn bậc hai số học của 81 là:",
    options: ["9", "-9", "±9", "18"],
    correctIndex: 0,
    timeLimit: 10
  },
  {
    question: "Đường tròn có đường kính 10cm thì bán kính là bao nhiêu?",
    options: ["20cm", "10cm", "5cm", "2.5cm"],
    correctIndex: 2,
    timeLimit: 10
  }
];

export const MathArenaView: React.FC<MathArenaViewProps> = ({
  profile,
  onAddXp,
}) => {
  const [arenaMode, setArenaMode] = useState<'selection' | 'battling' | 'result'>('selection');
  const [selectedArenaType, setSelectedArenaType] = useState<'1v1' | 'survival'>('1v1');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const opponent = {
    name: "Lê Bảo Anh",
    school: "THCS Trần Đại Nghĩa",
    grade: "Lớp 8",
    avatar: "🧝‍♀️",
    rating: 1850,
  };

  const currentQ = ARENA_QUESTIONS[currentQIndex];

  // Battle countdown timer
  useEffect(() => {
    if (arenaMode !== 'battling' || isAnswerRevealed) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [arenaMode, timeLeft, isAnswerRevealed]);

  const startBattle = (type: '1v1' | 'survival') => {
    setSelectedArenaType(type);
    setCurrentQIndex(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setTimeLeft(ARENA_QUESTIONS[0].timeLimit);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setArenaMode('battling');
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswerRevealed) return;

    setSelectedOption(optionIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optionIdx === currentQ.correctIndex;
    const gainedPoints = isCorrect ? Math.max(10, timeLeft * 5 + 10) : 0;
    
    // Simulate smart opponent: 75% correct chance
    const opponentCorrect = Math.random() > 0.25;
    const oppGained = opponentCorrect ? Math.floor(Math.random() * 20) + 15 : 0;

    if (isCorrect) {
      setPlayerScore((prev) => prev + gainedPoints);
    }
    setOpponentScore((prev) => prev + oppGained);

    // After 1.5s proceed to next question or finish
    setTimeout(() => {
      if (currentQIndex < ARENA_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setTimeLeft(ARENA_QUESTIONS[currentQIndex + 1].timeLimit);
        setSelectedOption(null);
        setIsAnswerRevealed(false);
      } else {
        setArenaMode('result');
        if (playerScore + gainedPoints >= opponentScore + oppGained) {
          onAddXp(80);
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
          });
        } else {
          onAddXp(30);
        }
      }
    }, 1400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Swords className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Đấu Trường Trí Tuệ Real-time
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-amber-300 font-mono">
            Bậc Vàng • 1820 ELO
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-['Space_Grotesk',sans-serif]">
          Đấu Trường Toán Học THCS
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Thách đấu 1v1 tốc độ cùng các bạn học sinh giỏi toàn quốc hoặc tham gia Đua Tốc Độ Sinh Tồn!
        </p>
      </div>

      {/* MODE SELECTION SCREEN */}
      {arenaMode === 'selection' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: 1v1 Match */}
            <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-950/40 via-[#0F172A] to-slate-900 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/30 text-2xl border border-purple-500/40 shadow">
                    ⚔️
                  </div>
                  <span className="rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-bold">
                    Thưởng +80 XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Đấu Trí 1v1 Thời Gian Thực
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ghép cặp ngẫu nhiên cùng học sinh THCS trên cả nước. Trả lời 5 câu hỏi nhanh, ai chính xác và tốc độ hơn sẽ giành chiến thắng!
                </p>
              </div>

              <div className="pt-4 border-t border-purple-900/30">
                <button
                  id="btn-start-1v1"
                  onClick={() => startBattle('1v1')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Swords className="h-4 w-4" />
                  <span>Tìm đối thủ ngay</span>
                </button>
              </div>
            </div>

            {/* Card 2: Survival Rush */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/30 via-[#0F172A] to-slate-900 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/30 text-2xl border border-amber-500/40 shadow">
                    ⚡
                  </div>
                  <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold">
                    Càng nhanh càng nhiều XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Thử Thách Sinh Tồn 60s
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trả lời liên tục các bài toán tính nhanh. Chuỗi đúng càng dài, điểm combo nhân hệ số x2, x3 càng khủng!
                </p>
              </div>

              <div className="pt-4 border-t border-amber-900/30">
                <button
                  id="btn-start-survival"
                  onClick={() => startBattle('survival')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Zap className="h-4 w-4" />
                  <span>Bắt đầu Sinh Tồn</span>
                </button>
              </div>
            </div>

          </div>

          {/* LEADERBOARD TABLE */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Bảng Xếp Hạng Đấu Sĩ Tuần Này
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Cập nhật liên tục • Top 3 nhận Huy hiệu Thần Toán
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Hạng</th>
                    <th className="py-3 px-3">Học sinh</th>
                    <th className="py-3 px-3">Trường</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3 text-right">Tổng XP</th>
                    <th className="py-3 px-3 text-right">Chuỗi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {LEADERBOARD_USERS.map((user) => (
                    <tr
                      key={user.rank}
                      className={`transition ${
                        user.isCurrentUser
                          ? 'bg-purple-950/40 text-white font-bold ring-1 ring-purple-500/40'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-3 font-bold font-mono">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                        <span>{user.name}</span>
                        {user.isCurrentUser && (
                          <span className="rounded bg-purple-600 px-1.5 py-0.2 text-[9px] text-white">
                            Bạn
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-400">{user.school}</td>
                      <td className="py-3 px-3 text-purple-300 font-medium">{user.grade}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-cyan-300">
                        {user.xp}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-orange-400 font-bold">
                        🔥 {user.streak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE BATTLE SCREEN */}
      {arenaMode === 'battling' && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Scoreboard Bar: Player vs Opponent */}
          <div className="rounded-2xl border border-purple-500/40 bg-[#0F172A] p-4 shadow-xl flex items-center justify-between gap-4">
            
            {/* Player */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/30 text-2xl border border-purple-500/40">
                {profile.avatar}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{profile.name}</p>
                <p className="text-lg font-extrabold text-cyan-300 font-mono">
                  {playerScore} pts
                </p>
              </div>
            </div>

            {/* VS Badge & Timer */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black uppercase text-purple-400 font-mono tracking-widest">
                VS
              </span>
              <div className={`flex items-center gap-1 mt-1 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                timeLeft <= 3 ? 'bg-rose-950 text-rose-300 border border-rose-600 animate-ping' : 'bg-slate-900 text-amber-300 border border-slate-700'
              }`}>
                <Clock className="h-3.5 w-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Opponent */}
            <div className="flex items-center gap-3 flex-row-reverse text-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600/30 text-2xl border border-rose-500/40">
                {opponent.avatar}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{opponent.name}</p>
                <p className="text-lg font-extrabold text-rose-400 font-mono">
                  {opponentScore} pts
                </p>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Câu hỏi {currentQIndex + 1} / {ARENA_QUESTIONS.length}</span>
              <span className="font-mono text-purple-300">
                Trả lời nhanh để ghi điểm tối đa
              </span>
            </div>

            <div className="rounded-xl bg-slate-900/90 border border-purple-900/40 p-5">
              <h3 className="text-base sm:text-lg font-bold text-white text-center">
                {currentQ.question}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnClass = "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-purple-500/60 hover:bg-slate-800/80";

                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnClass = "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-2 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    btnClass = "border-rose-500 bg-rose-950/60 text-rose-200 ring-2 ring-rose-500";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerRevealed}
                    onClick={() => handleAnswer(idx)}
                    className={`rounded-xl border p-4 text-xs sm:text-sm font-bold text-center transition-all flex items-center justify-between ${btnClass}`}
                  >
                    <span className="flex-1 text-center">{opt}</span>
                    {isAnswerRevealed && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerRevealed && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {arenaMode === 'result' && (
        <div className="max-w-md mx-auto rounded-3xl border border-purple-500/40 bg-[#0F172A] p-8 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-4xl shadow-xl shadow-purple-600/40">
            {playerScore >= opponentScore ? '🏆' : '⚔️'}
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              {playerScore >= opponentScore ? 'CHIẾN THẮNG VANG DỘI!' : 'TRẬN ĐẤU SÁT NÚT!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {playerScore >= opponentScore
                ? 'Bạn đã đánh bại đối thủ nhờ tư duy nhạy bén và tốc độ xuất sắc!'
                : 'Đối thủ đã bứt phá ở những giây cuối. Đừng nản lòng, hãy phục thù ngay!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-800">
            <div className="rounded-xl bg-slate-900 p-3">
              <span className="text-[11px] text-slate-400">Điểm của bạn</span>
              <p className="text-xl font-black text-cyan-300 font-mono">{playerScore}</p>
            </div>
            <div className="rounded-xl bg-slate-900 p-3">
              <span className="text-[11px] text-slate-400">Điểm đối thủ</span>
              <p className="text-xl font-black text-rose-400 font-mono">{opponentScore}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => startBattle(selectedArenaType)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg transition"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Tái đấu trận mới</span>
            </button>
            <button
              onClick={() => setArenaMode('selection')}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-300 transition"
            >
              Quay lại sảnh Đấu trường
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
