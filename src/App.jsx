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
      badge: "Trivia",
      badgeColor: "#ec4899",
      description:
        "Test how cooked your attention span and internet lore knowledge really is.",
      component: <BrainrotQuiz />,
    },
    {
      id: "rps",
      title: "Rock Paper Scissors",
      badge: "Arcade",
      badgeColor: "#3b82f6",
      description: "Classic rock, paper, scissors game against the computer.",
      component: <RockPaperScissors />,
    },
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      badge: "Strategy",
      badgeColor: "#10b981",
      description: "Play classic Tic Tac Toe with a friend.",
      component: <TicTacToe />,
    },
  ];

  // Selected Game View
  if (activePage !== "home") {
    const selectedGame = games.find((g) => g.id === activePage);

    return (
      <div
        style={{
          minHeight: "100vh",
          // backgroundColor: "#0f172a",
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('./assets/gameBackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#f8fafc",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: "30px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* Top Bar Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
              paddingBottom: "15px",
              borderBottom: "1px solid #1e293b",
            }}
          >
            <button
              onClick={() => setActivePage("home")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "#1e293b",
                color: "#38bdf8",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#334155";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1e293b";
                e.currentTarget.style.color = "#38bdf8";
              }}
            >
              ← Back to Game Hub
            </button>

            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: "20px",
                backgroundColor: selectedGame?.badgeColor + "22",
                color: selectedGame?.badgeColor,
                border: `1px solid ${selectedGame?.badgeColor}44`,
              }}
            >
              Playing: {selectedGame?.title}
            </span>
          </div>

          {/* Game Canvas Container */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid #334155",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            }}
          >
            {selectedGame?.component}
          </div>
        </div>
      </div>
    );
  }

  // Home Page View
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.85), rgba(45, 63, 82, 0.5)), url('/gameBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#f8fafc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "60px 20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              margin: "0 0 10px 0",
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            ARCADE HUB
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
            Select a game card below to start playing
          </p>
        </header>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setActivePage(game.id)}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "16px",
                padding: "28px",
                cursor: "pointer",
                border: "1px solid #334155",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = game.badgeColor;
                e.currentTarget.style.boxShadow = `0 12px 20px -5px ${game.badgeColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: game.badgeColor + "20",
                      color: game.badgeColor,
                    }}
                  >
                    {game.badge}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    margin: "0 0 10px 0",
                    color: "#f8fafc",
                  }}
                >
                  {game.title}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    margin: "0 0 25px 0",
                  }}
                >
                  {game.description}
                </p>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#38bdf8",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                Play Game <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
