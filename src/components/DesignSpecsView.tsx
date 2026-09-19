import React, { useState } from 'react';
import { 
  Layers, 
  GitBranch, 
  Palette, 
  Layout, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DesignSpecsViewProps {
  onBackToApp: () => void;
}

export const DesignSpecsView: React.FC<DesignSpecsViewProps> = ({ onBackToApp }) => {
  const [activeTab, setActiveTab] = useState<'wireframe' | 'userflow' | 'components'>('wireframe');

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold">
              Tài Liệu Sản Phẩm EdTech
            </span>
            <span className="text-xs text-purple-300 font-mono">
              Product Design & Architecture Specification
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-['Space_Grotesk',sans-serif]">
            Hồ Sơ Thiết Kế Sản Phẩm: Toán Diệu Kỳ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Wireframe cấu trúc, Sơ đồ luồng chức năng và Thư viện Component giao diện (Design System).
          </p>
        </div>

        <button
          onClick={onBackToApp}
          className="self-start sm:self-auto flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-bold text-white transition shadow-md"
        >
          <span>← Quay lại ứng dụng</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 rounded-xl p-1 gap-1 max-w-xl">
        <button
          onClick={() => setActiveTab('wireframe')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition ${
            activeTab === 'wireframe'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layout className="h-4 w-4" />
          <span>1. Wireframe Bố Cục</span>
        </button>
        <button
          onClick={() => setActiveTab('userflow')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition ${
            activeTab === 'userflow'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GitBranch className="h-4 w-4" />
          <span>2. Luồng Chức Năng</span>
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition ${
            activeTab === 'components'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="h-4 w-4" />
          <span>3. Danh Sách Component</span>
        </button>
      </div>

      {/* TAB 1: WIREFRAME */}
      {activeTab === 'wireframe' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Monitor className="h-5 w-5 text-purple-400" />
                Kiến Trúc Bố Cục Desktop & Mobile (Wireframe)
              </h3>
              <span className="text-xs text-slate-400">
                Responsive 12-Column Grid • Tông Xanh Đậm & Tím
              </span>
            </div>

            {/* Wireframe Visual Blueprint */}
            <div className="rounded-2xl border-2 border-dashed border-purple-500/40 bg-slate-950 p-6 space-y-4 font-mono text-xs">
              
              {/* Header Wireframe */}
              <div className="rounded-xl border border-purple-600/40 bg-purple-950/30 p-3 flex items-center justify-between text-purple-200">
                <div className="flex items-center gap-2 font-bold">
                  <span>[LOGO] Toán Diệu Kỳ</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-400">[Bộ chọn Lớp: 6 - 7 - 8 - 9]</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span>🔥 Chuỗi ngày</span>
                  <span>💎 Ngọc toán</span>
                  <span>❤️ Sinh lực</span>
                  <span>⚡ Cấp độ & XP</span>
                </div>
              </div>

              {/* Body layout */}
              <div className="grid grid-cols-12 gap-4">
                
                {/* Sidebar */}
                <div className="col-span-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-slate-400 hidden md:block">
                  <p className="font-bold text-purple-300 mb-2">[SIDEBAR NAV]</p>
                  <div className="p-2 rounded bg-purple-900/40 text-purple-200 border border-purple-500/30">1. Trang chủ</div>
                  <div className="p-2 rounded bg-slate-800/40">2. Bài học (Cây kỹ năng)</div>
                  <div className="p-2 rounded bg-slate-800/40">3. Góc giải toán AI</div>
                  <div className="p-2 rounded bg-slate-800/40">4. Đấu trường Toán học</div>
                  <div className="p-2 rounded bg-slate-800/40">5. Hồ sơ của em</div>
                  <div className="mt-4 p-3 rounded-xl border border-purple-800/40 bg-purple-950/20 text-[10px] text-purple-300">
                    Gamification Badge Box
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-12 md:col-span-9 space-y-4">
                  {/* Hero Greeting Wireframe */}
                  <div className="rounded-xl border border-purple-500/30 bg-purple-950/40 p-4 flex items-center justify-between text-slate-200">
                    <div>
                      <p className="font-bold text-white">[HERO GREETING BANNER]</p>
                      <p className="text-[11px] text-slate-400">Lời chào cá nhân hóa + Avatar Cấp độ + Lời động viên chuỗi Streak</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded bg-purple-600 px-3 py-1 text-white font-sans">[Nút: Vào bài học tiếp]</span>
                      <span className="rounded bg-slate-800 px-3 py-1 text-purple-300 font-sans">[Nút: Hỏi Thầy AI]</span>
                    </div>
                  </div>

                  {/* 2-Column content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-3">
                      <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-3">
                        <p className="font-bold text-cyan-300">[AI RECOMMENDATION CARD]</p>
                        <p className="text-[11px] text-slate-400">Đề xuất bài học theo điểm yếu của học sinh</p>
                      </div>
                      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-3">
                        <p className="font-bold text-amber-300">[QUICK CHALLENGE QUIZ]</p>
                        <p className="text-[11px] text-slate-400">3 câu hỏi phản xạ tính nhẩm + Chấm điểm và cộng XP ngay</p>
                      </div>
                      <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-3">
                        <p className="font-bold text-purple-300">[DAILY MATH HACK]</p>
                        <p className="text-[11px] text-slate-400">Mẹo tính nhẩm Vedic & ảo thuật số học có ví dụ trực quan</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                        <p className="font-bold text-purple-300">[TIẾN ĐỘ HỌC TẬP]</p>
                        <p className="text-[11px] text-slate-400">Vòng tròn mục tiêu ngày + Thanh cấp độ Level XP</p>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                        <p className="font-bold text-amber-300">[TỦ HUY HIỆU MINI]</p>
                        <p className="text-[11px] text-slate-400">Huy hiệu đạt được & tiến trình mở khóa</p>
                      </div>
                      <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-3">
                        <p className="font-bold text-indigo-300">[ARENA CALLOUT]</p>
                        <p className="text-[11px] text-slate-400">Nút vào Đấu trường 1v1</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Mobile bottom bar representation */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-center text-slate-400 md:hidden">
                [MOBILE BOTTOM NAVIGATION BAR: Trang chủ • Bài học • Trợ lý AI • Đấu trường • Hồ sơ]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER FLOW */}
      {activeTab === 'userflow' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-purple-400" />
              Sơ Đồ Luồng Trải Nghiệm Học Sinh (User Flow Diagram)
            </h3>

            <div className="space-y-4">
              
              {/* Flow Step 1 */}
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white font-mono">1</span>
                  <span>Đăng nhập / Vào Dashboard Trang chủ</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  Hệ thống kiểm tra chuỗi học liên tiếp (Streak 🔥). Hiển thị lời chào theo thời gian, điểm danh nhận năng lượng sinh lực và hiển thị bài học được AI đề xuất riêng.
                </p>
              </div>

              {/* Flow Step 2 */}
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white font-mono">2</span>
                  <span>Khám phá Cây Kỹ Năng (Bài Học theo bản đồ)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  Học sinh chọn Lớp (6, 7, 8, 9) và Môn (Đại số / Hình học). Bấm vào từng chặng học:
                  <br />• <strong>Bước 2.1:</strong> Đọc lý thuyết then chốt & công thức đóng khung.
                  <br />• <strong>Bước 2.2:</strong> Xem ví dụ mẫu trực quan.
                  <br />• <strong>Bước 2.3:</strong> Làm bài tập thực hành trắc nghiệm, nhận sao (1-3 sao) và tích lũy XP.
                </p>
              </div>

              {/* Flow Step 3 */}
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white font-mono">3</span>
                  <span>Gặp bài toán khó? Chuyển sang "Góc Giải Toán AI"</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  Học sinh gõ đề bài hoặc tải ảnh chụp từ SGK. Chọn chế độ:
                  <br />• <strong>Chế độ Socratic:</strong> Thầy AI đặt câu hỏi gợi mở, hướng dẫn tư duy từng bước.
                  <br />• <strong>Chế độ Giải chi tiết:</strong> Phân tích dạng toán, nêu công thức, giải từng bước và đưa bài tập tương tự.
                </p>
              </div>

              {/* Flow Step 4 */}
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white font-mono">4</span>
                  <span>Đấu Trường Toán Học & Tăng Hạng</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  Tham gia đấu 1v1 hoặc Đua Sinh Tồn 60s. Chiến thắng tích lũy điểm ELO, leo Bảng Xếp Hạng toàn quốc và nhận thưởng Ngọc Toán Học 💎.
                </p>
              </div>

              {/* Flow Step 5 */}
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-slate-950 font-mono">5</span>
                  <span>Vào Hồ Sơ Của Em & Mở Khóa Huy Hiệu</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  Đổi linh vật avatar, theo dõi biểu đồ 4 nhóm năng lực toán học (Đại số, Hình học, Thực tế, Tính nhẩm), cài đặt mục tiêu ngày và vinh danh huy hiệu đạt được.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPONENTS SPEC */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-400" />
              Thư Viện Component Giao Diện (Design System Specs)
            </h3>

            {/* Design Tokens: Color Palette */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Bảng Mã Màu Chủ Đạo (Theme Tokens)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="rounded-xl border border-slate-800 bg-[#0B1120] p-3 text-slate-200">
                  <div className="h-8 rounded-lg bg-[#0B1120] border border-slate-700 mb-2" />
                  <p className="font-bold">Dark Navy Canvas</p>
                  <p className="text-slate-400 text-[11px]">#0B1120</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-200">
                  <div className="h-8 rounded-lg bg-[#0F172A] border border-slate-700 mb-2" />
                  <p className="font-bold">Deep Slate Card</p>
                  <p className="text-slate-400 text-[11px]">#0F172A</p>
                </div>
                <div className="rounded-xl border border-purple-500/40 bg-purple-950/40 p-3 text-purple-200">
                  <div className="h-8 rounded-lg bg-[#7C3AED] mb-2" />
                  <p className="font-bold">Royal Violet Accent</p>
                  <p className="text-purple-400 text-[11px]">#7C3AED</p>
                </div>
                <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/40 p-3 text-cyan-200">
                  <div className="h-8 rounded-lg bg-[#06B6D4] mb-2" />
                  <p className="font-bold">Cyan Magic Glow</p>
                  <p className="text-cyan-400 text-[11px]">#06B6D4</p>
                </div>
              </div>
            </div>

            {/* Component List Table */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Danh Sách Component Giao Diện Chi Tiết
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Tên Component</th>
                      <th className="py-2.5 px-3">Module Sử Dụng</th>
                      <th className="py-2.5 px-3">Chức Năng & Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">Navbar / Header</td>
                      <td className="py-2.5 px-3 text-purple-300">Toàn hệ thống</td>
                      <td className="py-2.5 px-3 text-slate-400">Logo, chuyển lớp, Streak 🔥, Gems 💎, Hearts ❤️, XP daily ring</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">Sidebar & BottomNav</td>
                      <td className="py-2.5 px-3 text-purple-300">Điều hướng chính</td>
                      <td className="py-2.5 px-3 text-slate-400">5 tabs chính, hỗ trợ responsive desktop sidebar & mobile bottom bar</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">HeroGreetingCard</td>
                      <td className="py-2.5 px-3 text-purple-300">Trang chủ</td>
                      <td className="py-2.5 px-3 text-slate-400">Lời chào linh hoạt theo buổi trong ngày, avatar cấp độ, nút học nhanh</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">AiRecommendationCard</td>
                      <td className="py-2.5 px-3 text-purple-300">Trang chủ</td>
                      <td className="py-2.5 px-3 text-slate-400">Gợi ý bài học cá nhân hóa theo điểm yếu với nút Vào học ngay</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">QuickQuizBlitz</td>
                      <td className="py-2.5 px-3 text-purple-300">Trang chủ</td>
                      <td className="py-2.5 px-3 text-slate-400">Trắc nghiệm nhanh 3 câu, phản hồi màu sắc đúng/sai, thưởng confetti</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">DailyMathHackCard</td>
                      <td className="py-2.5 px-3 text-purple-300">Trang chủ</td>
                      <td className="py-2.5 px-3 text-slate-400">Thẻ mẹo tính nhẩm, mở rộng lời giải thích tại sao đúng</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">SkillTreeNode</td>
                      <td className="py-2.5 px-3 text-purple-300">Bài học</td>
                      <td className="py-2.5 px-3 text-slate-400">Node kỹ năng tròn có đường nối uốn lượn, sao đánh giá (0-3 sao), khóa</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">InteractiveLessonModal</td>
                      <td className="py-2.5 px-3 text-purple-300">Bài học</td>
                      <td className="py-2.5 px-3 text-slate-400">3 tabs: Lý thuyết cốt lõi, Ví dụ trực quan, Luyện tập tính điểm</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">AiMathSolverEngine</td>
                      <td className="py-2.5 px-3 text-purple-300">Góc giải toán AI</td>
                      <td className="py-2.5 px-3 text-slate-400">Bàn phím ký hiệu toán, tải ảnh SGK, chế độ Socratic vs Full solve</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">ArenaBattleCard</td>
                      <td className="py-2.5 px-3 text-purple-300">Đấu trường</td>
                      <td className="py-2.5 px-3 text-slate-400">Đồng hồ đếm ngược 12s, so sánh điểm số trực tiếp, màn hình vinh danh</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">BadgeShowcaseGrid</td>
                      <td className="py-2.5 px-3 text-purple-300">Hồ sơ của em</td>
                      <td className="py-2.5 px-3 text-slate-400">Lưới hiển thị huy hiệu đã mở khóa và điều kiện mở khóa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
