import React from 'react';
import { StudentProfile, GradeLevel } from '../types';
import { Sparkles, Flame, Gem, Heart, BookOpen, Layers, LogOut } from 'lucide-react';

interface NavbarProps {
  profile: StudentProfile;
  selectedGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  onOpenDesignSpecs: () => void;
  onLogout: () => void;
  isGradeLocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  selectedGrade,
  onGradeChange,
  onOpenDesignSpecs,
  onLogout,
  isGradeLocked = false,
}) => {
  const xpPercent = Math.min(100, Math.round((profile.todayEarnedXp / profile.dailyGoalXp) * 100));

  return (
    <header className="sticky top-0 z-30 w-full border-b border-purple-900/40 bg-[#0B1120]/90 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/30">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent font-['Space_Grotesk',sans-serif]">
                Toán Diệu Kỳ
              </h1>
              <span className="rounded-full bg-purple-950/80 border border-purple-500/40 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
                THCS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Nền tảng Toán học Gamified & Trợ lý AI
            </p>
          </div>
        </div>

        {/* Grade Selector */}
        <div className={`flex items-center gap-1.5 rounded-xl border p-1 ${isGradeLocked ? 'border-slate-700 bg-slate-800/50 opacity-70' : 'border-slate-800 bg-slate-900/80'}`}>
          <BookOpen className="ml-1 hidden h-3.5 w-3.5 text-purple-400 md:block" />
          {(['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'] as GradeLevel[]).map((g) => (
            <button
              key={g}
              id={`grade-btn-${g.replace(/\s+/g, '').toLowerCase()}`}
              disabled={isGradeLocked}
              onClick={() => onGradeChange(g)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedGrade === g
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              } ${isGradeLocked ? 'cursor-not-allowed' : ''}`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Gamification Stats: Streak, Gems, Hearts, XP */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div 
            title={`Chuỗi ${profile.streakDays} ngày học liên tiếp`}
            className="flex items-center gap-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 px-2.5 py-1.5 text-orange-400 shadow-sm"
          >
            <Flame className="h-4 w-4 text-orange-500 animate-bounce" />
            <span className="text-xs font-bold text-orange-300 font-mono">
              {profile.streakDays}
            </span>
            <span className="text-[10px] text-orange-400/80 hidden lg:inline">ngày</span>
          </div>

          {/* Gems */}
          <div 
            title={`${profile.gems} Ngọc Toán Học`}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1.5 text-cyan-400 shadow-sm"
          >
            <Gem className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 font-mono">
              {profile.gems}
            </span>
          </div>

          {/* Hearts */}
          <div 
            title={`${profile.hearts}/${profile.maxHearts} Năng lượng sinh lực`}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 px-2.5 py-1.5 text-rose-400 shadow-sm"
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span className="text-xs font-bold text-rose-300 font-mono">
              {profile.hearts}
            </span>
          </div>

          {/* Daily XP Mini Progress */}
          <div 
            title={`Mục tiêu ngày: ${profile.todayEarnedXp}/${profile.dailyGoalXp} XP`}
            className="hidden xl:flex flex-col gap-1 w-24"
          >
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Mục tiêu ngày</span>
              <span className="text-purple-300 font-mono">{xpPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Design Specs & Architecture Docs button */}
          <button
            id="btn-open-design-specs"
            onClick={onOpenDesignSpecs}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-900/50 hover:bg-indigo-800/70 border border-indigo-500/40 px-2.5 py-1.5 text-xs font-semibold text-indigo-200 transition shadow-sm"
            title="Xem Wireframe, Luồng chức năng & Danh sách Component"
          >
            <Layers className="h-3.5 w-3.5 text-cyan-300" />
            <span className="hidden md:inline">Hồ sơ thiết kế EdTech</span>
            <span className="md:hidden">Hồ sơ</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-950/40 px-2.5 py-1.5 text-xs font-semibold text-rose-200 transition hover:border-rose-400/60 hover:bg-rose-900/60"
            title="Đăng xuất"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
};
