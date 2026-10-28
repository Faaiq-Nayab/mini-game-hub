import React, { useState } from "react";

export default function TicTacToeShowcase() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Calculate winner and return winning line indices for highlight effect
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Tic Tac Toe
      </h1>

      {/* Game Status */}
      <div className="mb-6 h-10 flex items-center justify-center">
        {winner ? (
          <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full font-bold text-lg animate-bounce">
            🎉 Player {winner} Wins!
          </div>
        ) : isDraw ? (
          <div className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full font-bold text-lg">
            🤝 It's a Draw!
          </div>
        ) : (
          <div className="text-slate-300 font-medium text-lg">
            Turn:{" "}
            <span
              className={`font-bold ${
                isXNext ? "text-indigo-400" : "text-rose-400"
              }`}
            >
              {isXNext ? "X" : "O"}
            </span>
          </div>
        )}
      </div>

      {/* Grid Board */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-xs sm:max-w-sm w-full">
        {board.map((square, i) => {
          const isWinningSquare = winInfo?.line.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={Boolean(square || winner)}
              className={`w-full aspect-square text-4xl sm:text-5xl font-black rounded-2xl flex items-center justify-center transition-all duration-200 select-none ${
                isWinningSquare
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105"
                  : square === "X"
                    ? "bg-slate-800 text-indigo-400 border border-indigo-500/30 shadow-md"
                    : square === "O"
                      ? "bg-slate-800 text-rose-400 border border-rose-500/30 shadow-md"
                      : "bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-transparent active:scale-95 cursor-pointer"
              }`}
            >
              {square}
            </button>
          );
        })}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-8 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
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
        Restart Game
      </button>
    </div>
  );
}
