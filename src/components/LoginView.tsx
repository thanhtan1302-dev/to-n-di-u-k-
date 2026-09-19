import React, { useMemo, useState } from 'react';
import { BookOpen, GraduationCap, Sparkles, UserRound, ArrowRight } from 'lucide-react';
import { GradeLevel, StudentProfile } from '../types';

interface LoginViewProps {
  savedStudents: StudentProfile[];
  onLogin: (payload: { name: string; grade: GradeLevel }) => void;
}

const gradeOptions: GradeLevel[] = ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'];

export const LoginView: React.FC<LoginViewProps> = ({ savedStudents, onLogin }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Lớp 8');

  const recentStudents = useMemo(
    () => savedStudents.slice(0, 4),
    [savedStudents]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onLogin({ name: trimmedName, grade });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,#0b1120_0%,#111827_35%,#0f172a_100%)] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-purple-500/30 bg-slate-900/60 p-6 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Toán Diệu Kỳ</p>
              <h1 className="text-3xl font-black text-white">Nền tảng học toán THCS</h1>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
              <GraduationCap className="h-8 w-8 text-cyan-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Phần mềm học tập</p>
                <p className="text-lg font-bold text-white">Bài học, AI giải toán, phân tích học lực</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chương trình</p>
                <p className="mt-2 text-xl font-bold text-white">6-9</p>
                <p className="text-sm text-slate-300">Khối THCS</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI hỗ trợ</p>
                <p className="mt-2 text-xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-300">Gợi ý, giải bước</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Phân tích</p>
                <p className="mt-2 text-xl font-bold text-white">7 ngày</p>
                <p className="text-sm text-slate-300">Kế hoạch học</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-purple-500/30 bg-[#0f172a]/80 p-6 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500">
              <UserRound className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300">Đăng nhập</p>
              <h2 className="text-2xl font-black text-white">Chào học sinh</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Tên học sinh</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ví dụ: Minh Khôi"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Khối học</label>
              <div className="grid grid-cols-2 gap-2">
                {gradeOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGrade(item)}
                    className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                      grade === item
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:scale-[1.01]"
            >
              <span>Vào học ngay</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {recentStudents.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <BookOpen className="h-4 w-4 text-cyan-300" />
                Tài khoản gần đây
              </div>
              <div className="space-y-2">
                {recentStudents.map((student) => (
                  <button
                    key={`${student.name}-${student.grade}`}
                    type="button"
                    onClick={() => onLogin({ name: student.name, grade: student.grade })}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 text-left transition hover:border-purple-500/50 hover:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-lg">
                        {student.avatar}
                      </span>
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.grade} • Lv.{student.level}</p>
                      </div>
                    </div>
                    <span className="text-xs text-cyan-300">Đăng nhập</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
