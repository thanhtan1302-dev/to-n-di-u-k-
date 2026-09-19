import { StudentProfile, Badge, LessonUnit, DailyMathHack, LeaderboardUser } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: "Minh Khôi",
  avatar: "🧑‍🎓",
  title: "Phù Thủy Đại Số Tập Sự",
  grade: "Lớp 8",
  level: 12,
  xp: 3450,
  nextLevelXp: 4000,
  streakDays: 7,
  gems: 420,
  hearts: 5,
  maxHearts: 5,
  dailyGoalXp: 100,
  todayEarnedXp: 65,
  completedLessonsCount: 28,
  arenaWins: 19,
  arenaLosses: 3,
  accuracyRate: 94,
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: "streak_7",
    name: "Chiến Binh Bất Bại",
    description: "Duy trì chuỗi học liên tiếp 7 ngày không nghỉ",
    icon: "🔥",
    unlocked: true,
    unlockedAt: "Hôm nay",
    category: "streak",
  },
  {
    id: "algebra_master_8",
    name: "Vua Hằng Đẳng Thức",
    description: "Hoàn thành xuất sắc toàn bộ 7 hằng đẳng thức đáng nhớ",
    icon: "⚡",
    unlocked: true,
    unlockedAt: "3 ngày trước",
    category: "mastery",
  },
  {
    id: "ai_explorer",
    name: "Thám Tử Toán Học",
    description: "Nhờ Trợ lý AI giải và phân tích 10 bài toán hóc búa",
    icon: "🤖",
    unlocked: true,
    unlockedAt: "Tuần trước",
    category: "solver",
  },
  {
    id: "arena_streak",
    name: "Võ Sĩ Toán Học",
    description: "Thắng 5 trận liên tiếp trong Đấu trường Toán học",
    icon: "⚔️",
    unlocked: true,
    unlockedAt: "Tuần trước",
    category: "arena",
  },
  {
    id: "geometry_vision",
    name: "Mắt Thần Hình Học",
    description: "Đạt 3 sao cho tất cả các bài Định lý Ta-lét và Tam giác đồng dạng",
    icon: "📐",
    unlocked: false,
    category: "mastery",
  },
  {
    id: "speed_demon",
    name: "Tia Chớp Tính Nhẩm",
    description: "Trả lời đúng 5 câu hỏi thử thách nhanh dưới 30 giây",
    icon: "⚡",
    unlocked: false,
    category: "xp",
  },
  {
    id: "olympia_spirit",
    name: "Đỉnh Núi Trí Tuệ",
    description: "Vào Top 3 bảng xếp hạng toàn quốc tuần này",
    icon: "👑",
    unlocked: false,
    category: "arena",
  },
];

export const DAILY_MATH_HACKS: DailyMathHack[] = [
  {
    id: "hack_1",
    title: "Mẹo tính nhẩm bình phương số tận cùng bằng 5",
    category: "Số học & Đại số",
    teaser: "Tính nhẩm 75² hoặc 95² chỉ trong đúng 2 giây!",
    example: "Tính 35²: Lấy 3 nhân (3 + 1) = 12. Viết thêm 25 vào sau -> 1225!",
    explanation: "Quy tắc: Với số có dạng A5 (nghĩa là 10A + 5), ta có (10A + 5)² = 100A² + 100A + 25 = 100A(A + 1) + 25. Vì vậy, chỉ cần lấy số hàng chục nhân với số kế tiếp, rồi ghép số 25 vào cuối!",
    funFact: "Nhà toán học cổ đại Ấn Độ đã dùng phương pháp này từ hơn 1000 năm trước trong hệ thống Toán Vedic.",
  },
  {
    id: "hack_2",
    title: "Tuyệt chiêu nhân số có 2 chữ số với 11",
    category: "Số học THCS",
    teaser: "Nhân nhẩm 43 x 11 hoặc 85 x 11 mà không cần đặt bút tính!",
    example: "43 x 11: Tách số 4 và 3, ở giữa là 4 + 3 = 7. Kết quả: 473!",
    explanation: "Nếu tổng hai chữ số lớn hơn hoặc bằng 10: 85 x 11 -> 8 + 5 = 13, giữ 3 ở giữa và cộng nhớ 1 vào hàng trăm (8 + 1 = 9) -> Kết quả: 935.",
    funFact: "Mẹo này áp dụng tính chất phân phối của phép nhân: ab x 11 = ab x (10 + 1) = 10ab + ab.",
  },
  {
    id: "hack_3",
    title: "Ảo thuật Hình học: Tam giác vàng 3 - 4 - 5",
    category: "Hình học trực quan",
    teaser: "Người Ai Cập cổ dựng góc vuông kỳ vĩ cho Kim Tự Tháp thế nào?",
    example: "Một sợi dây thắt 12 nút đều nhau: chia thành các cạnh 3, 4, 5 luôn tạo ra góc vuông hoàn hảo!",
    explanation: "Định lý Pytago đảo: Vì 3² + 4² = 9 + 16 = 25 = 5², nên tam giác có độ dài 3 cạnh này luôn luôn là tam giác vuông tại góc đối diện cạnh 5.",
    funFact: "Bộ ba số nguyên (3, 4, 5) được gọi là Bộ ba số Pythagore nguyên thủy nhỏ nhất trong lịch sử toán học.",
  },
];

export const LESSON_UNITS: LessonUnit[] = [
  // LỚP 8
  {
    id: "l8_hang_dang_thuc",
    title: "7 Hằng Đẳng Thức Đáng Nhớ",
    category: "algebra",
    grade: "Lớp 8",
    chapter: "Chương 1: Đa thức & Hằng đẳng thức",
    description: "Nền tảng của đại số THCS: Bình phương của một tổng, một hiệu và hiệu hai bình phương.",
    icon: "📐",
    xpReward: 50,
    isCompleted: true,
    isLocked: false,
    stars: 3,
    theoryContent: [
      "1. Bình phương của một tổng: (A + B)² = A² + 2AB + B²",
      "2. Bình phương của một hiệu: (A - B)² = A² - 2AB + B²",
      "3. Hiệu hai bình phương: A² - B² = (A - B)(A + B)",
      "4. Lập phương của một tổng: (A + B)³ = A³ + 3A²B + 3AB² + B³",
      "5. Lập phương của một hiệu: (A - B)³ = A³ - 3A²B + 3AB² - B³",
      "6. Tổng hai lập phương: A³ + B³ = (A + B)(A² - AB + B²)",
      "7. Hiệu hai lập phương: A³ - B³ = (A - B)(A² + AB + B²)"
    ],
    keyFormulas: [
      "(A + B)² = A² + 2AB + B²",
      "A² - B² = (A - B)(A + B)",
      "(A - B)³ = A³ - 3A²B + 3AB² - B³"
    ],
    sampleProblems: [
      {
        question: "Khai triển biểu thức (2x + 3y)²",
        solution: "Áp dụng (A + B)² với A = 2x, B = 3y: (2x + 3y)² = (2x)² + 2.(2x).(3y) + (3y)² = 4x² + 12xy + 9y²."
      },
      {
        question: "Tính nhanh: 101² - 99²",
        solution: "Áp dụng hiệu hai bình phương: 101² - 99² = (101 - 99)(101 + 99) = 2 x 200 = 400."
      }
    ],
    quiz: [
      {
        id: "q1_1",
        question: "Biểu thức x² - 4y² khi phân tích thành nhân tử là:",
        options: ["(x - 2y)²", "(x - 2y)(x + 2y)", "(x + 4y)(x - 4y)", "(x - 4y)²"],
        correctIndex: 1,
        explanation: "Vì x² - 4y² = x² - (2y)² = (x - 2y)(x + 2y) theo hằng đẳng thức hiệu hai bình phương.",
        hint: "Nhận dạng dạng A² - B² với A = x và B = 2y."
      },
      {
        id: "q1_2",
        question: "Khai triển của (x - 3)² bằng biểu thức nào sau đây?",
        options: ["x² - 9", "x² - 6x + 9", "x² + 6x + 9", "x² - 3x + 9"],
        correctIndex: 1,
        explanation: "(A - B)² = A² - 2AB + B² => (x - 3)² = x² - 2.x.3 + 3² = x² - 6x + 9.",
        hint: "Đừng quên hạng tử ở giữa -2AB."
      }
    ]
  },
  {
    id: "l8_dinh_ly_talet",
    title: "Định Lý Ta-lét trong Tam Giác",
    category: "geometry",
    grade: "Lớp 8",
    chapter: "Chương 2: Tam giác đồng dạng",
    description: "Khám phá tỉ số giữa các đoạn thẳng song song trong tam giác - Chìa khóa vàng chứng minh hình học.",
    icon: "🔺",
    xpReward: 60,
    isCompleted: false,
    isLocked: false,
    stars: 1,
    theoryContent: [
      "Định lý Ta-lét thuận: Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.",
      "Hệ quả định lý Ta-lét: Nếu một đường thẳng cắt hai cạnh của một tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho.",
      "Công thức: Nếu MN // BC (M thuộc AB, N thuộc AC) thì AM/AB = AN/AC = MN/BC."
    ],
    keyFormulas: [
      "MN // BC => AM / AB = AN / AC = MN / BC",
      "AM / MB = AN / NC"
    ],
    sampleProblems: [
      {
        question: "Cho tam giác ABC, MN // BC với M trên AB, N trên AC. Biết AM = 3cm, MB = 2cm, AN = 4.5cm. Tính NC.",
        solution: "Theo định lý Ta-lét: AM/MB = AN/NC => 3/2 = 4.5/NC => NC = (2 x 4.5) / 3 = 3 cm."
      }
    ],
    quiz: [
      {
        id: "q2_1",
        question: "Cho tam giác ABC, d // BC cắt AB tại D, AC tại E. Khẳng định nào sau đây là ĐÚNG?",
        options: ["AD/AB = AE/AC", "AD/DB = AC/AE", "AD/DE = AB/BC", "AD/AC = AE/AB"],
        correctIndex: 0,
        explanation: "Theo định lý Ta-lét, đường thẳng song song định ra trên 2 cạnh các đoạn thẳng tương ứng tỉ lệ: AD/AB = AE/AC.",
        hint: "Hai đoạn tỉ lệ cùng nằm trên một cạnh hoặc tương ứng cạnh trên đoạn toàn phần."
      }
    ]
  },
  {
    id: "l8_tam_giac_dong_dang",
    title: "Các Trường Hợp Đồng Dạng Của Tam Giác",
    category: "geometry",
    grade: "Lớp 8",
    chapter: "Chương 2: Tam giác đồng dạng",
    description: "Nhận biết hai tam giác có cùng hình dạng nhưng kích thước khác nhau (c-c-c, c-g-c, g-g).",
    icon: "📐",
    xpReward: 70,
    isCompleted: false,
    isLocked: false,
    stars: 0,
    theoryContent: [
      "Trường hợp 1 (c-c-c): Nếu ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia thì hai tam giác đó đồng dạng.",
      "Trường hợp 2 (c-g-c): Nếu hai cạnh của tam giác này tỉ lệ với hai cạnh của tam giác kia và hai góc tạo bởi các cặp cạnh đó bằng nhau thì hai tam giác đồng dạng.",
      "Trường hợp 3 (g-g): Nếu hai góc của tam giác này lần lượt bằng hai góc của tam giác kia thì hai tam giác đó đồng dạng."
    ],
    keyFormulas: [
      "ΔABC ∽ ΔA'B'C' => AB/A'B' = BC/B'C' = CA/C'A' = k",
      "Tỉ số diện tích: S(ABC) / S(A'B'C') = k²"
    ],
    sampleProblems: [
      {
        question: "Nếu tỉ số đồng dạng của hai tam giác là k = 2, thì tỉ số diện tích giữa chúng là bao nhiêu?",
        solution: "Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng: k² = 2² = 4."
      }
    ],
    quiz: [
      {
        id: "q3_1",
        question: "Hai tam giác đồng dạng theo tỉ số k = 3. Tỉ số diện tích của tam giác thứ nhất so với tam giác thứ hai là:",
        options: ["3", "6", "9", "27"],
        correctIndex: 2,
        explanation: "Tỉ số diện tích bằng k² = 3² = 9.",
        hint: "Nhớ quy tắc: Tỉ số chu vi = k, tỉ số diện tích = k²."
      }
    ]
  },
  {
    id: "l8_phan_thuc_dai_so",
    title: "Phân Thức Đại Số & Rút Gọn",
    category: "algebra",
    grade: "Lớp 8",
    chapter: "Chương 3: Phân thức đại số",
    description: "Quy đồng mẫu thức, rút gọn biểu thức chứa phân thức và tìm điều kiện xác định.",
    icon: "➗",
    xpReward: 55,
    isCompleted: false,
    isLocked: false,
    stars: 0,
    theoryContent: [
      "Phân thức đại số là một biểu thức có dạng A/B, trong đó A, B là những đa thức và B khác 0.",
      "Rút gọn phân thức: Phân tích cả tử và mẫu thành nhân tử, sau đó chia cả tử và mẫu cho nhân tử chung.",
      "Điều kiện xác định: Mẫu thức phải khác 0."
    ],
    keyFormulas: [
      "(A.M) / (B.M) = A / B (với M ≠ 0, B ≠ 0)",
      "ĐKXĐ: Mẫu số B ≠ 0"
    ],
    sampleProblems: [
      {
        question: "Rút gọn phân thức (x² - 4)/(x - 2)",
        solution: "Tử số là hằng đẳng thức: x² - 4 = (x - 2)(x + 2). Phân thức trở thành: (x - 2)(x + 2)/(x - 2) = x + 2 (với x ≠ 2)."
      }
    ],
    quiz: [
      {
        id: "q4_1",
        question: "Điều kiện xác định của phân thức (2x + 1)/(x - 5) là:",
        options: ["x ≠ 5", "x ≠ -5", "x ≠ -1/2", "x ≠ 0"],
        correctIndex: 0,
        explanation: "Mẫu thức phải khác 0, do đó x - 5 ≠ 0 => x ≠ 5.",
        hint: "Chỉ cần chú ý biểu thức dưới mẫu số."
      }
    ]
  },

  // LỚP 9
  {
    id: "l9_can_bac_hai",
    title: "Căn Bậc Hai & Trục Căn Thức",
    category: "algebra",
    grade: "Lớp 9",
    chapter: "Chương 1: Căn bậc hai & Căn thức bậc ba",
    description: "Nắm vững hằng đẳng thức √(A²) = |A| và kỹ thuật trục căn thức ở mẫu.",
    icon: "√",
    xpReward: 65,
    isCompleted: false,
    isLocked: true,
    stars: 0,
    theoryContent: [
      "Căn bậc hai số học của số thực a không âm là số x không âm sao cho x² = a.",
      "Hằng đẳng thức quan trọng: √(A²) = |A|",
      "Trục căn thức ở mẫu bằng nhân lượng liên hợp: 1/(√a - √b) = (√a + √b)/(a - b)."
    ],
    keyFormulas: [
      "√(A²) = |A|",
      "√(A.B) = √A . √B (với A ≥ 0, B ≥ 0)",
      "√(A/B) = √A / √B (với A ≥ 0, B > 0)"
    ],
    sampleProblems: [
      {
        question: "Rút gọn biểu thức √( (3 - √10)² )",
        solution: "Áp dụng √(A²) = |A|: Ta có |3 - √10|. Vì 3 = √9 < √10 nên 3 - √10 < 0. Do đó |3 - √10| = √10 - 3."
      }
    ],
    quiz: [
      {
        id: "q9_1",
        question: "Giá trị của biểu thức √( (2 - √5)² ) là:",
        options: ["2 - √5", "√5 - 2", "5 - 2 = 3", "-3"],
        correctIndex: 1,
        explanation: "√(A²) = |A| = |2 - √5|. Do 2 = √4 < √5 nên 2 - √5 < 0, phá trị tuyệt đối ta được √5 - 2.",
        hint: "Nhớ xét dấu bên trong dấu giá trị tuyệt đối |A|."
      }
    ]
  },
  {
    id: "l9_he_phuong_trinh",
    title: "Hệ Hai Phương Trình Bậc Nhất Hai Ẩn",
    category: "algebra",
    grade: "Lớp 9",
    chapter: "Chương 2: Hệ phương trình",
    description: "Phương pháp thế và phương pháp cộng đại số giải nhanh mọi bài toán hệ.",
    icon: "⚖️",
    xpReward: 70,
    isCompleted: false,
    isLocked: true,
    stars: 0,
    theoryContent: [
      "Dạng tổng quát: { ax + by = c ; a'x + b'y = c' }",
      "Phương pháp thế: Rút một ẩn theo ẩn kia từ một phương trình rồi thế vào phương trình còn lại.",
      "Phương pháp cộng đại số: Nhân hai vế với hệ số thích hợp để các hệ số của cùng một ẩn đối nhau hoặc bằng nhau, sau đó cộng/trừ từng vế."
    ],
    keyFormulas: [
      "Hệ có nghiệm duy nhất khi a/a' ≠ b/b'",
      "Hệ vô nghiệm khi a/a' = b/b' ≠ c/c'",
      "Hệ vô số nghiệm khi a/a' = b/b' = c/c'"
    ],
    sampleProblems: [
      {
        question: "Giải hệ phương trình: { x + y = 5 ; x - y = 1 }",
        solution: "Cộng hai phương trình vế theo vế: 2x = 6 => x = 3. Thay vào x + y = 5 => y = 2. Vậy nghiệm là (3; 2)."
      }
    ],
    quiz: [
      {
        id: "q9_2",
        question: "Cặp số (x; y) nào là nghiệm của hệ phương trình { 2x + y = 7 ; x - y = 2 }?",
        options: ["(3; 1)", "(2; 3)", "(1; 5)", "(4; -1)"],
        correctIndex: 0,
        explanation: "Cộng 2 vế: 3x = 9 => x = 3. Thay vào x - y = 2 => 3 - y = 2 => y = 1. Cặp nghiệm là (3; 1).",
        hint: "Thử cộng hai phương trình lại để triệt tiêu biến y."
      }
    ]
  },

  // LỚP 7
  {
    id: "l7_so_huu_ti",
    title: "Tập Hợp Các Số Hữu Tỉ",
    category: "algebra",
    grade: "Lớp 7",
    chapter: "Chương 1: Số hữu tỉ",
    description: "Các phép tính cộng, trừ, nhân, chia số hữu tỉ và quy tắc dấu ngoặc.",
    icon: "🔢",
    xpReward: 40,
    isCompleted: true,
    isLocked: false,
    stars: 3,
    theoryContent: [
      "Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b thuộc Z, b khác 0.",
      "Tập hợp các số hữu tỉ được ký hiệu là Q.",
      "Mọi số nguyên đều là số hữu tỉ: a = a/1."
    ],
    keyFormulas: [
      "a/m + b/m = (a + b)/m",
      "a/b . c/d = (a.c) / (b.d)",
      "a/b : c/d = a/b . d/c (với c/d ≠ 0)"
    ],
    sampleProblems: [
      {
        question: "Tính giá trị của: (-2/3) + 5/6",
        solution: "Quy đồng mẫu số chung là 6: (-4/6) + 5/6 = 1/6."
      }
    ],
    quiz: [
      {
        id: "q7_1",
        question: "Kết quả của phép tính (-3/4) . (8/9) là:",
        options: ["-2/3", "2/3", "-1/3", "24/36"],
        correctIndex: 0,
        explanation: "(-3 . 8) / (4 . 9) = -24 / 36 = -2/3 sau khi rút gọn cho 12.",
        hint: "Rút gọn chéo giữa 3 với 9, và 8 với 4 trước khi nhân."
      }
    ]
  },

  // LỚP 6
  {
    id: "l6_so_nguyen",
    title: "Số Nguyên & Phép Tính Số Âm",
    category: "algebra",
    grade: "Lớp 6",
    chapter: "Chương 2: Số nguyên",
    description: "Khái niệm số nguyên âm, trục số và quy tắc cộng trừ nhân chia số nguyên.",
    icon: "❄️",
    xpReward: 35,
    isCompleted: true,
    isLocked: false,
    stars: 3,
    theoryContent: [
      "Tập hợp số nguyên Z gồm các số nguyên âm, số 0 và các số nguyên dương.",
      "Cộng hai số nguyên cùng dấu âm: Ta cộng hai số đối rồi đặt dấu '-' đằng trước.",
      "Quy tắc dấu khi nhân: (+) . (+) = (+), (-) . (-) = (+), (+) . (-) = (-)."
    ],
    keyFormulas: [
      "(-a) + (-b) = -(a + b)",
      "a - b = a + (-b)",
      "(-a) . (-b) = a . b"
    ],
    sampleProblems: [
      {
        question: "Tính: (-15) + (-25)",
        solution: "Hai số nguyên âm cùng dấu: (-15) + (-25) = -(15 + 25) = -40."
      }
    ],
    quiz: [
      {
        id: "q6_1",
        question: "Giá trị của (-6) . (-7) là:",
        options: ["-42", "42", "13", "-13"],
        correctIndex: 1,
        explanation: "Tích của hai số nguyên âm luôn là một số nguyên dương: (-6) . (-7) = 42.",
        hint: "Âm nhân âm ra dương!"
      }
    ]
  }
];

export const QUICK_CHALLENGES = [
  {
    id: "qc_1",
    question: "Tính nhanh: 15² = ?",
    options: ["215", "225", "235", "195"],
    correctIndex: 1,
    explanation: "Theo mẹo số tận cùng là 5: 1 x 2 = 2 ghép với 25 -> 225.",
    rewardXp: 20
  },
  {
    id: "qc_2",
    question: "Nếu x² = 49 thì x bằng bao nhiêu?",
    options: ["Chỉ có 7", "Chỉ có -7", "7 hoặc -7", "Không tồn tại x"],
    correctIndex: 2,
    explanation: "Cả 7² = 49 và (-7)² = 49. Cần chú ý nghiệm âm!",
    rewardXp: 25
  },
  {
    id: "qc_3",
    question: "Tam giác có ba cạnh là 6cm, 8cm, 10cm có phải tam giác vuông không?",
    options: ["Có, vuông tại góc đối diện cạnh 10cm", "Không phải", "Là tam giác đều", "Là tam giác tù"],
    correctIndex: 0,
    explanation: "Vì 6² + 8² = 36 + 64 = 100 = 10² thỏa mãn định lý Pytago đảo.",
    rewardXp: 30
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Nguyễn Tuấn Kiệt",
    school: "THCS Chu Văn An",
    grade: "Lớp 8",
    xp: 6820,
    streak: 24,
    badge: "👑 Đại Sư Toán Học"
  },
  {
    rank: 2,
    name: "Lê Bảo Anh",
    school: "THCS Trần Đại Nghĩa",
    grade: "Lớp 9",
    xp: 5940,
    streak: 19,
    badge: "⚡ Tia Chớp Hình Học"
  },
  {
    rank: 3,
    name: "Trần Hoàng Nam",
    school: "THCS Nguyễn Tri Phương",
    grade: "Lớp 8",
    xp: 5120,
    streak: 15,
    badge: "🔮 Phù Thủy Giải Tích"
  },
  {
    rank: 4,
    name: "Phạm Minh Khôi",
    school: "THCS Lê Quý Đôn",
    grade: "Lớp 8",
    xp: 3450,
    streak: 7,
    badge: "🛡️ Hiệp Sĩ Ta-lét",
    isCurrentUser: true
  },
  {
    rank: 5,
    name: "Đặng Linh Chi",
    school: "THCS Trưng Vương",
    grade: "Lớp 7",
    xp: 3280,
    streak: 12,
    badge: "✨ Ngôi Sao Đại Số"
  },
  {
    rank: 6,
    name: "Vũ Gia Huy",
    school: "THCS Giảng Võ",
    grade: "Lớp 8",
    xp: 2950,
    streak: 9,
    badge: "🏹 Xạ Thủ Tính Nhanh"
  }
];

export const SAMPLE_AI_QUESTIONS = [
  {
    title: "Phân tích đa thức thành nhân tử",
    grade: "Lớp 8",
    question: "Phân tích đa thức sau thành nhân tử: x³ - 4x² + 4x"
  },
  {
    title: "Tìm x trong hình học Ta-lét",
    grade: "Lớp 8",
    question: "Cho tam giác ABC, MN // BC (M ∈ AB, N ∈ AC). Biết AM = 4cm, MB = 6cm, AN = 5cm. Tính độ dài đoạn NC và tỉ số diện tích tam giác AMN với ABC."
  },
  {
    title: "Rút gọn biểu thức chứa căn thức",
    grade: "Lớp 9",
    question: "Rút gọn biểu thức: P = (√x / (√x - 1) - 1 / (x - √x)) : (1 / (√x + 1) + 2 / (x - 1)) với x > 0, x ≠ 1."
  },
  {
    title: "Bài toán thực tế tỉ số phần trăm",
    grade: "Lớp 7",
    question: "Một chiếc xe đạp có giá niêm yết 3.000.000 đồng. Nhân dịp khai giảng, cửa hàng giảm giá 15%. Sau đó, bạn học sinh có thẻ thành viên nên được giảm thêm 5% trên giá đã giảm. Hỏi bạn học sinh phải trả bao nhiêu tiền?"
  }
];
