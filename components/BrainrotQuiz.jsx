import React, { useState, useEffect } from "react";

// --- QUESTION DATABASE ---
const QUESTIONS_DB = [
  // MEMES
  {
    id: 1,
    category: "Memes",
    difficulty: "Easy",
    question: "Who is Tralalero Tralala?",
    options: [
      "A shark wearing Nike shoes",
      "A dancing crocodile",
      "A flying capybara",
      "Your college professor",
    ],
    answer: 0,
    lore: "Tralalero Tralala is an Italian AI-generated brainrot song about a shark in blue Nikes.",
  },
  {
    id: 2,
    category: "Memes",
    difficulty: "Medium",
    question: "What animal is famous for the 'Spinning Banana' video?",
    options: ["Monke", "Capybara", "Chihuahua", "Seal"],
    answer: 0,
    lore: "Monke spin banana is peak internet minimalism.",
  },
  {
    id: 3,
    category: "Memes",
    difficulty: "Cursed 💀",
    question:
      "Which sound effect plays when a character hits a sudden realizations / dramatic shock moment?",
    options: [
      "Vine Boom 💥",
      "Metal Pipe Fall 🪵",
      "Bruh Sound #2 🔊",
      "Windows XP Error 💻",
    ],
    answer: 0,
    lore: "The Vine Boom is the foundational pillar of modern comedic timing.",
  },

  // BRAINROT CHARACTERS
  {
    id: 4,
    category: "Brainrot Characters",
    difficulty: "Easy",
    question:
      "Which toilet-headed creature started the 2023 brainrot movement?",
    options: ["Grimace", "Skibidi Toilet", "Baby Gronk", "Smurf Cat"],
    answer: 1,
    lore: "Skibidi Toilet rewrote Gen Alpha folklore forever.",
  },
  {
    id: 5,
    category: "Brainrot Characters",
    difficulty: "Medium",
    question: "Who rizzed up Livvy Dunne to become the ultimate Rizz King?",
    options: ["Kai Cenat", "Baby Gronk", "Duke Dennis", "Speed"],
    answer: 1,
    lore: "Baby Gronk rizzed up Livvy Dunne and became the new Alpha.",
  },
  {
    id: 6,
    category: "Brainrot Characters",
    difficulty: "Cursed 💀",
    question:
      "What blue mythical creature walked through the woods with a mushroom hat?",
    options: [
      "Shrek",
      "Smurf Cat (We Live We Lie)",
      "Gnome Child",
      "Blue Lobster",
    ],
    answer: 1,
    lore: "We live, we love, we lie...",
  },

  // INTERNET SLANG
  {
    id: 7,
    category: "Internet Slang",
    difficulty: "Easy",
    question: "What does 'rizz' stand for or mean?",
    options: [
      "Intelligence",
      "Charisma or flirting ability",
      "Being chronically tired",
      "Having negative aura",
    ],
    answer: 1,
    lore: "Rizz is Oxford Dictionary's word of the year for a reason.",
  },
  {
    id: 8,
    category: "Internet Slang",
    difficulty: "Medium",
    question:
      "If someone loses their cool or does something extremely cringe, what do they lose?",
    options: [
      "Their wifi speed",
      "Social credits",
      "Aura points 📉",
      "Bitcoins",
    ],
    answer: 2,
    lore: "-10,000 Aura points immediately.",
  },
  {
    id: 9,
    category: "Internet Slang",
    difficulty: "Cursed 💀",
    question:
      "What is the procedure performed to achieve the ultimate sharp jawline?",
    options: ["Mewing & Looksmaxxing", "Rizzing", "Edging", "Skibidi-ing"],
    answer: 0,
    lore: "Bye-bye 🤫🧏‍♂️ *points to jawline*",
  },
];

export default function BrainrotQuiz() {
  // Screen status: 'home' | 'quiz' | 'result'
  const [screen, setScreen] = useState("home");

  // Filter selections
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Game state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Turn state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter options
  const categories = ["All", "Memes", "Brainrot Characters", "Internet Slang"];
  const difficulties = ["All", "Easy", "Medium", "Cursed 💀"];

  // Start Quiz setup
  const handleStartQuiz = () => {
    let filtered = QUESTIONS_DB.filter((q) => {
      const matchCat =
        selectedCategory === "All" || q.category === selectedCategory;
      const matchDiff =
        selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });

    // Fallback if no exact combo matches
    if (filtered.length === 0) {
      filtered = QUESTIONS_DB;
    }

    // Shuffle questions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setActiveQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScreen("quiz");
  };

  // Submit current answer
  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    const currentQ = activeQuestions[currentIdx];
    const isCorrect = selectedOption === currentQ.answer;

    setIsSubmitted(true);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Score logic: 10 base pts + streak bonus (5 pts per streak level beyond 1)
      const bonus = (newStreak - 1) * 5;
      setScore((prev) => prev + 10 + bonus);
    } else {
      setStreak(0);
    }
  };

  // Move to next question or finished screen
  const handleNextQuestion = () => {
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setScreen("result");
    }
  };

  // Reset to home screen
  const handleRestart = () => {
    setScreen("home");
  };

  // Get Rank & Roast
  const getRankData = (finalScore) => {
    if (finalScore <= 30) {
      return {
        rank: "Grass Toucher 🌱",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        roast:
          "You actually have a healthy sleep schedule and real friends. Disgusting. Go back outside.",
        badge: "🌿",
      };
    } else if (finalScore <= 60) {
      return {
        rank: "Certified Scroll Addict 📱",
        color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        roast:
          "Your screen time is 6 hours a day. You know what Rizz is, but your jawline is still normal.",
        badge: "📲",
      };
    } else if (finalScore <= 90) {
      return {
        rank: "Brainrot Veteran 💀",
        color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        roast:
          "Congratulations. Your neurons have officially submitted their resignation letter.",
        badge: "💀",
      };
    } else {
      return {
        rank: "Terminally Online 🗿",
        color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
        roast:
          "You communicate purely in TikTok sounds. There is zero hope for your attention span.",
        badge: "🗿",
      };
    }
  };

  const currentQ = activeQuestions[currentIdx];
  const rankData = getRankData(score);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-purple-500 selection:text-white font-sans">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* ----------------- 1. HOME SCREEN ----------------- */}
        {screen === "home" && (
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
              <span>💀</span> Chronic Online Test
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                BRAINROT QUIZ
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Test how cooked your attention span and internet lore knowledge
                really is.
              </p>
            </div>

            {/* Category Selector */}
            <div className="w-full space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                      selectedCategory === cat
                        ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="w-full space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Difficulty
              </label>
              <div className="grid grid-cols-2 gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                      selectedDifficulty === diff
                        ? "bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-600/20 transition-all duration-200 active:scale-98 text-base tracking-wide uppercase mt-4"
            >
              Start Quiz 🚀
            </button>
          </div>
        )}

        {/* ----------------- 2. QUIZ SCREEN ----------------- */}
        {screen === "quiz" && currentQ && (
          <div className="space-y-6">
            {/* Header / Score bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 text-purple-400 px-2.5 py-1 rounded-lg">
                  {currentIdx + 1} / {activeQuestions.length}
                </span>
                <span className="text-slate-500">•</span>
                <span>{currentQ.category}</span>
              </div>
              <div className="flex items-center gap-3">
                {streak > 1 && (
                  <span className="text-amber-400 animate-pulse bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    🔥 {streak}x Streak
                  </span>
                )}
                <span className="text-indigo-400 font-extrabold text-sm">
                  {score} pts
                </span>
              </div>
            </div>

            {/* Question Box */}
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                [{currentQ.difficulty}]
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.answer;

                let btnStyles =
                  "bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800";

                if (isSelected) {
                  btnStyles =
                    "bg-purple-600/30 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10";
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyles =
                      "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyles =
                      "bg-rose-500/20 border-rose-500 text-rose-300 line-through opacity-80";
                  } else {
                    btnStyles =
                      "bg-slate-800/30 border-slate-800 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all duration-150 flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs font-mono text-slate-500">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lore reveal after submit */}
            {isSubmitted && (
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-400">
                <span className="font-bold text-purple-400">
                  Lore snippet:{" "}
                </span>
                {currentQ.lore}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg active:scale-98 text-sm"
                >
                  Lock It In 🔒
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-98 text-sm flex items-center justify-center gap-2"
                >
                  <span>Next Question</span>
                  <span>➔</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ----------------- 3. RESULTS SCREEN ----------------- */}
        {screen === "result" && (
          <div className="flex flex-col items-center text-center space-y-6 py-2">
            <span className="text-6xl">{rankData.badge}</span>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Final Assessment
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Score: <span className="text-purple-400">{score}</span> Pts
              </h2>
            </div>

            {/* Rank Card */}
            <div
              className={`w-full p-4 rounded-2xl border ${rankData.color} space-y-1`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Your Brainrot Rank
              </span>
              <div className="text-xl font-black">{rankData.rank}</div>
            </div>

            {/* Funny Roast */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-left w-full space-y-1">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Diagnosis & Roast:
              </span>
              <p className="text-sm text-slate-300 italic">
                "{rankData.roast}"
              </p>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 gap-3 w-full text-left text-xs font-medium">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Questions Answered</span>
                <span className="text-slate-200 font-bold text-sm">
                  {activeQuestions.length}
                </span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Max Streak</span>
                <span className="text-amber-400 font-bold text-sm">
                  🔥 {maxStreak}
                </span>
              </div>
            </div>

            {/* Play Again */}
            <button
              onClick={handleRestart}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-600/20 transition-all duration-200 active:scale-98 text-sm uppercase tracking-wider"
            >
              Try Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
