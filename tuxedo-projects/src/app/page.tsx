"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Styles
const styles = {
  globalStyles: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    :root {
      --foreground-rgb: 0, 0, 0;
      --background-start-rgb: 214, 219, 220;
      --background-end-rgb: 255, 255, 255;
      --background: #ffffff;
      --foreground: #000000;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: #0a0a0a;
        --foreground: #ededed;
      }
    }

    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    .bg-coins {
      background-image: url('https://images.unsplash.com/photo-1669951584605-4deba095a87f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
    }

    .bg-coins::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 215, 0, 0.15),
        rgba(218, 165, 32, 0.25)
      );
      pointer-events: none;
      z-index: 1;
    }

    .main-content {
      position: relative;
      z-index: 1;
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(218, 165, 32, 0.1));
    }

    .bg-overlay {
      position: relative;
      z-index: 20;
    }

    .bg-overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.3)
      );
      pointer-events: none;
      z-index: 1;
    }

    @media (min-width: 1024px) {
      .bg-coins {
        position: fixed;
        width: 30%;
        height: 100vh;
      }

      .main-content {
        margin-left: 30%;
        width: 70%;
      }
    }

    @media (max-width: 1023px) {
      .main-content {
        width: 100%;
        min-height: 100vh;
      }
    }

    .heading-font {
      font-family: 'Playfair Display', serif;
    }

    .subheading-font {
      font-family: 'Space Grotesk', sans-serif;
    }

    /* Tailwind utilities that might be needed */
    .min-h-screen { min-height: 100vh; }
    .relative { position: relative; }
    .absolute { position: absolute; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .w-full { width: 100%; }
    .max-w-lg { max-width: 32rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .text-center { text-align: center; }
    .rounded-xl { border-radius: 0.75rem; }
    .p-4 { padding: 1rem; }
    .p-6 { padding: 1.5rem; }
    .mt-8 { margin-top: 2rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .text-4xl { font-size: 2.25rem; }
    .text-xl { font-size: 1.25rem; }
    .text-lg { font-size: 1.125rem; }
    .text-sm { font-size: 0.875rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-medium { font-weight: 500; }
    .text-yellow-600 { color: rgb(202 138 4); }
    .text-yellow-500 { color: rgb(234 179 8); }
    .text-yellow-400 { color: rgb(250 204 21); }
    .text-slate-700 { color: rgb(51 65 85); }
    .bg-white\/95 { background-color: rgb(255 255 255 / 0.95); }
    .bg-yellow-50\/50 { background-color: rgb(254 252 232 / 0.5); }
    .drop-shadow-lg { filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1)); }
    .backdrop-blur-sm { backdrop-filter: blur(4px); }
    .transition-transform { transition-property: transform; }
    .duration-150 { transition-duration: 150ms; }
    .duration-200 { transition-duration: 200ms; }
    .duration-300 { transition-duration: 300ms; }
    .ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
    .hover\:scale-105:hover { transform: scale(1.05); }
    .hover\:scale-110:hover { transform: scale(1.1); }
    .transform { transform-property: transform; }
    .cursor-pointer { cursor: pointer; }
    .filter { filter: var(--tw-filter); }
    .saturate-150 { --tw-saturate: saturate(1.5); }

    @media (min-width: 640px) {
      .sm\:p-8 { padding: 2rem; }
      .sm\:text-5xl { font-size: 3rem; }
      .sm\:h-56 { height: 14rem; }
      .sm\:w-24 { width: 6rem; }
      .sm\:h-28 { height: 7rem; }
      .sm\:-bottom-4 { bottom: -1rem; }
    }

    /* Animation classes */
    .animate-bounce {
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  `,
};

// NoSSR wrapper component
function NoSSR({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

// SVG Icon for a Mug
const MugIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 70 80"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mugGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#8B4513", stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: "#A0522D", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#8B4513", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M10 70 C10 75 15 80 35 80 C55 80 60 75 60 70 L60 20 L10 20 L10 70 Z"
      fill="url(#mugGradient)"
      stroke="#5C3317"
      strokeWidth="2"
    />
    <ellipse
      cx="35"
      cy="20"
      rx="25"
      ry="7"
      fill="#B8860B"
      stroke="#5C3317"
      strokeWidth="1.5"
    />
    <path
      d="M60 30 Q70 35 70 45 Q70 55 60 60"
      stroke="#5C3317"
      strokeWidth="5"
      fill="none"
    />
  </svg>
);

// SVG Icon for a Coin
const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 50 50"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="25"
      cy="25"
      r="22"
      fill="#FFD700"
      stroke="#DAA520"
      strokeWidth="2"
    />
    <circle cx="25" cy="25" r="18" fill="#F0C040" />
    <text
      x="50%"
      y="50%"
      dy=".35em"
      textAnchor="middle"
      fontSize="20"
      fill="#B8860B"
      fontWeight="bold"
    >
      $
    </text>
  </svg>
);

interface MugState {
  id: number;
  x: number;
  z: number;
  isLifted: boolean;
  showCoinBeneath: boolean;
}

type GamePhase =
  | "idle"
  | "showingCoin"
  | "shuffling"
  | "waitingForGuess"
  | "revealing"
  | "gameOver";

const MUG_BASE_Y_TRANSLATE = -5;
const MUG_LIFT_Y_TRANSLATE = -40;
const MUG_EFFECTIVE_WIDTH = 96;
const MUG_SPACING = 30;
const MUG_POSITIONS_X = [
  -(MUG_EFFECTIVE_WIDTH + MUG_SPACING),
  0,
  MUG_EFFECTIVE_WIDTH + MUG_SPACING,
];

const BASE_SHUFFLE_COUNT = 5;
const MAX_SHUFFLE_COUNT = 12;
const BASE_ANIMATION_DURATION = 500;
const MIN_ANIMATION_DURATION = 200;
const BASE_STEP_DELAY = 100;
const MIN_STEP_DELAY = 30;

const GameComponent: React.FC = () => {
  const [mugs, setMugs] = useState<MugState[]>([]);
  const [coinUnderMugId, setCoinUnderMugId] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("idle");
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('Click "Start Game" to begin!');
  const shuffleInProgress = useRef(false);

  // Calculate difficulty based on score
  const getDifficultySettings = useCallback((currentScore: number) => {
    const level = Math.floor(currentScore / 3); // Increase difficulty every 3 points
    return {
      shuffleCount: Math.min(BASE_SHUFFLE_COUNT + level, MAX_SHUFFLE_COUNT),
      animationDuration: Math.max(
        BASE_ANIMATION_DURATION - level * 50,
        MIN_ANIMATION_DURATION
      ),
      stepDelay: Math.max(BASE_STEP_DELAY - level * 10, MIN_STEP_DELAY),
    };
  }, []);

  useEffect(() => {
    const initialMugs = [0, 1, 2].map((id) => ({
      id,
      x: MUG_POSITIONS_X[id],
      z: 1,
      isLifted: false,
      showCoinBeneath: false,
    }));
    setMugs(initialMugs);
  }, []);

  const initializeMugs = useCallback((coinMugId: number) => {
    setCoinUnderMugId(coinMugId);
    const initialMugs = [0, 1, 2].map((id) => ({
      id,
      x: MUG_POSITIONS_X[id],
      z: 1,
      isLifted: id === coinMugId,
      showCoinBeneath: id === coinMugId,
    }));
    setMugs(initialMugs);
  }, []);

  const performShuffle = useCallback(async (currentMugs: MugState[], difficulty: { shuffleCount: number; animationDuration: number; stepDelay: number }) => {
    const { shuffleCount, animationDuration, stepDelay } = difficulty;
    let mugsCopy = [...currentMugs];

    for (let i = 0; i < shuffleCount; i++) {
      const idx1 = Math.floor(Math.random() * 3);
      let idx2 = Math.floor(Math.random() * 3);
      while (idx2 === idx1) {
        idx2 = Math.floor(Math.random() * 3);
      }

      mugsCopy = mugsCopy.map((mug, idx) =>
        idx === idx1 || idx === idx2
          ? { ...mug, z: 5, isLifted: true }
          : { ...mug, z: 1, isLifted: false }
      );
      setMugs([...mugsCopy]);
      await new Promise((resolve) =>
        setTimeout(resolve, animationDuration / 3)
      );

      // Only swap the x values
      const tempX = mugsCopy[idx1].x;
      mugsCopy[idx1].x = mugsCopy[idx2].x;
      mugsCopy[idx2].x = tempX;
      setMugs([...mugsCopy]);
      await new Promise((resolve) =>
        setTimeout(resolve, animationDuration)
      );

      mugsCopy = mugsCopy.map((mug) => ({
        ...mug,
        z: 1,
        isLifted: false,
      }));
      setMugs([...mugsCopy]);
      await new Promise((resolve) =>
        setTimeout(resolve, stepDelay)
      );
    }
    return mugsCopy;
  }, []);

  useEffect(() => {
    const handleShuffle = async () => {
      if (gamePhase === "shuffling" && !shuffleInProgress.current) {
        shuffleInProgress.current = true;
        const difficulty = getDifficultySettings(score);
        try {
          await performShuffle(mugs, difficulty);
          setGamePhase("waitingForGuess");
          setMessage("Which mug has the coin?");
        } finally {
          shuffleInProgress.current = false;
        }
      }
    };
    handleShuffle();
  }, [gamePhase, performShuffle, score, getDifficultySettings, mugs]);

  const startGame = useCallback(() => {
    setGamePhase("showingCoin");
    setMessage("Watch carefully!");
    setScore((currScore) => (gamePhase === "gameOver" ? 0 : currScore));

    const newCoinMugId = Math.floor(Math.random() * 3);
    initializeMugs(newCoinMugId);

    setTimeout(() => {
      setMugs((prevMugs) =>
        prevMugs.map((mug) => ({
          ...mug,
          isLifted: false,
          showCoinBeneath: false,
        }))
      );
      setGamePhase("shuffling");
      const level = Math.floor(score / 3);
      setMessage(`Level ${level + 1}: Shuffling...`);
    }, 2000);
  }, [initializeMugs, gamePhase, score]);

  const handleMugClick = (clickedMugId: number) => {
    if (gamePhase !== "waitingForGuess" || coinUnderMugId === null) return;

    setGamePhase("revealing");
    const actualClickedMugOriginalId = clickedMugId;

    if (actualClickedMugOriginalId === coinUnderMugId) {
      setScore((s) => s + 1);
      setMessage("Correct! Next round...");
      setMugs((prevMugs) =>
        prevMugs.map((mug) =>
          mug.id === actualClickedMugOriginalId
            ? { ...mug, isLifted: true, showCoinBeneath: true }
            : mug
        )
      );
      setTimeout(() => {
        startGame();
      }, 2000);
    } else {
      setMessage(
        `Nope! The coin was under mug #${
          (mugs.find((m) => m.id === coinUnderMugId)?.x === MUG_POSITIONS_X[0]
            ? 1
            : mugs.find((m) => m.id === coinUnderMugId)?.x ===
              MUG_POSITIONS_X[1]
            ? 2
            : 3) || "?"
        }. Game Over.`
      );
      setGamePhase("gameOver");
      setMugs((prevMugs) =>
        prevMugs.map((mug) => {
          if (mug.id === actualClickedMugOriginalId)
            return { ...mug, isLifted: true };
          if (mug.id === coinUnderMugId)
            return { ...mug, isLifted: true, showCoinBeneath: true };
          return mug;
        })
      );
    }
  };

  return (
    <NoSSR>
      <style dangerouslySetInnerHTML={{ __html: styles.globalStyles }} />
      <div className="relative min-h-screen">
        <div className="bg-coins" />
        <main className="main-content flex items-center justify-center p-4">
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-[0_0_15px_rgba(218,165,32,0.3)] border border-yellow-100/20 w-full text-center">
              <h1 className="heading-font text-4xl sm:text-5xl font-bold text-yellow-600 mb-2 drop-shadow-sm">
                Coin Finder
              </h1>
              <p className="subheading-font text-xl text-slate-700 mb-6">
                Score: <span className="font-semibold text-yellow-500">{score}</span>
              </p>

              <div className="relative w-full h-48 sm:h-56 flex justify-center items-end mb-6">
                {mugs.map((mug) => (
                  <div
                    key={mug.id}
                    className="absolute transition-transform duration-300 ease-in-out cursor-pointer group"
                    style={{
                      transform: `translateX(${mug.x}px) translateY(${
                        mug.isLifted ? MUG_LIFT_Y_TRANSLATE : MUG_BASE_Y_TRANSLATE
                      }px) scale(${
                        gamePhase === "shuffling" && mug.isLifted ? 1.1 : 1
                      })`,
                      zIndex: mug.z,
                      pointerEvents:
                        gamePhase === "waitingForGuess" ? "auto" : "none",
                    }}
                    onClick={() => handleMugClick(mug.id)}
                  >
                    <div
                      className={`relative ${
                        gamePhase === "waitingForGuess"
                          ? "hover:scale-110 transition-transform duration-150"
                          : ""
                      }`}
                    >
                      <MugIcon className="w-20 h-24 sm:w-24 sm:h-28 text-yellow-700 drop-shadow-lg filter saturate-150" />
                      {mug.showCoinBeneath && (
                        <CoinIcon className="w-10 h-10 sm:w-12 sm:h-12 absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce drop-shadow-lg filter saturate-150" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="subheading-font text-lg text-slate-700 mb-6 h-12 flex items-center justify-center font-medium bg-yellow-50/50 rounded-lg">
                {message}
              </p>

              {(gamePhase === "idle" || gamePhase === "gameOver") && (
                <button
                  onClick={startGame}
                  className="subheading-font px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 hover:scale-105 transform hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                >
                  {gamePhase === "gameOver" ? "Play Again" : "Start Game"}
                </button>
              )}
            </div>
            <footer className="mt-8 text-center text-sm text-yellow-400 font-medium drop-shadow-lg subheading-font">
              <p>
                &copy; {new Date().getFullYear()} Coin Finder Deluxe. Keep your eyes
                peeled!
              </p>
            </footer>
          </div>
        </main>
      </div>
    </NoSSR>
  );
};

export default function Page() {
  return <GameComponent />;
}
