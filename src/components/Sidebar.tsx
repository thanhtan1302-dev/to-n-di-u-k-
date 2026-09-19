import React from 'react';
import { NavigationTab } from '../types';
import { 
  Home, 
  GraduationCap, 
  Bot, 
  Swords, 
  UserCheck, 
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unlockedBadgeCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unlockedBadgeCount,
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 'lessons',
      label: 'Bài học',
      icon: <GraduationCap className="h-5 w-5" />,
      badge: 'Bản đồ',
    },
    {
      id: 'ai-solver',
      label: 'Góc giải toán AI',
      icon: <Bot className="h-5 w-5" />,
      badge: 'Gemini',
    },
    {
      id: 'arena',
      label: 'Đấu trường Toán học',
      icon: <Swords className="h-5 w-5" />,
      badge: '1v1',
    },
    {
      id: 'profile',
      label: 'Hồ sơ của em',
      icon: <UserCheck className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800/80 bg-[#0B1120] p-4 shrink-0 min-h-[calc(100vh-61px)]">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-lg shadow-purple-900/40 ring-1 ring-purple-400/40'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-white' : 'text-purple-400 group-hover:text-purple-300'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.id === 'ai-solver'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                        : 'bg-purple-950 text-purple-300 border border-purple-800/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Gamified Motivation Card */}
        <div className="mt-8 rounded-2xl border border-purple-900/50 bg-gradient-to-b from-purple-950/40 to-slate-900/90 p-4 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-purple-600/10 blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Vương Quốc Toán Học
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mỗi bài toán giải đúng là một bước mở khóa vũ trụ tri thức. Hôm nay bạn đã sẵn sàng chinh phục đỉnh cao chưa?
          </p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-purple-900/30">
            <span className="text-[11px] text-slate-400">Huy hiệu đạt được</span>
            <div className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{unlockedBadgeCount}/7</span>
            </div>
          </div>
        </div>

        {/* Architecture & Specs Link */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => onSelectTab('design-specs')}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
              currentTab === 'design-specs'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Tài liệu: Wireframe & Luồng</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-[#0B1120]/95 backdrop-blur-lg px-2 py-1.5">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`relative flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-all ${
                  isActive ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-600/20 text-purple-300' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] whitespace-nowrap">{item.label}</span>
                {isActive && (
                  <span className="h-1 w-4 rounded-full bg-purple-500 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
