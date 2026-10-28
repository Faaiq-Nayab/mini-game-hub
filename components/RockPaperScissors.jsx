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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Rock Paper Scissors
        </h1>

        <div className="flex justify-center gap-3 mb-6">
          <button
            disabled={buttonDisable}
            onClick={() => handleClick("rock")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            Rock
          </button>
          <button
            disabled={buttonDisable}
            onClick={() => handleClick("paper")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            Paper
          </button>
          <button
            disabled={buttonDisable}
            onClick={() => handleClick("scissors")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            Scissors
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg text-sm transition-colors mb-4"
        >
          Reset
        </button>
        <p className="text-slate-600 font-medium text-lg">
          Computer Choice:{" "}
          <span className="text-indigo-600 font-bold capitalize">
            {computerChoice || "None"}
          </span>
        </p>
        <p className="text-slate-600 font-medium text-lg">
          Button Clicked:{" "}
          <span className="text-indigo-600 font-bold capitalize">
            {buttonClicked || "None"}
          </span>
        </p>
        {buttonClicked && computerChoice && (
          <p className="text-slate-600 font-medium text-lg mt-4">
            Result:{" "}
            {buttonClicked === computerChoice ? (
              <span className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                Draw!
              </span>
            ) : (buttonClicked === "rock" && computerChoice === "scissors") ||
              (buttonClicked === "paper" && computerChoice === "rock") ||
              (buttonClicked === "scissors" && computerChoice === "paper") ? (
              <span className="bg-green-600 text-white px-3 py-1 rounded-lg">
                You Win!
              </span>
            ) : (
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg">
                Computer Wins!
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default RockPaperScissors;
