/* =========================================================
   SMART BRAIN – CORE STATE & STORAGE
   ========================================================= */
const STORAGE_KEY = 'smart_brain_user_data_v1';

let state = {
  user: null, // { firstName, lastName, age, group }
  lang: 'uz',
  soundEnabled: true,
  selectedGroup: 2,
  difficultyLevel: 0, // 0: Easy, 1: Medium, 2: Hard, 3: Expert
  stats: {
    totalScore: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    iqScore: 100,
    dailyCount: 0,
    lastPlayDate: new Date().toDateString(),
    history: []
  }
};

const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

/* =========================================================
   TRILINGUAL DICTIONARY (UZ / RU / EN)
   ========================================================= */
const I18N = {
  uz: {
    subtitle: "Aqlni charxlovchi o‘yinlar platformasi",
    navGames: "🎮 O‘yinlar",
    navStats: "📊 Natijalar",
    regTitle: "SMART BRAIN platformasiga xush kelibsiz!",
    regDesc: "Shaxsiy profilingizni yarating va yoshingizga mos 30 ta aqliy o‘yinlarni boshlang.",
    lblFname: "Ismingiz *",
    lblLname: "Familiyangiz *",
    lblAge: "Yoshingiz (3–24) *",
    lblLang: "Tilni tanlang *",
    btnStart: "Boshlash 🚀",
    statScore: "Umumiy ball",
    statIq: "Aqliy indeks (IQ)",
    statLevel: "Joriy daraja",
    dailyTitle: "Kunlik topshiriq:",
    dailyText: (c) => `Bugun kamida 3 ta o‘yinni yakunlang (${Math.min(c, 3)}/3)`,
    tabG1: "👶 3–6 yosh (10)",
    tabG2: "🧒 9–13 yosh (10)",
    tabG3: "🎓 14–24 yosh (10)",
    playBtn: "O‘ynash ▶",
    btnBack: "⬅ Orqaga qaytish",
    btnPause: "⏸ To‘xtatish",
    btnResume: "▶ Davom ettirish",
    btnCheck: "Javobni tekshirish",
    btnReady: "Tayyorman, savolni ko‘rsat",
    btnNext: "Keyingi savol ➡",
    pausedTitle: "O‘yin to‘xtatildi",
    pausedDesc: "Tayyor bo‘lganingizda o‘yinni davom ettirishingiz mumkin.",
    btnExitMenu: "🏠 O‘yinlar menyusi",
    resTitle: "O‘yin yakunlandi!",
    resCorrect: "To‘g‘ri javoblar",
    resWrong: "Noto‘g‘ri javoblar",
    resPoints: "To‘plangan ball",
    resTime: "Sarflangan vaqt",
    resAccuracy: "Foiz natija",
    resIq: "IQ / Mantiq bahosi",
    btnReplay: "🔄 Qayta o‘ynash",
    btnAllGames: "🎮 Barcha o‘yinlar",
    btnViewStats: "📊 Statistika va Reyting",
    statsHeading: "Shaxsiy statistika va reyting",
    btnEditProf: "✏️ Profilni tahrirlash",
    sumGames: "O‘ynalgan o‘yinlar",
    sumPoints: "Jami ball",
    sumAccuracy: "O‘rtacha aniqlik",
    sumIq: "IQ Indeksi",
    medalsTitle: "🏅 Yutuqlar va medallar",
    leaderboardTitle: "🏆 Ballar bo‘yicha reyting",
    historyTitle: "📜 O‘yinlar tarixi",
    correctMsg: "✅ Barakalla! To‘g‘ri javob!",
    wrongMsg: (ans) => `❌ Noto‘g‘ri! To‘g‘ri javob: ${ans}`,
    questionOf: (curr, total) => `Savol ${curr} / ${total}`,
    streakText: (s) => `🔥 Seriya: ${s}`,
    welcomeUser: (name) => `Salom, ${name}!`,
    groups: {
      1: { badge: "1-guruh: 3–6 yosh", desc: "Ranglar, shakllar, hayvonlar va ilk mantiqiy o‘yinlar." },
      2: { badge: "2-guruh: 9–13 yosh", desc: "Matematika, mantiq, shifrlar va tezkor fikrlash o‘yinlari." },
      3: { badge: "3-guruh: 14–24 yosh", desc: "IQ testlar, strategiya, tahlil va murakkab boshqotirmalar." }
    }
  },
  ru: {
    subtitle: "Платформа развивающих интеллектуальных игр",
    navGames: "🎮 Игры",
    navStats: "📊 Результаты",
    regTitle: "Добро пожаловать в SMART BRAIN!",
    regDesc: "Создайте профиль и начните 30 интеллектуальных игр для вашего возраста.",
    lblFname: "Ваше имя *",
    lblLname: "Ваша фамилия *",
    lblAge: "Ваш возраст (3–24) *",
    lblLang: "Выберите язык *",
    btnStart: "Начать 🚀",
    statScore: "Общий балл",
    statIq: "Индекс IQ",
    statLevel: "Текущий уровень",
    dailyTitle: "Ежедневное задание:",
    dailyText: (c) => `Завершите минимум 3 игры сегодня (${Math.min(c, 3)}/3)`,
    tabG1: "👶 3–6 лет (10)",
    tabG2: "🧒 9–13 лет (10)",
    tabG3: "🎓 14–24 года (10)",
    playBtn: "Играть ▶",
    btnBack: "⬅ Назад",
    btnPause: "⏸ Пауза",
    btnResume: "▶ Продолжить",
    btnCheck: "Проверить ответ",
    btnReady: "Готов, показать вопрос",
    btnNext: "Следующий вопрос ➡",
    pausedTitle: "Игра на паузе",
    pausedDesc: "Вы можете продолжить игру, когда будете готовы.",
    btnExitMenu: "🏠 Меню игр",
    resTitle: "Игра завершена!",
    resCorrect: "Правильные ответы",
    resWrong: "Неправильные ответы",
    resPoints: "Набранные баллы",
    resTime: "Затраченное время",
    resAccuracy: "Точность (%)",
    resIq: "Оценка IQ / Логики",
    btnReplay: "🔄 Играть снова",
    btnAllGames: "🎮 Все игры",
    btnViewStats: "📊 Статистика и Рейтинг",
    statsHeading: "Личная статистика и рейтинг",
    btnEditProf: "✏️ Редактировать профиль",
    sumGames: "Сыграно игр",
    sumPoints: "Всего баллов",
    sumAccuracy: "Средняя точность",
    sumIq: "Индекс IQ",
    medalsTitle: "🏅 Достижения и медали",
    leaderboardTitle: "🏆 Рейтинг игроков",
    historyTitle: "📜 История игр",
    correctMsg: "✅ Отлично! Правильный ответ!",
    wrongMsg: (ans) => `❌ Неверно! Правильный ответ: ${ans}`,
    questionOf: (curr, total) => `Вопрос ${curr} / ${total}`,
    streakText: (s) => `🔥 Серия: ${s}`,
    welcomeUser: (name) => `Привет, ${name}!`,
    groups: {
      1: { badge: "1-группа: 3–6 лет", desc: "Цвета, фигуры, животные и первые логические игры." },
      2: { badge: "2-группа: 9–13 лет", desc: "Математика, логика, шифры и игры на скорость мышления." },
      3: { badge: "3-группа: 14–24 года", desc: "IQ-тесты, стратегия, аналитика и сложные головоломки." }
    }
  },
  en: {
    subtitle: "Interactive Brain Training & Cognitive Platform",
    navGames: "🎮 Games",
    navStats: "📊 Results",
    regTitle: "Welcome to SMART BRAIN!",
    regDesc: "Create your profile and explore 30 age-tailored brain training games.",
    lblFname: "First Name *",
    lblLname: "Last Name *",
    lblAge: "Your Age (3–24) *",
    lblLang: "Select Language *",
    btnStart: "Start 🚀",
    statScore: "Total Score",
    statIq: "Cognitive IQ",
    statLevel: "Current Level",
    dailyTitle: "Daily Quest:",
    dailyText: (c) => `Complete at least 3 games today (${Math.min(c, 3)}/3)`,
    tabG1: "👶 Ages 3–6 (10)",
    tabG2: "🧒 Ages 9–13 (10)",
    tabG3: "🎓 Ages 14–24 (10)",
    playBtn: "Play ▶",
    btnBack: "⬅ Back",
    btnPause: "⏸ Pause",
    btnResume: "▶ Resume",
    btnCheck: "Check Answer",
    btnReady: "Ready, show question",
    btnNext: "Next Question ➡",
    pausedTitle: "Game Paused",
    pausedDesc: "Resume whenever you are ready to continue.",
    btnExitMenu: "🏠 Games Menu",
    resTitle: "Game Completed!",
    resCorrect: "Correct Answers",
    resWrong: "Wrong Answers",
    resPoints: "Points Earned",
    resTime: "Time Spent",
    resAccuracy: "Accuracy (%)",
    resIq: "IQ / Logic Rating",
    btnReplay: "🔄 Play Again",
    btnAllGames: "🎮 All Games",
    btnViewStats: "📊 Stats & Leaderboard",
    statsHeading: "Personal Statistics & Leaderboard",
    btnEditProf: "✏️ Edit Profile",
    sumGames: "Games Played",
    sumPoints: "Total Points",
    sumAccuracy: "Average Accuracy",
    sumIq: "IQ Index",
    medalsTitle: "🏅 Achievements & Medals",
    leaderboardTitle: "🏆 Global Leaderboard",
    historyTitle: "📜 Game History",
    correctMsg: "✅ Awesome! Correct answer!",
    wrongMsg: (ans) => `❌ Incorrect! Correct answer: ${ans}`,
    questionOf: (curr, total) => `Question ${curr} / ${total}`,
    streakText: (s) => `🔥 Streak: ${s}`,
    welcomeUser: (name) => `Hello, ${name}!`,
    groups: {
      1: { badge: "Group 1: Ages 3–6", desc: "Colors, shapes, animals, and early logic games." },
      2: { badge: "Group 2: Ages 9–13", desc: "Math, logic puzzles, ciphers, and fast thinking." },
      3: { badge: "Group 3: Ages 14–24", desc: "IQ tests, strategy, analytics, and complex puzzles." }
    }
  }
};

/* =========================================================
   30 GAMES CATALOG (10 PER AGE GROUP)
   ========================================================= */
const GAMES_CATALOG = [
  // GROUP 1: 3–6 YOSH (10 games)
  { id: 'g1_colors', group: 1, icon: '🎨', title: { uz: 'Ranglarni topish', ru: 'Угадай цвет', en: 'Find the Color' }, desc: { uz: 'Ko‘rsatilgan rang nomini to‘g‘ri toping.', ru: 'Выберите правильное название цвета.', en: 'Identify the displayed color name.' } },
  { id: 'g1_shapes', group: 1, icon: '🔷', title: { uz: 'Shakllarni ajratish', ru: 'Различай фигуры', en: 'Identify Shapes' }, desc: { uz: 'Geometrik shakllarni nomi bilan moslang.', ru: 'Определите геометрическую фигуру.', en: 'Match geometric shapes correctly.' } },
  { id: 'g1_animals', group: 1, icon: '🦁', title: { uz: 'Hayvonlarni tanish', ru: 'Узнай животное', en: 'Know the Animals' }, desc: { uz: 'Rasmdagi hayvonni toping.', ru: 'Угадайте животное на картинке.', en: 'Identify the animal shown.' } },
  { id: 'g1_match', group: 1, icon: '🍎', title: { uz: 'Rasmlarni moslashtirish', ru: 'Подбери пару', en: 'Picture Matching' }, desc: { uz: 'Narsalarni jufti yoki bog‘liqligi bilan toping.', ru: 'Найдите подходящую пару.', en: 'Match related objects together.' } },
  { id: 'g1_math', group: 1, icon: '➕', title: { uz: 'Oddiy matematik misollar', ru: 'Простая математика', en: 'Simple Math' }, desc: { uz: 'Mevalar va sonlarni qo‘shish va ayirish.', ru: 'Сложение и вычитание в картинках.', en: 'Easy addition and subtraction.' } },
  { id: 'g1_memory', group: 1, icon: '🧠', title: { uz: 'Xotirani rivojlantirish', ru: 'Развитие памяти', en: 'Visual Memory' }, desc: { uz: 'Ko‘rsatilgan rasmlarni eslab qoling.', ru: 'Запомните показанные картинки.', en: 'Remember the shown emojis.' } },
  { id: 'g1_odd', group: 1, icon: '🔍', title: { uz: 'Farqlarni topish', ru: 'Найди лишнее', en: 'Spot the Odd One' }, desc: { uz: 'Qatordagi ortiqcha yoki boshqacha rasmni toping.', ru: 'Найдите лишний предмет в ряду.', en: 'Find the item that does not belong.' } },
  { id: 'g1_count', group: 1, icon: '🔢', title: { uz: 'Rasmdan sanash', ru: 'Посчитай предметы', en: 'Count the Objects' }, desc: { uz: 'Rasmda nechta shakl borligini sanang.', ru: 'Посчитайте количество предметов.', en: 'Count how many items appear.' } },
  { id: 'g1_bigsmall', group: 1, icon: '🐘', title: { uz: 'Katta va kichik', ru: 'Большой и маленький', en: 'Big vs Small' }, desc: { uz: 'Qaysi hayvon yoki narsa kattaroq?', ru: 'Кто больше или меньше?', en: 'Compare sizes of objects.' } },
  { id: 'g1_nature', group: 1, icon: '☀️', title: { uz: 'Tabiat hodisalari', ru: 'Явления природы', en: 'Nature & Weather' }, desc: { uz: 'Ob-havo va tabiat belgilarini toping.', ru: 'Угадайте погоду и природу.', en: 'Identify weather and nature icons.' } },

  // GROUP 2: 9–13 YOSH (10 games)
  { id: 'g2_math', group: 2, icon: '🧮', title: { uz: 'Murakkab matematik misollar', ru: 'Сложная математика', en: 'Advanced Arithmetic' }, desc: { uz: 'Ko‘paytirish, bo‘lish va aralash amallar.', ru: 'Умножение, деление и скобки.', en: 'Multiplication, division & mixed ops.' } },
  { id: 'g2_logic', group: 2, icon: '💡', title: { uz: 'Mantiqiy savollar', ru: 'Логические задачи', en: 'Logic Questions' }, desc: { uz: 'Qiziqarli mantiqiy topishmoqlar.', ru: 'Увлекательные логические загадки.', en: 'Tricky brain teasers and riddles.' } },
  { id: 'g2_puzzle', group: 2, icon: '⚖️', title: { uz: 'Matematik boshqotirmalar', ru: 'Мат. головоломки', en: 'Math Equations' }, desc: { uz: 'Noma’lum X qiymatini toping.', ru: 'Найдите неизвестное число X.', en: 'Solve for the unknown variable X.' } },
  { id: 'g2_words', group: 2, icon: '🔤', title: { uz: 'So‘zlarni topish', ru: 'Составь слово', en: 'Word Scramble' }, desc: { uz: 'Aralash harflardan to‘g‘ri so‘z tuzing.', ru: 'Соберите слово из букв.', en: 'Unscramble the letters into a word.' } },
  { id: 'g2_memory', group: 2, icon: '🔢', title: { uz: 'Xotirani sinash', ru: 'Тест памяти', en: 'Number Memory' }, desc: { uz: 'Raqamlar ketma-ketligini eslab qoling.', ru: 'Запомните последовательность цифр.', en: 'Memorize the digit sequence.' } },
  { id: 'g2_seq', group: 2, icon: '📈', title: { uz: 'Ketma-ketlikni davom ettirish', ru: 'Продолжи ряд', en: 'Number Sequences' }, desc: { uz: 'Sonlar qatoridagi keyingi hadni toping.', ru: 'Найдите следующее число в ряду.', en: 'Find the next number in the series.' } },
  { id: 'g2_geo', group: 2, icon: '📐', title: { uz: 'Geometrik masalalar', ru: 'Геометрия', en: 'Geometry Challenges' }, desc: { uz: 'Perimetr, yuza va burchaklarni hisoblang.', ru: 'Периметр, площадь и углы фигур.', en: 'Calculate perimeter, area & angles.' } },
  { id: 'g2_speed', group: 2, icon: '⚡', title: { uz: 'Tez fikrlash o‘yinlari', ru: 'Быстрое мышление', en: 'Speed Comparison' }, desc: { uz: 'Qaysi ifoda katta ekanini tez aniqlang.', ru: 'Быстро сравните два выражения.', en: 'Quickly pick the larger expression.' } },
  { id: 'g2_cipher', group: 2, icon: '🔐', title: { uz: 'Kod va shifrlarni yechish', ru: 'Шифры и коды', en: 'Code & Cipher Breaker' }, desc: { uz: 'Raqamli alifbo shifrini oching.', ru: 'Расшифруйте числовой код.', en: 'Decode number-to-letter ciphers.' } },
  { id: 'g2_fractions', group: 2, icon: '🍕', title: { uz: 'Kasrlar va foizlar', ru: 'Дроби и проценты', en: 'Fractions & Percents' }, desc: { uz: 'Sonning ulushi va foizini hisoblang.', ru: 'Вычислите долю и процент числа.', en: 'Calculate fractions and percentages.' } },

  // GROUP 3: 14–24 YOSH (10 games)
  { id: 'g3_logic', group: 3, icon: '🧩', title: { uz: 'Murakkab mantiqiy masalalar', ru: 'Сложная логика', en: 'Deductive Logic' }, desc: { uz: 'Sillogizm va deduktiv xulosa chiqarish.', ru: 'Силлогизмы и дедуктивные задачи.', en: 'Syllogisms and deductive reasoning.' } },
  { id: 'g3_iq', group: 3, icon: '🎓', title: { uz: 'IQ testlari', ru: 'IQ тесты', en: 'IQ Pattern Matrix' }, desc: { uz: 'Matritsa va qonuniyatlarni aniqlash.', ru: 'Числовые и логические матрицы.', en: 'Identify hidden numerical patterns.' } },
  { id: 'g3_strategy', group: 3, icon: '♟️', title: { uz: 'Strategik o‘yinlar', ru: 'Стратегия', en: 'Game Theory & Strategy' }, desc: { uz: 'Optimal yurish va o‘yin nazariyasi.', ru: 'Оптимальный ход и теория игр.', en: 'Find the winning optimal move.' } },
  { id: 'g3_math', group: 3, icon: '∑', title: { uz: 'Murakkab matematik masalalar', ru: 'Высшая математика', en: 'Algebra & Powers' }, desc: { uz: 'Darajalar, ildizlar va tenglamalar.', ru: 'Степени, корни и уравнения.', en: 'Exponents, roots, and algebra.' } },
  { id: 'g3_cipher', group: 3, icon: '🕵️', title: { uz: 'Shifrlarni yechish (Sezar)', ru: 'Шифр Цезаря', en: 'Caesar Cryptography' }, desc: { uz: 'Siljitilgan alifbo shifrini deshifrlang.', ru: 'Взломайте шифр сдвига Цезаря.', en: 'Decrypt shifted Caesar cipher texts.' } },
  { id: 'g3_speed', group: 3, icon: '⏱️', title: { uz: 'Tezkor fikrlash', ru: 'Скоростной счет', en: 'Mental Speed Math' }, desc: { uz: 'Ko‘p xonali sonlar ustida tezkor amal.', ru: 'Быстрые вычисления в уме.', en: 'Rapid multi-digit mental calculation.' } },
  { id: 'g3_analytic', group: 3, icon: '📊', title: { uz: 'Analitik tafakkur', ru: 'Аналитика и шансы', en: 'Probability & Analytics' }, desc: { uz: 'Ehtimollik va kombinatorika masalalari.', ru: 'Задачи на вероятность и статистику.', en: 'Probability and data reasoning.' } },
  { id: 'g3_memory', group: 3, icon: '🧬', title: { uz: 'Xotira sinovlari', ru: 'Суперпамять', en: 'Reverse Sequence Memory' }, desc: { uz: 'Murakkab kodni teskari tartibda yozing.', ru: 'Воспроизведите код в обратном порядке.', en: 'Recall alphanumeric code in reverse.' } },
  { id: 'g3_problem', group: 3, icon: '🛠️', title: { uz: 'Muammoli vaziyatlarga yechim', ru: 'Решение кейсов', en: 'Critical Problem Solving' }, desc: { uz: 'Resurs va vaqtni optimal taqsimlash.', ru: 'Оптимизация времени и ресурсов.', en: 'Optimize time and resource constraints.' } },
  { id: 'g3_puzzle', group: 3, icon: '🔮', title: { uz: 'Murakkab boshqotirmalar', ru: 'Сложные головоломки', en: 'Binary & Logic Gates' }, desc: { uz: 'Ikkilik sanoq tizimi va mantiqiy amallar.', ru: 'Двоичная система и логика.', en: 'Binary numbers and boolean puzzles.' } }
];

/* =========================================================
   WEB AUDIO API SOUND SYNTHESIZER
   ========================================================= */
function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'finish') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.12);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) { /* AudioContext fallback */ }
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  document.getElementById('sound-toggle').textContent = state.soundEnabled ? '🔊' : '🔇';
}

/* =========================================================
   INITIALIZATION & PROFILE MANAGEMENT
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  applyTranslations();

  if (state.user) {
    setupAuthenticatedUI();
    showScreen('dashboard-screen');
  } else {
    showScreen('register-screen');
  }
});

function loadSavedData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      if (state.stats.lastPlayDate !== new Date().toDateString()) {
        state.stats.dailyCount = 0;
        state.stats.lastPlayDate = new Date().toDateString();
      }
    } catch (e) { console.error(e); }
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getAgeGroupFromAge(age) {
  if (age <= 8) return 1; // 3-6 (and 7-8 mapped cleanly)
  if (age <= 13) return 2;
  return 3;
}

function handleRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const age = parseInt(document.getElementById('userAge').value, 10);
  const lang = document.getElementById('userLangSelect').value;

  if (!firstName || !lastName || isNaN(age) || age < 3 || age > 24) return;

  const group = getAgeGroupFromAge(age);
  state.user = { firstName, lastName, age, group };
  state.lang = lang;
  state.selectedGroup = group;
  saveData();

  setupAuthenticatedUI();
  applyTranslations();
  showScreen('dashboard-screen');
}

function setupAuthenticatedUI() {
  document.getElementById('nav-user-controls').classList.remove('hidden');
  document.getElementById('header-user-name').textContent = `${state.user.firstName} (${state.user.age})`;
  switchAgeGroup(state.selectedGroup || state.user.group);
  updateDashboardStats();
}

function goHome() {
  if (state.user) showScreen('dashboard-screen');
  else showScreen('register-screen');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'dashboard-screen') {
    updateDashboardStats();
    renderGamesGrid();
  } else if (screenId === 'stats-screen') {
    renderStatsAndLeaderboard();
  }
}

function openProfileModal() {
  document.getElementById('editFirstName').value = state.user.firstName;
  document.getElementById('editLastName').value = state.user.lastName;
  document.getElementById('editAge').value = state.user.age;
  document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.add('hidden');
}

function saveProfileEdit(e) {
  e.preventDefault();
  state.user.firstName = document.getElementById('editFirstName').value.trim();
  state.user.lastName = document.getElementById('editLastName').value.trim();
  state.user.age = parseInt(document.getElementById('editAge').value, 10);
  state.user.group = getAgeGroupFromAge(state.user.age);
  state.selectedGroup = state.user.group;
  saveData();
  closeProfileModal();
  setupAuthenticatedUI();
  applyTranslations();
}

/* =========================================================
   LANGUAGE & THEME SWITCHING
   ========================================================= */
function setLanguage(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  const sel = document.getElementById('userLangSelect');
  if (sel) sel.value = lang;

  saveData();
  applyTranslations();

  if (document.getElementById('dashboard-screen').classList.contains('active')) {
    renderGamesGrid();
  }
  if (document.getElementById('stats-screen').classList.contains('active')) {
    renderStatsAndLeaderboard();
  }
}

function applyTranslations() {
  const t = I18N[state.lang];
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setTxt('t-subtitle', t.subtitle);
  setTxt('t-nav-games', t.navGames);
  setTxt('t-nav-stats', t.navStats);
  setTxt('t-reg-title', t.regTitle);
  setTxt('t-reg-desc', t.regDesc);
  setTxt('t-lbl-fname', t.lblFname);
  setTxt('t-lbl-lname', t.lblLname);
  setTxt('t-lbl-age', t.lblAge);
  setTxt('t-lbl-lang', t.lblLang);
  setTxt('t-btn-start', t.btnStart);
  setTxt('t-stat-score', t.statScore);
  setTxt('t-stat-iq', t.statIq);
  setTxt('t-stat-level', t.statLevel);
  setTxt('t-daily-title', t.dailyTitle);
  setTxt('t-tab-g1', t.tabG1);
  setTxt('t-tab-g2', t.tabG2);
  setTxt('t-tab-g3', t.tabG3);
  setTxt('t-btn-back', t.btnBack);
  setTxt('t-btn-check', t.btnCheck);
  setTxt('t-btn-ready', t.btnReady);
  setTxt('btn-next-question', t.btnNext);
  setTxt('t-paused-title', t.pausedTitle);
  setTxt('t-paused-desc', t.pausedDesc);
  setTxt('t-btn-resume', t.btnResume);
  setTxt('t-btn-exit-menu', t.btnExitMenu);
  setTxt('t-res-title', t.resTitle);
  setTxt('t-res-correct', t.resCorrect);
  setTxt('t-res-wrong', t.resWrong);
  setTxt('t-res-points', t.resPoints);
  setTxt('t-res-time', t.resTime);
  setTxt('t-res-accuracy', t.resAccuracy);
  setTxt('t-res-iq', t.resIq);
  setTxt('t-btn-replay', t.btnReplay);
  setTxt('t-btn-all-games', t.btnAllGames);
  setTxt('t-btn-view-stats', t.btnViewStats);
  setTxt('t-stats-heading', t.statsHeading);
  setTxt('t-btn-edit-prof', t.btnEditProf);
  setTxt('t-sum-games', t.sumGames);
  setTxt('t-sum-points', t.sumPoints);
  setTxt('t-sum-accuracy', t.sumAccuracy);
  setTxt('t-sum-iq', t.sumIq);
  setTxt('t-medals-title', t.medalsTitle);
  setTxt('t-leaderboard-title', t.leaderboardTitle);
  setTxt('t-history-title', t.historyTitle);

  if (state.user) {
    setTxt('welcome-user-title', t.welcomeUser(state.user.firstName));
    const gInfo = t.groups[state.selectedGroup];
    setTxt('group-badge', gInfo.badge);
    setTxt('group-description', gInfo.desc);
    setTxt('daily-quest-text', t.dailyText(state.stats.dailyCount));
  }
}

function switchAgeGroup(groupNum) {
  state.selectedGroup = groupNum;
  document.body.className = groupNum === 1 ? 'theme-kids' : groupNum === 2 ? 'theme-teens' : 'theme-adults';

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.group, 10) === groupNum);
  });

  applyTranslations();
  renderGamesGrid();
}

function updateDashboardStats() {
  const t = I18N[state.lang];
  document.getElementById('dash-total-score').textContent = state.stats.totalScore;
  document.getElementById('dash-iq-score').textContent = state.stats.iqScore;
  document.getElementById('dash-difficulty').textContent = DIFFICULTIES[state.difficultyLevel];
  document.getElementById('daily-quest-text').textContent = t.dailyText(state.stats.dailyCount);
  const pct = Math.min(100, Math.round((state.stats.dailyCount / 3) * 100));
  document.getElementById('daily-progress-fill').style.width = `${pct}%`;
}

function renderGamesGrid() {
  const grid = document.getElementById('games-grid');
  const lang = state.lang;
  const t = I18N[lang];
  const games = GAMES_CATALOG.filter(g => g.group === state.selectedGroup);

  grid.innerHTML = games.map(g => `
    <div class="game-card">
      <div>
        <div class="game-card-top">
          <div class="game-icon">${g.icon}</div>
          <span class="game-diff-tag">${DIFFICULTIES[state.difficultyLevel]}</span>
        </div>
        <h3>${g.title[lang]}</h3>
        <p>${g.desc[lang]}</p>
      </div>
      <button class="btn btn-primary btn-block" onclick="startGame('${g.id}')">${t.playBtn}</button>
    </div>
  `).join('');
}

/* =========================================================
   ACTIVE GAME ENGINE & ADAPTIVE DIFFICULTY
   ========================================================= */
let session = null;

function startGame(gameId) {
  const gameObj = GAMES_CATALOG.find(g => g.id === gameId);
  if (!gameObj) return;

  session = {
    gameId,
    gameObj,
    totalQuestions: 8,
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    score: 0,
    streak: 0,
    seconds: 0,
    paused: false,
    answered: false,
    currentQuestion: null,
    timerInterval: null
  };

  document.getElementById('active-game-title').textContent = `${gameObj.icon} ${gameObj.title[state.lang]}`;
  document.getElementById('pause-overlay').classList.add('hidden');
  showScreen('game-screen');

  startTimer();
  loadNextQuestion();
}

function startTimer() {
  clearInterval(session.timerInterval);
  session.timerInterval = setInterval(() => {
    if (!session.paused) {
      session.seconds++;
      document.getElementById('game-timer').textContent = formatTime(session.seconds);
    }
  }, 1000);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function togglePauseGame() {
  if (!session) return;
  session.paused = !session.paused;
  const overlay = document.getElementById('pause-overlay');
  const btn = document.getElementById('btn-pause');
  const t = I18N[state.lang];

  if (session.paused) {
    overlay.classList.remove('hidden');
    btn.textContent = t.btnResume;
  } else {
    overlay.classList.add('hidden');
    btn.textContent = t.btnPause;
  }
}

function confirmExitGame() {
  clearInterval(session.timerInterval);
  session = null;
  showScreen('dashboard-screen');
}

function exitToDashboard() {
  confirmExitGame();
}

function loadNextQuestion() {
  const t = I18N[state.lang];
  session.answered = false;

  document.getElementById('active-game-diff').textContent = DIFFICULTIES[state.difficultyLevel];
  document.getElementById('game-live-score').textContent = session.score;
  document.getElementById('question-counter').textContent = t.questionOf(session.currentIndex + 1, session.totalQuestions);
  document.getElementById('streak-indicator').textContent = t.streakText(session.streak);
  document.getElementById('question-progress-fill').style.width = `${((session.currentIndex + 1) / session.totalQuestions) * 100}%`;

  const fb = document.getElementById('feedback-banner');
  fb.className = 'feedback-banner hidden';
  document.getElementById('btn-next-question').classList.add('hidden');

  const q = generateQuestion(session.gameId, state.difficultyLevel, state.lang);
  session.currentQuestion = q;

  const visualEl = document.getElementById('question-visual');
  const textEl = document.getElementById('question-text');
  const optsEl = document.getElementById('options-container');
  const inputBox = document.getElementById('input-answer-box');
  const memBox = document.getElementById('memory-action-box');

  visualEl.innerHTML = q.visual || '';
  textEl.textContent = q.prompt;
  optsEl.innerHTML = '';
  inputBox.classList.add('hidden');
  memBox.classList.add('hidden');

  if (q.isMemory) {
    memBox.classList.remove('hidden');
  } else if (q.type === 'input') {
    inputBox.classList.remove('hidden');
    const inp = document.getElementById('text-answer-input');
    inp.value = '';
    inp.disabled = false;
    inp.focus();
  } else {
    renderOptions(q.options);
  }
}

function startMemoryRecall() {
  const q = session.currentQuestion;
  document.getElementById('memory-action-box').classList.add('hidden');
  document.getElementById('question-visual').innerHTML = '❓❓❓';
  document.getElementById('question-text').textContent = q.recallPrompt;

  if (q.type === 'input') {
    document.getElementById('input-answer-box').classList.remove('hidden');
    const inp = document.getElementById('text-answer-input');
    inp.value = '';
    inp.disabled = false;
    inp.focus();
  } else {
    renderOptions(q.options);
  }
}

function renderOptions(options) {
  const optsEl = document.getElementById('options-container');
  optsEl.innerHTML = options.map((opt, idx) => `
    <button class="option-btn" onclick="handleOptionAnswer(this, ${idx})">${opt}</button>
  `).join('');
}

function handleOptionAnswer(btnEl, idx) {
  if (session.answered) return;
  const q = session.currentQuestion;
  const chosen = q.options[idx];
  const isCorrect = String(chosen).toLowerCase() === String(q.answer).toLowerCase();

  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (String(q.options[i]).toLowerCase() === String(q.answer).toLowerCase()) {
      b.classList.add('correct');
    }
  });

  if (!isCorrect) btnEl.classList.add('wrong');
  finalizeAnswer(isCorrect);
}

function submitTextAnswer() {
  if (session.answered) return;
  const inp = document.getElementById('text-answer-input');
  const val = inp.value.trim();
  if (!val) return;
  inp.disabled = true;

  const isCorrect = val.toLowerCase() === String(session.currentQuestion.answer).toLowerCase();
  finalizeAnswer(isCorrect);
}

// Enter tugmasi bilan javobni tekshirish
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && session && !session.answered) {
    const inputBox = document.getElementById('input-answer-box');
    if (!inputBox.classList.contains('hidden')) {
      submitTextAnswer();
    }
  }
});

function finalizeAnswer(isCorrect) {
  session.answered = true;
  const t = I18N[state.lang];
  const fb = document.getElementById('feedback-banner');

  if (isCorrect) {
    session.correctCount++;
    session.streak++;
    const pointsEarned = 10 + (state.difficultyLevel * 5) + (session.streak * 2);
    session.score += pointsEarned;

    // Adaptiv qiyinlik: ketma-ket 2 to‘g‘ri javobda daraja oshadi
    if (session.streak >= 2 && state.difficultyLevel < 3) {
      state.difficultyLevel++;
    }

    playSound('correct');
    fb.textContent = t.correctMsg;
    fb.className = 'feedback-banner success';
  } else {
    session.wrongCount++;
    session.streak = 0;

    // Adaptiv qiyinlik: xato ko‘paysa daraja biroz osonlashadi
    if (session.wrongCount >= 2 && state.difficultyLevel > 0) {
      state.difficultyLevel--;
    }

    playSound('wrong');
    fb.textContent = t.wrongMsg(session.currentQuestion.answer);
    fb.className = 'feedback-banner error';
  }

  document.getElementById('game-live-score').textContent = session.score;
  document.getElementById('streak-indicator').textContent = t.streakText(session.streak);
  document.getElementById('btn-next-question').classList.remove('hidden');
}

function nextQuestion() {
  session.currentIndex++;
  if (session.currentIndex < session.totalQuestions) {
    loadNextQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(session.timerInterval);
  playSound('finish');

  const accuracy = Math.round((session.correctCount / session.totalQuestions) * 100);
  const iqDelta = accuracy >= 80 ? 3 : accuracy >= 50 ? 1 : -1;
  state.stats.iqScore = Math.max(75, Math.min(165, state.stats.iqScore + iqDelta));

  state.stats.totalScore += session.score;
  state.stats.gamesPlayed += 1;
  state.stats.totalCorrect += session.correctCount;
  state.stats.totalQuestions += session.totalQuestions;
  state.stats.dailyCount += 1;

  state.stats.history.unshift({
    gameId: session.gameId,
    gameTitle: session.gameObj.title,
    difficulty: DIFFICULTIES[state.difficultyLevel],
    correct: session.correctCount,
    total: session.totalQuestions,
    score: session.score,
    time: formatTime(session.seconds),
    date: new Date().toLocaleDateString()
  });

  saveData();

  document.getElementById('result-game-subtitle').textContent = session.gameObj.title[state.lang];
  document.getElementById('res-correct-val').textContent = session.correctCount;
  document.getElementById('res-wrong-val').textContent = session.wrongCount;
  document.getElementById('res-points-val').textContent = session.score;
  document.getElementById('res-time-val').textContent = formatTime(session.seconds);
  document.getElementById('res-accuracy-val').textContent = `${accuracy}%`;
  document.getElementById('res-iq-val').textContent = `${state.stats.iqScore} IQ`;

  showScreen('result-screen');
}

function replayCurrentGame() {
  if (session && session.gameId) {
    startGame(session.gameId);
  }
}

/* =========================================================
   PROCEDURAL QUESTION GENERATOR FOR ALL 30 GAMES
   ========================================================= */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(gameId, diff, lang) {
  // 1-GURUH (3–6 YOSH)
  if (gameId === 'g1_colors') {
    const colors = [
      { hex: '#ef4444', uz: 'Qizil', ru: 'Красный', en: 'Red' },
      { hex: '#3b82f6', uz: 'Ko‘k', ru: 'Синий', en: 'Blue' },
      { hex: '#22c55e', uz: 'Yashil', ru: 'Зелёный', en: 'Green' },
      { hex: '#eab308', uz: 'Sariq', ru: 'Жёлтый', en: 'Yellow' },
      { hex: '#a855f7', uz: 'Binafsha', ru: 'Фиолетовый', en: 'Purple' },
      { hex: '#f97316', uz: 'To‘q sariq', ru: 'Оранжевый', en: 'Orange' }
    ];
    const target = colors[rand(0, colors.length - 1)];
    const opts = shuffle(colors).slice(0, 4).map(c => c[lang]);
    if (!opts.includes(target[lang])) opts[0] = target[lang];
    const qText = { uz: 'Bu qaysi rang?', ru: 'Какой это цвет?', en: 'What color is this?' };
    return {
      visual: `<span class="color-swatch" style="background:${target.hex}"></span>`,
      prompt: qText[lang],
      options: shuffle(opts),
      answer: target[lang]
    };
  }

  if (gameId === 'g1_shapes') {
    const shapes = [
      { icon: '🟡', uz: 'Doira', ru: 'Круг', en: 'Circle' },
      { icon: '🟥', uz: 'Kvadrat', ru: 'Квадрат', en: 'Square' },
      { icon: '🔺', uz: 'Uchburchak', ru: 'Треугольник', en: 'Triangle' },
      { icon: '⭐', uz: 'Yulduz', ru: 'Звезда', en: 'Star' },
      { icon: '💎', uz: 'Romb', ru: 'Ромб', en: 'Diamond' }
    ];
    const target = shapes[rand(0, shapes.length - 1)];
    const opts = shuffle(shapes).slice(0, 4).map(s => s[lang]);
    if (!opts.includes(target[lang])) opts[0] = target[lang];
    const qText = { uz: 'Bu qaysi shakl?', ru: 'Какая это фигура?', en: 'Which shape is this?' };
    return { visual: target.icon, prompt: qText[lang], options: shuffle(opts), answer: target[lang] };
  }

  if (gameId === 'g1_animals') {
    const animals = [
      { icon: '🦁', uz: 'Sher', ru: 'Лев', en: 'Lion' },
      { icon: '🐘', uz: 'Fil', ru: 'Слон', en: 'Elephant' },
      { icon: '🐰', uz: 'Quyon', ru: 'Кролик', en: 'Rabbit' },
      { icon: '🦊', uz: 'Tulki', ru: 'Лиса', en: 'Fox' },
      { icon: '🐻', uz: 'Ayiq', ru: 'Медведь', en: 'Bear' },
      { icon: '🐢', uz: 'Toshbaqa', ru: 'Черепаха', en: 'Turtle' }
    ];
    const target = animals[rand(0, animals.length - 1)];
    const opts = shuffle(animals).slice(0, 4).map(a => a[lang]);
    if (!opts.includes(target[lang])) opts[0] = target[lang];
    const qText = { uz: 'Rasmdagi hayvonni toping:', ru: 'Угадайте животное:', en: 'Identify the animal:' };
    return { visual: target.icon, prompt: qText[lang], options: shuffle(opts), answer: target[lang] };
  }

  if (gameId === 'g1_match') {
    const pairs = [
      { a: '🐝', b: '🍯', uz: 'Asalari nima tayyorlaydi?', ru: 'Что делает пчела?', en: 'What does a bee make?' },
      { a: '🐒', b: '🍌', uz: 'Maymun nimani yaxshi ko‘radi?', ru: 'Что любит обезьяна?', en: 'What does a monkey love?' },
      { a: '🌧️', b: '☂️', uz: 'Yomg‘irda nima kerak?', ru: 'Что нужно в дождь?', en: 'What do you need in rain?' },
      { a: '🐮', b: '🥛', uz: 'Sigir nima beradi?', ru: 'Что даёт корова?', en: 'What does a cow give?' }
    ];
    const item = pairs[rand(0, pairs.length - 1)];
    return { visual: item.a, prompt: item[lang], options: shuffle(['🍯', '🍌', '☂️', '🥛']), answer: item.b };
  }

  if (gameId === 'g1_math') {
    const a = rand(1, 5 + diff * 2);
    const b = rand(1, 4 + diff * 2);
    const ans = a + b;
    const visual = `${'🍎'.repeat(a)} + ${'🍏'.repeat(b)}`;
    const qText = { uz: `${a} + ${b} nechaga teng?`, ru: `Сколько будет ${a} + ${b}?`, en: `What is ${a} + ${b}?` };
    return {
      visual,
      prompt: qText[lang],
      options: shuffle([ans, ans + 1, Math.max(1, ans - 1), ans + 2]),
      answer: ans
    };
  }

  if (gameId === 'g1_memory') {
    const pool = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐸'];
    const seq = shuffle(pool).slice(0, 2 + Math.min(2, diff));
    const target = seq[rand(0, seq.length - 1)];
    const other = pool.filter(x => !seq.includes(x)).slice(0, 3);
    return {
      isMemory: true,
      visual: seq.join(' '),
      prompt: { uz: 'Ushbu hayvonlarni eslab qoling!', ru: 'Запомните этих животных!', en: 'Memorize these animals!' }[lang],
      recallPrompt: { uz: 'Qaysi hayvon ko‘rsatilgan edi?', ru: 'Какое животное было показано?', en: 'Which animal was shown?' }[lang],
      options: shuffle([target, ...other]),
      answer: target
    };
  }

  if (gameId === 'g1_odd') {
    const sets = [
      { items: ['🍎', '🍌', '🍇', '🚗'], odd: '🚗' },
      { items: ['🐶', '🐱', '🐰', '🌻'], odd: '🌻' },
      { items: ['⚽', '🏀', '🎾', '🍕'], odd: '🍕' },
      { items: ['✈️', '🚁', '🚀', '🐟'], odd: '🐟' }
    ];
    const s = sets[rand(0, sets.length - 1)];
    return {
      visual: s.items.join(' '),
      prompt: { uz: 'Qaysi rasm ortiqcha?', ru: 'Какая картинка лишняя?', en: 'Which item does not belong?' }[lang],
      options: shuffle(s.items),
      answer: s.odd
    };
  }

  if (gameId === 'g1_count') {
    const count = rand(2, 6 + diff);
    const icons = ['⭐', '🎈', '🍓', '🦋'];
    const icon = icons[rand(0, icons.length - 1)];
    return {
      visual: icon.repeat(count),
      prompt: { uz: 'Nechta rasm borligini sanang:', ru: 'Посчитайте количество:', en: 'Count how many items:' }[lang],
      options: shuffle([count, count + 1, Math.max(1, count - 1), count + 2]),
      answer: count
    };
  }

  if (gameId === 'g1_bigsmall') {
    const pairs = [
      { big: '🐘', small: '🐭', uz: 'Qaysi biri KATTAROQ?', ru: 'Кто БОЛЬШЕ?', en: 'Which one is BIGGER?' },
      { big: '🚌', small: '🚲', uz: 'Qaysi biri KATTAROQ?', ru: 'Что БОЛЬШЕ?', en: 'Which one is BIGGER?' },
      { big: '🐳', small: '🐟', uz: 'Qaysi biri KATTAROQ?', ru: 'Кто БОЛЬШЕ?', en: 'Which one is BIGGER?' }
    ];
    const p = pairs[rand(0, pairs.length - 1)];
    return { visual: `${p.big} vs ${p.small}`, prompt: p[lang], options: shuffle([p.big, p.small]), answer: p.big };
  }

  if (gameId === 'g1_nature') {
    const nat = [
      { icon: '☀️', uz: 'Quyosh', ru: 'Солнце', en: 'Sun' },
      { icon: '🌙', uz: 'Oy', ru: 'Луна', en: 'Moon' },
      { icon: '🌈', uz: 'Kamalak', ru: 'Радуга', en: 'Rainbow' },
      { icon: '❄️', uz: 'Qor', ru: 'Снег', en: 'Snow' }
    ];
    const target = nat[rand(0, nat.length - 1)];
    return {
      visual: target.icon,
      prompt: { uz: 'Bu nima?', ru: 'Что это?', en: 'What is this?' }[lang],
      options: shuffle(nat.map(n => n[lang])),
      answer: target[lang]
    };
  }

  // 2-GURUH (9–13 YOSH)
  if (gameId === 'g2_math') {
    const a = rand(6, 15 + diff * 5);
    const b = rand(3, 12 + diff * 3);
    const ans = a * b;
    return {
      type: 'input',
      visual: '🧮',
      prompt: `${a} × ${b} = ?`,
      answer: String(ans)
    };
  }

  if (gameId === 'g2_logic') {
    const riddles = [
      { uz: '2 ta ot 4 soatda 20 km yursa, 1 ta ot 4 soatda necha km yuradi?', ru: '2 лошади за 4 часа пробежали 20 км. Сколько пробежит 1 лошадь за 4 часа?', en: '2 horses run 20 km in 4 hours. How far does 1 horse run in 4 hours?', a: '20', opts: ['10', '20', '40', '5'] },
      { uz: 'Savatda 5 ta olma bor. 5 ta bolaga bittadan berildi, lekin savatda 1 ta olma qoldi. Qanday qilib?', ru: 'В корзине 5 яблок. 5 детям дали по яблоку, но 1 осталось в корзине. Как?', en: '5 apples in a basket. 5 kids get one each, yet 1 stays in the basket. Why?', a: { uz: 'Oxirgisi savat bilan oldi', ru: 'Последний взял с корзиной', en: 'Last kid took the basket' }[lang], opts: [{ uz: 'Oxirgisi savat bilan oldi', ru: 'Последний взял с корзиной', en: 'Last kid took the basket' }[lang], '6', '0', '2'] },
      { uz: 'Yilning nechta oyida 28 kun bor?', ru: 'В скольких месяцах года есть 28 дней?', en: 'How many months of the year have 28 days?', a: '12', opts: ['1', '2', '6', '12'] }
    ];
    const r = riddles[rand(0, riddles.length - 1)];
    return { visual: '💡', prompt: r[lang], options: shuffle(r.opts), answer: r.a };
  }

  if (gameId === 'g2_puzzle') {
    const x = rand(4, 15 + diff * 4);
    const add = rand(5, 20);
    const total = 2 * x + add;
    return {
      type: 'input',
      visual: '⚖️',
      prompt: `2x + ${add} = ${total}  ⟹  x = ?`,
      answer: String(x)
    };
  }

  if (gameId === 'g2_words') {
    const words = {
      uz: ['MAKTAB', 'KITOB', 'MANTIQ', 'BILIM', 'PLANETA', 'ALGORITM'],
      ru: ['ШКОЛА', 'КНИГА', 'ЛОГИКА', 'ЗНАНИЕ', 'ПЛАНЕТА', 'АЛГОРИТМ'],
      en: ['SCHOOL', 'PLANET', 'LOGIC', 'BRAIN', 'SCIENCE', 'PUZZLE']
    };
    const list = words[lang];
    const word = list[rand(0, list.length - 1)];
    const scrambled = shuffle(word.split('')).join(' - ');
    return {
      type: 'input',
      visual: scrambled,
      prompt: { uz: 'Harflardan so‘z tuzing:', ru: 'Соберите слово из букв:', en: 'Unscramble the word:' }[lang],
      answer: word
    };
  }

  if (gameId === 'g2_memory') {
    const len = 4 + diff;
    let digits = '';
    for (let i = 0; i < len; i++) digits += rand(1, 9);
    return {
      isMemory: true,
      type: 'input',
      visual: digits.split('').join(' '),
      prompt: { uz: 'Raqamlarni eslab qoling!', ru: 'Запомните цифры!', en: 'Memorize the numbers!' }[lang],
      recallPrompt: { uz: 'Eslab qolgan raqamlaringizni kiriting:', ru: 'Введите запомненные цифры:', en: 'Enter the digits you saw:' }[lang],
      answer: digits
    };
  }

  if (gameId === 'g2_seq') {
    const start = rand(2, 10);
    const step = rand(3, 7 + diff * 2);
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const ans = start + step * 4;
    return {
      visual: `${seq.join(', ')}, ?`,
      prompt: { uz: 'Keyingi sonni toping:', ru: 'Найдите следующее число:', en: 'Find the next number:' }[lang],
      options: shuffle([ans, ans + step, ans - 1, ans + 2]),
      answer: ans
    };
  }

  if (gameId === 'g2_geo') {
    const side = rand(4, 12 + diff * 3);
    const ans = side * 4;
    return {
      visual: '⬜',
      prompt: {
        uz: `Tomoni ${side} sm bo‘lgan kvadratning perimetrini toping:`,
        ru: `Найдите периметр квадрата со стороной ${side} см:`,
        en: `Find the perimeter of a square with side ${side} cm:`
      }[lang],
      options: shuffle([ans, side * side, side * 2, ans + 4]),
      answer: ans
    };
  }

  if (gameId === 'g2_speed') {
    const a1 = rand(10, 25), b1 = rand(10, 25);
    const a2 = rand(12, 26), b2 = rand(9, 24);
    const sum1 = a1 + b1;
    const sum2 = a2 + b2 === sum1 ? a2 + b2 + 1 : a2 + b2;
    const expr1 = `${a1} + ${b1}`;
    const expr2 = `${a2} + ${sum2 - a2}`;
    const ans = sum1 > sum2 ? expr1 : expr2;
    return {
      visual: '⚡',
      prompt: { uz: 'Qaysi ifodaning qiymati KATTA?', ru: 'Какое выражение БОЛЬШЕ?', en: 'Which expression is LARGER?' }[lang],
      options: [expr1, expr2],
      answer: ans
    };
  }

  if (gameId === 'g2_cipher') {
    // A=1, B=2, C=3, D=4, E=5
    const map = [
      { code: '2 - 1 - 4', word: 'BAD' },
      { code: '3 - 1 - 2', word: 'CAB' },
      { code: '1 - 3 - 5', word: 'ACE' },
      { code: '2 - 5 - 4', word: 'BED' }
    ];
    const item = map[rand(0, map.length - 1)];
    return {
      type: 'input',
      visual: `A=1, B=2, C=3, D=4, E=5  |  ${item.code}`,
      prompt: { uz: 'Shifrni harflarga aylantiring:', ru: 'Расшифруйте код в слово:', en: 'Decode the numbers into letters:' }[lang],
      answer: item.word
    };
  }

  if (gameId === 'g2_fractions') {
    const base = rand(2, 6) * 20;
    const ans = base / 4;
    return {
      visual: '🍕',
      prompt: {
        uz: `${base} sonining 25% (1/4 qismi) nechaga teng?`,
        ru: `Чему равны 25% (1/4 часть) от числа ${base}?`,
        en: `What is 25% (1/4) of ${base}?`
      }[lang],
      options: shuffle([ans, ans * 2, ans + 5, base / 2]),
      answer: ans
    };
  }

  // 3-GURUH (14–24 YOSH)
  if (gameId === 'g3_logic') {
    const items = [
      {
        uz: 'Barcha dasturchilar mantiqni biladi. Ali — dasturchi. Bundan qanday xulosa chiqadi?',
        ru: 'Все программисты знают логику. Али — программист. Какой вывод верен?',
        en: 'All programmers know logic. Ali is a programmer. What follows?',
        opts: {
          uz: ['Ali mantiqni biladi', 'Barcha odamlar dasturchi', 'Ali mantiqni bilmaydi', 'Xulosa chiqarib bo‘lmaydi'],
          ru: ['Али знает логику', 'Все люди программисты', 'Али не знает логику', 'Нельзя сделать вывод'],
          en: ['Ali knows logic', 'All people are programmers', 'Ali does not know logic', 'No conclusion possible']
        }
      },
      {
        uz: 'Agar A > B va B > C bo‘lsa, quyidagilardan qaysi biri doimo rost?',
        ru: 'Если A > B и B > C, что из этого всегда истинно?',
        en: 'If A > B and B > C, which statement is always true?',
        opts: {
          uz: ['A > C', 'C > A', 'A = C', 'B > A'],
          ru: ['A > C', 'C > A', 'A = C', 'B > A'],
          en: ['A > C', 'C > A', 'A = C', 'B > A']
        }
      }
    ];
    const q = items[rand(0, items.length - 1)];
    const ans = q.opts[lang][0];
    return { visual: '🧩', prompt: q[lang], options: shuffle(q.opts[lang]), answer: ans };
  }

  if (gameId === 'g3_iq') {
    // 2, 6, 12, 20, 30, ? (n*(n+1))
    const n = rand(3, 6);
    const seq = [n * (n + 1), (n + 1) * (n + 2), (n + 2) * (n + 3)];
    const ans = (n + 3) * (n + 4);
    return {
      visual: `${seq.join('  →  ')}  →  ?`,
      prompt: { uz: 'IQ matritsa qonuniyatini davom ettiring:', ru: 'Продолжите IQ-последовательность:', en: 'Complete the IQ number pattern:' }[lang],
      options: shuffle([ans, ans + 2, ans - 4, ans + 6]),
      answer: ans
    };
  }

  if (gameId === 'g3_strategy') {
    const stones = rand(5, 7);
    const optimal = stones % 4 === 0 ? 1 : stones % 4;
    return {
      visual: `🪨 × ${stones}`,
      prompt: {
        uz: `Stolda ${stones} ta tosh bor. Har yurishda 1, 2 yoki 3 ta tosh olish mumkin. Oxirgi toshni olgan yutadi. Yutish uchun hozir nechta tosh olasiz?`,
        ru: `На столе ${stones} камней. За ход можно взять 1, 2 или 3 камня. Побеждает взявший последний. Сколько камней взять сейчас для победы?`,
        en: `${stones} stones on a table. Take 1, 2, or 3 per turn. Last stone wins. How many should you take now to guarantee a win?`
      }[lang],
      options: shuffle(['1', '2', '3', '0']),
      answer: String(optimal)
    };
  }

  if (gameId === 'g3_math') {
    const base = rand(2, 5);
    const exp = rand(3, 4);
    const add = rand(5, 15);
    const ans = Math.pow(base, exp) + add;
    return {
      type: 'input',
      visual: '∑',
      prompt: `${base}^${exp} + ${add} = ?`,
      answer: String(ans)
    };
  }

  if (gameId === 'g3_cipher') {
    // Caesar shift +1
    const words = ['SMART', 'BRAIN', 'LOGIC', 'POWER', 'CYBER'];
    const orig = words[rand(0, words.length - 1)];
    const shifted = orig.split('').map(ch => String.fromCharCode(((ch.charCodeAt(0) - 65 + 1) % 26) + 65)).join('');
    return {
      type: 'input',
      visual: `🔐 ${shifted}`,
      prompt: {
        uz: `Sezar shifri (+1 harf oldinga siljigan). Asl so‘zni toping:`,
        ru: `Шифр Цезаря (сдвиг +1). Расшифруйте исходное слово:`,
        en: `Caesar Cipher (+1 letter shift). Decrypt the original word:`
      }[lang],
      answer: orig
    };
  }

  if (gameId === 'g3_speed') {
    const a = rand(14, 29);
    const b = rand(11, 19);
    const ans = a * b;
    return {
      type: 'input',
      visual: '⏱️',
      prompt: `${a} × ${b} = ?`,
      answer: String(ans)
    };
  }

  if (gameId === 'g3_analytic') {
    const red = rand(3, 6);
    const blue = rand(4, 7);
    const total = red + blue;
    const ans = `${red}/${total}`;
    return {
      visual: '🎲',
      prompt: {
        uz: `Qutida ${red} ta qizil va ${blue} ta ko‘k shar bor. Tasodifiy olingan shar qizil bo‘lish ehtimoli qancha?`,
        ru: `В коробке ${red} красных и ${blue} синих шаров. Какова вероятность вытащить красный шар?`,
        en: `A box has ${red} red and ${blue} blue balls. What is the probability of picking a red ball?`
      }[lang],
      options: shuffle([ans, `${blue}/${total}`, `1/${red}`, `${red}/${blue}`]),
      answer: ans
    };
  }

  if (gameId === 'g3_memory') {
    const chars = 'ABCDEFGH23456789';
    let code = '';
    for (let i = 0; i < 4 + diff; i++) code += chars[rand(0, chars.length - 1)];
    const rev = code.split('').reverse().join('');
    return {
      isMemory: true,
      type: 'input',
      visual: code,
      prompt: { uz: 'Kodni eslab qoling!', ru: 'Запомните код!', en: 'Memorize this code!' }[lang],
      recallPrompt: { uz: 'Kodni TESKARI tartibda kiriting:', ru: 'Введите код в ОБРАТНОМ порядке:', en: 'Enter the code in REVERSE order:' }[lang],
      answer: rev
    };
  }

  if (gameId === 'g3_problem') {
    const workers = rand(3, 6);
    const days = rand(4, 8);
    const totalWork = workers * days;
    return {
      visual: '🛠️',
      prompt: {
        uz: `${workers} ta dasturchi loyihani ${days} kunda bitiradi. 1 ta dasturchi xuddi shu loyihani necha kunda bitiradi?`,
        ru: `${workers} разработчиков завершат проект за ${days} дней. За сколько дней его сделает 1 разработчик?`,
        en: `${workers} developers finish a project in ${days} days. How many days would 1 developer take?`
      }[lang],
      options: shuffle([totalWork, days, workers + days, totalWork * 2]),
      answer: totalWork
    };
  }

  // g3_puzzle (Binary)
  const num = rand(5, 15 + diff * 5);
  const bin = num.toString(2);
  return {
    type: 'input',
    visual: `💻 ${bin}₂`,
    prompt: {
      uz: `Ikkilik sanoq sistemasidagi ${bin} sonini o‘nlik sanoq sistemasiga o‘tkazing:`,
      ru: `Переведите двоичное число ${bin} в десятичную систему:`,
      en: `Convert binary number ${bin} to decimal:`
    }[lang],
    answer: String(num)
  };
}

/* =========================================================
   STATISTICS, ACHIEVEMENTS & LEADERBOARD
   ========================================================= */
function renderStatsAndLeaderboard() {
  const lang = state.lang;
  const accuracy = state.stats.totalQuestions > 0
    ? Math.round((state.stats.totalCorrect / state.stats.totalQuestions) * 100)
    : 0;

  document.getElementById('stat-games-played').textContent = state.stats.gamesPlayed;
  document.getElementById('stat-total-points').textContent = state.stats.totalScore;
  document.getElementById('stat-avg-accuracy').textContent = `${accuracy}%`;
  document.getElementById('stat-current-iq').textContent = state.stats.iqScore;

  // Medals
  const medals = [
    { icon: '🌟', unlocked: state.stats.gamesPlayed >= 1, name: { uz: 'Ilk qadam', ru: 'Первый шаг', en: 'First Step' }[lang] },
    { icon: '🔥', unlocked: state.stats.dailyCount >= 3, name: { uz: 'Kunlik chempion', ru: 'Чемпион дня', en: 'Daily Hero' }[lang] },
    { icon: '💎', unlocked: state.stats.totalScore >= 300, name: { uz: '300+ Ball ustasi', ru: 'Мастер 300+ баллов', en: '300+ Points' }[lang] },
    { icon: '🧠', unlocked: state.stats.iqScore >= 110, name: { uz: 'Super Intellekt', ru: 'Супер Интеллект', en: 'High IQ' }[lang] }
  ];

  document.getElementById('achievements-list').innerHTML = medals.map(m => `
    <div class="medal-item ${m.unlocked ? 'unlocked' : ''}">
      <span class="medal-icon">${m.icon}</span>
      <strong>${m.name}</strong>
    </div>
  `).join('');

  // Leaderboard
  const rivals = [
    { name: 'Madina Karimova', age: 14, score: 620 },
    { name: 'Jasur Toshmatov', age: 19, score: 480 },
    { name: 'Sarvar Alimov', age: 11, score: 310 },
    { name: 'Laylo Rustamova', age: 6, score: 190 },
    { name: `${state.user.firstName} ${state.user.lastName}`, age: state.user.age, score: state.stats.totalScore, isMe: true }
  ].sort((a, b) => b.score - a.score);

  document.getElementById('leaderboard-body').innerHTML = rivals.map((r, i) => `
    <tr class="${r.isMe ? 'highlight-row' : ''}">
      <td>${i + 1}</td>
      <td>${r.name} ${r.isMe ? '⭐' : ''}</td>
      <td>${r.age}</td>
      <td>${r.score}</td>
    </tr>
  `).join('');

  // History
  const histBody = document.getElementById('history-body');
  if (state.stats.history.length === 0) {
    histBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#64748b;">—</td></tr>`;
  } else {
    histBody.innerHTML = state.stats.history.slice(0, 15).map(h => `
      <tr>
        <td>${h.gameTitle[lang] || h.gameTitle.uz}</td>
        <td>${h.difficulty}</td>
        <td>${h.correct} / ${h.total}</td>
        <td><strong>+${h.score}</strong></td>
        <td>${h.time}</td>
        <td>${h.date}</td>
      </tr>
    `).join('');
  }
}