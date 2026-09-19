import React from 'react';
import { LogOut, GraduationCap, TrendingUp, AlertTriangle, School, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface TeacherDashboardProps {
  students: StudentProfile[];
  onLogout: () => void;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Xuất sắc':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Giỏi':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    case 'Khá':
      return 'bg-violet-500/15 text-violet-300 border-violet-500/30';
    case 'Trung bình':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    default:
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }
};

const getTrendColor = (trend: string) => {
  if (trend === 'Tăng') return 'text-emerald-300';
  if (trend === 'Ổn định') return 'text-cyan-300';
  return 'text-rose-300';
};

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ students, onLogout }) => {
  const totalStudents = students.length;
  const averageScore = students.length
    ? Math.round(students.reduce((sum, student) => sum + (student.totalScore ?? 0), 0) / students.length)
    : 0;
  const excellentStudents = students.filter((student) => student.academicLevel === 'Xuất sắc' || student.academicLevel === 'Giỏi').length;
  const supportStudents = students.filter((student) => (student.weakTopics?.length ?? 0) > 0).length;

  return (
    <div className="min-h-screen bg-[#0B1120] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Bảng điều khiển giáo viên</p>
                <h1 className="text-3xl font-black text-white">Theo dõi học lực toàn trường</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-rose-400/60 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Tổng học sinh</p>
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
            <p className="mt-4 text-3xl font-black text-white">{totalStudents}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Điểm trung bình</p>
              <TrendingUp className="h-5 w-5 text-emerald-300" />
            </div>
            <p className="mt-4 text-3xl font-black text-white">{averageScore}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Cần hỗ trợ</p>
              <AlertTriangle className="h-5 w-5 text-amber-300" />
            </div>
            <p className="mt-4 text-3xl font-black text-white">{supportStudents}</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/20">
          <div className="mb-4 flex items-center gap-2 px-2">
            <School className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-bold text-white">Danh sách học sinh</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-300">
                  <th className="px-3 py-3 font-semibold">Học sinh</th>
                  <th className="px-3 py-3 font-semibold">Lớp</th>
                  <th className="px-3 py-3 font-semibold">Trường</th>
                  <th className="px-3 py-3 font-semibold">Số điểm</th>
                  <th className="px-3 py-3 font-semibold">Học lực</th>
                  <th className="px-3 py-3 font-semibold">Xu hướng</th>
                  <th className="px-3 py-3 font-semibold">Yếu nội dung</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={`${student.name}-${student.grade}`} className="border-b border-slate-800 text-slate-200">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-base font-bold text-white">
                          {student.avatar || student.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{student.name}</p>
                          <p className="text-xs text-slate-400">{student.title || 'Học sinh'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">{student.grade}</td>
                    <td className="px-3 py-4">{student.school || 'Chưa cập nhật'}</td>
                    <td className="px-3 py-4 font-bold text-cyan-300">{student.totalScore ?? student.xp}</td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getLevelColor(student.academicLevel || 'Khá')}`}>
                        {student.academicLevel || 'Khá'}
                      </span>
                    </td>
                    <td className={`px-3 py-4 font-semibold ${getTrendColor(student.learningTrend || 'Ổn định')}`}>
                      {student.learningTrend || 'Ổn định'}
                    </td>
                    <td className="px-3 py-4">
                      {(student.weakTopics && student.weakTopics.length > 0)
                        ? student.weakTopics.join(', ')
                        : 'Không đáng kể'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[24px] border border-slate-700 bg-slate-900/80 p-5">
            <h3 className="text-lg font-bold text-white">Nhận xét nhanh</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>• {excellentStudents} học sinh đang ở mức học lực tốt hoặc xuất sắc.</p>
              <p>• Cần chú ý vào các nội dung như số học, hình học và phân tích dữ liệu.</p>
              <p>• Khuyến nghị tập trung vào kỹ năng làm bài theo từng bước để cải thiện độ chính xác.</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-700 bg-slate-900/80 p-5">
            <h3 className="text-lg font-bold text-white">Xu hướng học tập</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {['Tăng', 'Ổn định', 'Giảm'].map((trend) => {
                const count = students.filter((student) => (student.learningTrend || 'Ổn định') === trend).length;
                return (
                  <div key={trend} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2">
                    <span>{trend}</span>
                    <span className="font-bold text-white">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
