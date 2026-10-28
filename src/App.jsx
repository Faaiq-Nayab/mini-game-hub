import { useState } from "react";
import BrainrotQuiz from "../components/BrainrotQuiz";
import RockPaperScissors from "../components/RockPaperScissors";
import TicTacToe from "../components/TicTacToe";

function App() {
  const [activePage, setActivePage] = useState("home");

  const games = [
    {
      id: "brainrot",
      title: "Brainrot Quiz",
      description:
        "Test how cooked your attention span and internet lore knowledge really is.",
      component: <BrainrotQuiz />,
    },
    {
      id: "rps",
      title: "Rock Paper Scissors",
      description: "Classic rock, paper, scissors game against the computer.",
      component: <RockPaperScissors />,
    },
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      description: "Play classic Tic Tac Toe with a friend.",
      component: <TicTacToe />,
    },
  ];

  // If a game is active, render it along with a Back button
  if (activePage !== "home") {
    const selectedGame = games.find((g) => g.id === activePage);
    return (
      <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
        <button
          onClick={() => setActivePage("home")}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          ← Back to Game Hub
        </button>
        {selectedGame?.component}
      </div>
    );
  }

  // Home page view displaying the cards
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Game Hub</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setActivePage(game.id)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
              width: "260px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
              {game.title}
            </h2>
            <p
              style={{ color: "#666", fontSize: "0.95rem", lineHeight: "1.4" }}
            >
              {game.description}
            </p>
            <div
              style={{
                marginTop: "15px",
                color: "#0066cc",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Play Game →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
