import { useState } from "react";

function RockPaperScissors() {
  const [buttonClicked, setButtonClicked] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [computerChoice, setComputerChoice] = useState("");

  function handleClick(choice) {
    setButtonClicked(choice);
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    setButtonDisable(true);
  }

  function handleReset() {
    setComputerChoice("");
    setButtonClicked("");
    setButtonDisable(false);
  }

  // Visual helper to render icons without touching your main state logic
  const getChoiceIcon = (choice) => {
    switch (choice) {
      case "rock":
        return "🪨";
      case "paper":
        return "📄";
      case "scissors":
        return "✂️";
      default:
        return "❓";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Arcade Battle
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 mt-2">
            Rock Paper Scissors
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            disabled={buttonDisable}
            onClick={() => handleClick("rock")}
            className="group flex flex-col items-center justify-center p-4 bg-slate-800/80 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/50 disabled:bg-slate-800/30 disabled:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
              🪨
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-indigo-300">
              Rock
            </span>
          </button>

          <button
            disabled={buttonDisable}
            onClick={() => handleClick("paper")}
            className="group flex flex-col items-center justify-center p-4 bg-slate-800/80 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/50 disabled:bg-slate-800/30 disabled:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
              📄
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-indigo-300">
              Paper
            </span>
          </button>

          <button
            disabled={buttonDisable}
            onClick={() => handleClick("scissors")}
            className="group flex flex-col items-center justify-center p-4 bg-slate-800/80 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/50 disabled:bg-slate-800/30 disabled:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 active:scale-95"
          >
            <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
              ✂️
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-indigo-300">
              Scissors
            </span>
          </button>
        </div>

        {/* Battle Arena Display */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-2 gap-4 items-center relative">
            {/* VS Badge in Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-400 z-10">
              VS
            </div>

            {/* Player Display */}
            <div className="flex flex-col items-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                You
              </span>
              <span className="text-4xl my-1 transition-all">
                {getChoiceIcon(buttonClicked)}
              </span>
              <p className="text-slate-300 font-bold text-sm mt-1 capitalize">
                Button Clicked:{" "}
                <span className="text-indigo-400">
                  {buttonClicked || "None"}
                </span>
              </p>
            </div>

            {/* Computer Display */}
            <div className="flex flex-col items-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Bot
              </span>
              <span className="text-4xl my-1 transition-all">
                {getChoiceIcon(computerChoice)}
              </span>
              <p className="text-slate-300 font-bold text-sm mt-1 capitalize">
                Computer Choice:{" "}
                <span className="text-indigo-400">
                  {computerChoice || "None"}
                </span>
              </p>
            </div>
          </div>

          {/* Result Banner */}
          {buttonClicked && computerChoice && (
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center">
              <p className="text-slate-300 font-bold text-base flex items-center gap-2">
                <span>Result:</span>
                {buttonClicked === computerChoice ? (
                  <span className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-1.5 rounded-xl font-extrabold shadow-inner tracking-wide">
                    🤝 Draw!
                  </span>
                ) : (buttonClicked === "rock" &&
                    computerChoice === "scissors") ||
                  (buttonClicked === "paper" && computerChoice === "rock") ||
                  (buttonClicked === "scissors" &&
                    computerChoice === "paper") ? (
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-1.5 rounded-xl font-extrabold shadow-lg shadow-emerald-500/10 tracking-wide animate-bounce">
                    🎉 You Win!
                  </span>
                ) : (
                  <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 px-4 py-1.5 rounded-xl font-extrabold shadow-lg shadow-rose-500/10 tracking-wide">
                    💥 Computer Wins!
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-98"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default RockPaperScissors;
