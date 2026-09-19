export type NavigationTab = 
  | 'home' 
  | 'lessons' 
  | 'ai-solver' 
  | 'arena' 
  | 'profile' 
  | 'design-specs';

export type GradeLevel = 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9';

export interface StudentProfile {
  name: string;
  avatar: string;
  title: string;
  grade: GradeLevel;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  dailyGoalXp: number;
  todayEarnedXp: number;
  completedLessonsCount: number;
  arenaWins: number;
  arenaLosses: number;
  accuracyRate: number; // percentage e.g. 92
  school?: string;
  totalScore?: number;
  academicLevel?: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu';
  learningTrend?: 'Tăng' | 'Ổn định' | 'Giảm';
  weakTopics?: string[];
  role?: 'student' | 'teacher';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'xp' | 'arena' | 'solver' | 'mastery';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface LessonUnit {
  id: string;
  title: string;
  category: 'algebra' | 'geometry' | 'statistics';
  grade: GradeLevel;
  chapter: string;
  description: string;
  icon: string;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  stars: number; // 0 to 3
  theoryContent: string[];
  keyFormulas: string[];
  sampleProblems: {
    question: string;
    solution: string;
  }[];
  quiz: QuizQuestion[];
}

export interface AiSolvedStep {
  stepNumber: number;
  title: string;
  explanation: string;
  mathExpression?: string;
}

export interface AiSolvedResult {
  problem: string;
  grade: string;
  summary: string;
  formulaApplied: string;
  steps: AiSolvedStep[];
  finalAnswer: string;
  mnemonicTip: string;
  relatedChallenge: {
    question: string;
    hint: string;
  };
}

export interface DailyMathHack {
  id: string;
  title: string;
  category: string;
  teaser: string;
  example: string;
  explanation: string;
  funFact: string;
}

export interface ArenaOpponent {
  id: string;
  name: string;
  school: string;
  grade: GradeLevel;
  avatar: string;
  rating: number;
  winRate: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  grade: GradeLevel;
  xp: number;
  streak: number;
  badge: string;
  isCurrentUser?: boolean;
}
