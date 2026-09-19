import React, { useEffect, useMemo, useState } from 'react';
import { 
  NavigationTab, 
  GradeLevel, 
  StudentProfile, 
  LessonUnit, 
  Badge 
} from './types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_BADGES, 
  LESSON_UNITS, 
  DAILY_MATH_HACKS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeDashboard } from './components/HomeDashboard';
import { LessonsView } from './components/LessonsView';
import { AiSolverView } from './components/AiSolverView';
import { MathArenaView } from './components/MathArenaView';
import { ProfileView } from './components/ProfileView';
import { DesignSpecsView } from './components/DesignSpecsView';
import { LoginView } from './components/LoginView';
import { TeacherDashboard } from './components/TeacherDashboard';
import confetti from 'canvas-confetti';

const STUDENT_STORAGE_KEY = 'toan-dieu-ky-students';
const LAST_STUDENT_KEY = 'toan-dieu-ky-last-student';
const LAST_SESSION_KEY = 'toan-dieu-ky-last-session';

const DEFAULT_TEACHER_PROFILE: StudentProfile = {
  ...INITIAL_STUDENT_PROFILE,
  name: 'Giáo viên',
  avatar: 'G',
  title: 'Giáo viên Toán',
  grade: 'Lớp 8',
  role: 'teacher',
  school: 'Trường THCS Tân Bình',
};

const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    ...INITIAL_STUDENT_PROFILE,
    name: 'Nguyễn Minh An',
    avatar: 'A',
    grade: 'Lớp 6',
    school: 'Trường THCS Tân Bình',
    totalScore: 92,
    academicLevel: 'Giỏi',
    learningTrend: 'Tăng',
    weakTopics: ['Hình học không gian'],
    role: 'student',
  },
  {
    ...INITIAL_STUDENT_PROFILE,
    name: 'Trần Huyền My',
    avatar: 'M',
    grade: 'Lớp 7',
    school: 'Trường THCS Tân Bình',
    totalScore: 88,
    academicLevel: 'Khá',
    learningTrend: 'Ổn định',
    weakTopics: ['Phân thức đại số'],
    role: 'student',
  },
  {
    ...INITIAL_STUDENT_PROFILE,
    name: 'Phạm Quốc Đạt',
    avatar: 'D',
    grade: 'Lớp 8',
    school: 'Trường THCS Tân Bình',
    totalScore: 97,
    academicLevel: 'Xuất sắc',
    learningTrend: 'Tăng',
    weakTopics: ['Không đáng kể'],
    role: 'student',
  },
  {
    ...INITIAL_STUDENT_PROFILE,
    name: 'Lê Thảo Nhi',
    avatar: 'N',
    grade: 'Lớp 9',
    school: 'Trường THCS Tân Bình',
    totalScore: 81,
    academicLevel: 'Khá',
    learningTrend: 'Ổn định',
    weakTopics: ['Hàm số và đồ thị'],
    role: 'student',
  },
];

const buildStudentProfile = (name: string, grade: GradeLevel): StudentProfile => ({
  ...INITIAL_STUDENT_PROFILE,
  name,
  grade,
  avatar: name.trim().length ? name.trim().charAt(0).toUpperCase() : 'S',
  title: grade === 'Lớp 6' ? 'Tân Học Sinh' : grade === 'Lớp 7' ? 'Người Học Đại Số' : grade === 'Lớp 9' ? 'Nhà Lý Thuyết Toán' : 'Phù Thủy Đại Số Tập Sự',
  streakDays: Math.max(1, INITIAL_STUDENT_PROFILE.streakDays),
  school: 'Trường THCS Tân Bình',
  totalScore: 85,
  academicLevel: 'Khá',
  learningTrend: 'Ổn định',
  weakTopics: ['Ôn tập định kỳ'],
  role: 'student',
});

const readStoredStudents = (): StudentProfile[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STUDENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudentProfile[]) : [];
  } catch {
    return [];
  }
};

const persistStudents = (students: StudentProfile[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(students));
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Lớp 8');
  const [storedStudents, setStoredStudents] = useState<StudentProfile[]>(() => readStoredStudents().length ? readStoredStudents() : DEFAULT_STUDENTS);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const lastSession = window.localStorage.getItem(LAST_SESSION_KEY);
    return !!lastSession;
  });
  const [userRole, setUserRole] = useState<'student' | 'teacher'>(() => {
    if (typeof window === 'undefined') return 'student';
    const lastSession = window.localStorage.getItem(LAST_SESSION_KEY);
    if (!lastSession) return 'student';
    try {
      const parsed = JSON.parse(lastSession) as { role?: 'student' | 'teacher' };
      return parsed.role === 'teacher' ? 'teacher' : 'student';
    } catch {
      return 'student';
    }
  });
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window === 'undefined') return INITIAL_STUDENT_PROFILE;
    const lastStudent = window.localStorage.getItem(LAST_STUDENT_KEY);
    if (!lastStudent) return INITIAL_STUDENT_PROFILE;
    try {
      return JSON.parse(lastStudent) as StudentProfile;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [lessons, setLessons] = useState<LessonUnit[]>(LESSON_UNITS);

  useEffect(() => {
    if (isLoggedIn && userRole === 'student' && typeof window !== 'undefined') {
      window.localStorage.setItem(LAST_STUDENT_KEY, JSON.stringify(profile));
      window.localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ role: 'student', profile }));
    }
  }, [isLoggedIn, userRole, profile]);

  const handleStudentLogin = ({ name, grade }: { name: string; grade: GradeLevel }) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const saved = readStoredStudents();
    const existingStudent = saved.find((item) => item.name.toLowerCase() === trimmedName.toLowerCase() && item.grade === grade);
    const nextStudent = existingStudent
      ? { ...existingStudent, grade }
      : buildStudentProfile(trimmedName, grade);

    const nextSavedStudents = [nextStudent, ...saved.filter((item) => !(item.name.toLowerCase() === trimmedName.toLowerCase() && item.grade === grade))].slice(0, 6);
    persistStudents(nextSavedStudents);
    setStoredStudents(nextSavedStudents);
    setProfile(nextStudent);
    setSelectedGrade(grade);
    setCurrentTab('home');
    setUserRole('student');
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LAST_STUDENT_KEY, JSON.stringify(nextStudent));
      window.localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ role: 'student', profile: nextStudent }));
    }
  };

  const handleTeacherLogin = ({ username, password }: { username: string; password: string }) => {
    const normalizedUsername = username.trim().toLowerCase();
    if (normalizedUsername !== 'giaovien' || password !== '123456') return;

    const teacher = { ...DEFAULT_TEACHER_PROFILE, role: 'teacher' as const };
    setProfile(teacher);
    setUserRole('teacher');
    setCurrentTab('home');
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ role: 'teacher', profile: teacher }));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('student');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LAST_STUDENT_KEY);
      window.localStorage.removeItem(LAST_SESSION_KEY);
    }
  };

  // Add XP with level up calculations and gamification rewards
  const handleAddXp = (amount: number) => {
    setProfile((prev) => {
      const newXp = prev.xp + amount;
      const newTodayXp = prev.todayEarnedXp + amount;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newNextXp += 1000;
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 }
        });
      }

      return {
        ...prev,
        xp: newXp,
        todayEarnedXp: newTodayXp,
        level: newLevel,
        nextLevelXp: newNextXp,
      };
    });
  };

  // Complete a lesson unit
  const handleCompleteLesson = (lessonId: string, earnedStars: number, earnedXp: number) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, isCompleted: true, stars: Math.max(l.stars, earnedStars) } : l))
    );
    handleAddXp(earnedXp);
    setProfile((prev) => ({
      ...prev,
      completedLessonsCount: prev.completedLessonsCount + 1,
      gems: prev.gems + 20,
    }));
  };

  // Update profile
  const handleUpdateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // AI Recommended Lesson (picks the first incomplete or lowest star lesson for the selected grade)
  const recommendedLesson = 
    lessons.find((l) => l.grade === selectedGrade && (!l.isCompleted || l.stars < 3)) ||
    lessons.find((l) => l.grade === selectedGrade) ||
    lessons[0];

  const unlockedBadgeCount = badges.filter((b) => b.unlocked).length;

  const headerActions = useMemo(() => (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple-500/60"
    >
      Đăng xuất
    </button>
  ), []);

  if (!isLoggedIn) {
    return <LoginView savedStudents={storedStudents} onStudentLogin={handleStudentLogin} onTeacherLogin={handleTeacherLogin} />;
  }

  if (userRole === 'teacher') {
    return (
      <div className="min-h-screen bg-[#0B1120] text-slate-100">
        <TeacherDashboard students={storedStudents.length ? storedStudents : DEFAULT_STUDENTS} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Navbar
        profile={profile}
        selectedGrade={selectedGrade}
        onGradeChange={(grade) => setSelectedGrade(grade)}
        onOpenDesignSpecs={() => setCurrentTab('design-specs')}
        onLogout={handleLogout}
        isGradeLocked={currentTab === 'home'}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          unlockedBadgeCount={unlockedBadgeCount}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 max-w-5xl w-full overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeDashboard
              profile={profile}
              badges={badges}
              recommendedLesson={recommendedLesson}
              dailyHacks={DAILY_MATH_HACKS}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenLesson={() => setCurrentTab('lessons')}
              onAddXp={handleAddXp}
            />
          )}

          {currentTab === 'lessons' && (
            <LessonsView
              lessons={lessons}
              selectedGrade={selectedGrade}
              onGradeChange={(grade) => setSelectedGrade(grade)}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {currentTab === 'ai-solver' && (
            <AiSolverView
              currentGrade={selectedGrade}
              onAddXp={handleAddXp}
            />
          )}

          {currentTab === 'arena' && (
            <MathArenaView
              profile={profile}
              onAddXp={handleAddXp}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              profile={profile}
              badges={badges}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentTab === 'design-specs' && (
            <DesignSpecsView
              onBackToApp={() => setCurrentTab('home')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
