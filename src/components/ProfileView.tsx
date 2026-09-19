import React, { useState } from 'react';
import { StudentProfile, Badge } from '../types';
import { 
  UserCheck, 
  Award, 
  Flame, 
  Gem, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Target, 
  Sparkles,
  BarChart3,
  Edit3
} from 'lucide-react';

interface ProfileViewProps {
  profile: StudentProfile;
  badges: Badge[];
  onUpdateProfile: (newProfile: Partial<StudentProfile>) => void;
}

const AVATAR_OPTIONS = ['🧑‍🎓', '🧙‍♂️', '🦸‍♀️', '🤖', '🦊', '🦁', '🦉', '🚀'];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  badges,
  onUpdateProfile,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateProfile({ name: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  const handleSelectAvatar = (av: string) => {
    onUpdateProfile({ avatar: av });
  };

  const daysOfWeek = [
    { label: 'T2', active: true },
    { label: 'T3', active: true },
    { label: 'T4', active: true },
    { label: 'T5', active: true },
    { label: 'T6', active: true },
    { label: 'T7', active: true },
    { label: 'CN', active: true, isToday: true },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <UserCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Hồ Sơ Học Tập Cá Nhân
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-['Space_Grotesk',sans-serif]">
          Hồ Sơ Của Em
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Theo dõi thành tích, bộ sưu tập huy hiệu vinh danh và biểu đồ phát triển năng lực toán học.
        </p>
      </div>

      {/* TOP USER HERO CARD */}
      <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-[#14122C] via-[#1E1B4B] to-[#0F172A] p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-4xl shadow-xl ring-4 ring-purple-500/30">
              {profile.avatar}
              <div className="absolute -bottom-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-slate-950 shadow">
                Cấp {profile.level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-purple-500 px-2.5 py-1 text-base font-bold text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="rounded-lg bg-purple-600 px-2 py-1 text-xs font-bold text-white"
                    >
                      Lưu
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {profile.name}
                    </h3>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-slate-400 hover:text-white transition"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <span className="rounded-full bg-purple-950 border border-purple-500/40 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
                  {profile.grade}
                </span>
              </div>
              <p className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                {profile.title}
              </p>
              <p className="text-[11px] text-slate-400">
                Thành viên tích cực Toán Diệu Kỳ từ tháng 09/2026
              </p>
            </div>
          </div>

          {/* Avatar picker strip */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Chọn linh vật đại diện:</span>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  onClick={() => handleSelectAvatar(av)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition ${
                    profile.avatar === av
                      ? 'bg-purple-600 ring-2 ring-purple-400 scale-110'
                      : 'bg-slate-800/80 hover:bg-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 STATS COUNTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-purple-900/40">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
              <Flame className="h-4 w-4" />
              <span className="text-xs font-bold">Chuỗi học</span>
            </div>
            <p className="text-xl font-extrabold text-white font-mono">{profile.streakDays} ngày</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-bold">Tổng XP</span>
            </div>
            <p className="text-xl font-extrabold text-white font-mono">{profile.xp}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
              <Gem className="h-4 w-4" />
              <span className="text-xs font-bold">Ngọc Toán</span>
            </div>
            <p className="text-xl font-extrabold text-white font-mono">{profile.gems}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
              <Award className="h-4 w-4" />
              <span className="text-xs font-bold">Thắng đấu trường</span>
            </div>
            <p className="text-xl font-extrabold text-white font-mono">{profile.arenaWins} trận</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: BADGES SHOWCASE & STREAK CALENDAR */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* BADGES SHOWCASE */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Tủ Huy Hiệu Vinh Danh
                </h3>
              </div>
              <span className="text-xs text-amber-300 font-bold bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                {badges.filter((b) => b.unlocked).length} / {badges.length} Mở khóa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`rounded-2xl border p-4 flex items-start gap-3 transition ${
                    b.unlocked
                      ? 'border-purple-500/40 bg-gradient-to-br from-purple-950/30 to-slate-900'
                      : 'border-slate-800 bg-slate-950/40 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-purple-500/20 text-2xl shadow">
                    {b.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{b.name}</h4>
                      {b.unlocked && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {b.description}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {b.unlocked ? `Đạt được: ${b.unlockedAt}` : 'Chưa đạt điều kiện'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-DAY STREAK CALENDAR */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">
                  Lịch Chuyên Cần 7 Ngày
                </h3>
              </div>
              <span className="text-xs text-orange-400 font-bold">
                🔥 Giữ lửa liên tục
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {daysOfWeek.map((day, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-3 flex flex-col items-center justify-between gap-2 ${
                    day.isToday
                      ? 'border-orange-500 bg-orange-950/40 ring-1 ring-orange-500'
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-400">{day.label}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <Flame className="h-4 w-4 fill-orange-500" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Đạt</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MATH SKILL RADAR / PROFICIENCY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Năng Lực Toán Học
              </h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Đại số & Biến đổi biểu thức</span>
                  <span className="text-purple-300 font-mono font-bold">95%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Hình học & Chứng minh</span>
                  <span className="text-cyan-300 font-mono font-bold">82%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-500" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tư duy logic & Thực tế</span>
                  <span className="text-emerald-400 font-mono font-bold">88%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tốc độ tính nhẩm phản xạ</span>
                  <span className="text-amber-400 font-mono font-bold">90%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            {/* Daily Goal Settings */}
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 pt-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mục tiêu luyện tập hàng ngày
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[30, 50, 100].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => onUpdateProfile({ dailyGoalXp: goal })}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      profile.dailyGoalXp === goal
                        ? 'border-purple-500 bg-purple-950/60 text-white ring-1 ring-purple-500'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {goal} XP / ngày
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
