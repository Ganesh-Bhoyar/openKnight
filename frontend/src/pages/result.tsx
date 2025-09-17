// WinPage.tsx
import React from "react";

type Player = {
  name: string;
  rating: number;
  avatar: string;
  color: string;
};

type GameStats = {
  duration: string;
  moves: number;
  winType: string;
  timeControl: string;
};

type WinPageProps = {
  player: Player;
  opponent: Player;
  gameStats: GameStats;
  ratingChange: string;
};

const confettiColors = [
  "bg-yellow-300",
  "bg-pink-400",
  "bg-purple-400",
  "bg-blue-300",
  "bg-green-300",
];

// Confetti SVG faux-animation for demo purposes
const Confetti: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex flex-wrap">
    {Array.from({ length: 35 }).map((_, idx) => (
      <div
        key={idx}
        className={`w-3 h-3 ${confettiColors[idx % confettiColors.length]} rounded-full animate-confetti`}
        style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

const ChessResultsPage: React.FC<WinPageProps> = ({
  player,
  opponent,
  gameStats,
  ratingChange,
}) => {
  return (
    <div className="relative min-h-screen w-full opacity-80 flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 overflow-hidden">
      <Confetti />
      <section className="z-10 max-w-md w-full opacity-85 bg-slate-900/80 rounded-2xl shadow-2xl backdrop-blur-md p-8 flex flex-col items-center">
        {/* Celebration Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 animate-bounce flex items-center">
          <span className="mr-2">♔</span> Victory!
        </h1>
        <p className="text-lg text-gray-200 font-semibold mb-2 animate-fadeIn">
          {player.name} wins by <span className="font-bold">{gameStats.winType}</span>
        </p>
        {/* Player Cards */}
        <div className="flex gap-3 items-center mt-2 mb-3">
          <div className="text-center">
            <span className="text-4xl">{player.avatar}</span>
            <div className="font-bold text-yellow-300">{player.name}</div>
            <div className="text-sm">Rating: {player.rating}</div>
          </div>
          <span className="font-mono text-white text-2xl font-bold p-3">vs</span>
          <div className="text-center">
            <span className="text-4xl">{opponent.avatar}</span>
            <div className="text-gray-100">{opponent.name}</div>
            <div className="text-sm">Rating: {opponent.rating}</div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="w-full grid grid-cols-2 gap-2 text-center mb-6 mt-2">
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-yellow-400">Duration</strong>
            <span>{gameStats.duration}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-yellow-400">Moves</strong>
            <span>{gameStats.moves}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-yellow-400">Time Control</strong>
            <span>{gameStats.timeControl}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-yellow-400">Rating Change</strong>
            <span
              className={`font-bold ${
                ratingChange.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {ratingChange}
            </span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl transition duration-300 shadow mb-2" onClick={() => window.location.reload()}>
            Play Again
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl transition duration-300 shadow" onClick={() => window.location.href = '/'}>
            Return to Home
          </button>
        </div>
      </section>
    </div>
  );
};



 

type LossPageProps = {
  player: Player;
  opponent: Player;
  gameStats: GameStats;
  ratingChange: string;
};

const LossPage: React.FC<LossPageProps> = ({
  player,
  opponent,
  gameStats,
  ratingChange,
}) => {
  return (
    <div className="relative min-h-screen w-full opactiy-80 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 overflow-hidden">
      <section className="z-10 max-w-md w-full bg-gray-900/90 rounded-2xl shadow-2xl backdrop-blur-md p-8 flex flex-col items-center">
        {/* Loss Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-3 animate-pulse flex items-center">
          <span className="mr-2">♚</span> Defeat
        </h1>
        <p className="text-lg text-gray-300 font-semibold mb-2">
          {player.name} lost by <span className="font-bold">{gameStats.winType}</span>
        </p>
        {/* Player Cards */}
        <div className="flex gap-3 items-center mt-2 mb-3">
          <div className="text-center opacity-60">
            <span className="text-4xl">{player.avatar}</span>
            <div className="font-bold text-red-400">{player.name}</div>
            <div className="text-sm">Rating: {player.rating}</div>
          </div>
          <span className="font-mono text-white text-2xl font-bold p-3">vs</span>
          <div className="text-center">
            <span className="text-4xl">{opponent.avatar}</span>
            <div className="text-yellow-400 font-bold">{opponent.name}</div>
            <div className="text-sm">Rating: {opponent.rating}</div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="w-full grid grid-cols-2 gap-2 text-center mb-6 mt-2">
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-red-400">Duration</strong>
            <span>{gameStats.duration}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-red-400">Moves</strong>
            <span>{gameStats.moves}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-red-400">Time Control</strong>
            <span>{gameStats.timeControl}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 shadow text-white">
            <strong className="block text-red-400">Rating Change</strong>
            <span className="font-bold text-red-600">{ratingChange}</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition duration-300 shadow mb-2" onClick={() => window.location.reload()}>
            Try Again
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl transition duration-300 shadow" onClick={() => window.location.href = '/'}>
            Return to Home
          </button>
        </div>
      </section>
    </div>
  );
};




 

type DrawPageProps = {
  player: Player;
  opponent: Player;
  gameStats: GameStats;
  ratingChange: string;
};

const DrawPage: React.FC<DrawPageProps> = ({
  player,
  opponent,
  gameStats,
  ratingChange,
}) => {
  return (
    <div className="relative w-full opacity-80 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 overflow-hidden">
      <section className="z-10 max-w-md w-full bg-slate-800/90 rounded-2xl shadow-2xl backdrop-blur-md p-8 flex flex-col items-center">
        {/* Draw Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-3 flex items-center animate-pulse">
          <span className="mr-2">♞</span> Draw
        </h1>
        <p className="text-lg text-gray-300 font-semibold mb-2 text-center">
          The game between <span className="font-bold">{player.name}</span> and{" "}
          <span className="font-bold">{opponent.name}</span> ended in a draw by <span className="font-bold">{gameStats.winType}</span>
        </p>
        {/* Player Cards */}
        <div className="flex gap-4 items-center mt-3 mb-5">
          <div className="text-center text-gray-200">
            <span className="text-4xl">{player.avatar}</span>
            <div className="font-semibold">{player.name}</div>
            <div className="text-sm">Rating: {player.rating}</div>
          </div>
          <span className="font-mono text-yellow-400 text-2xl font-bold">vs</span>
          <div className="text-center text-gray-200">
            <span className="text-4xl">{opponent.avatar}</span>
            <div className="font-semibold">{opponent.name}</div>
            <div className="text-sm">Rating: {opponent.rating}</div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="w-full grid grid-cols-2 gap-3 text-center text-white mb-6">
          <div className="bg-gray-700 rounded-lg px-4 py-3 shadow">
            <strong className="block text-yellow-400 mb-1">Duration</strong>
            <span>{gameStats.duration}</span>
          </div>
          <div className="bg-gray-700 rounded-lg px-4 py-3 shadow">
            <strong className="block text-yellow-400 mb-1">Moves</strong>
            <span>{gameStats.moves}</span>
          </div>
          <div className="bg-gray-700 rounded-lg px-4 py-3 shadow">
            <strong className="block text-yellow-400 mb-1">Time Control</strong>
            <span>{gameStats.timeControl}</span>
          </div>
          <div className="bg-gray-700 rounded-lg px-4 py-3 shadow">
            <strong className="block text-yellow-400 mb-1">Rating Change</strong>
            <span className="font-semibold">{ratingChange}</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl transition duration-300 shadow" onClick={() => window.location.reload()}>
            Play Again
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition duration-300 shadow" onClick={() => window.location.href = '/'}  >
            Return to Home
          </button>
        </div>
      </section>
    </div>
  );
};

 

interface GameOverTimeoutProps {
  player: Player;
  opponent: Player;
  playerTimeLeft: string;
  opponentTimeLeft: string;
  gameStats: {
    duration: string;
    moves: number;
    timeControl: string;
  };
  ratingChange: string;
  onPlayAgain?: () => void;
  onReturnHome?: () => void;
}

const GameOverTimeout: React.FC<GameOverTimeoutProps> = ({
  player,
  opponent,
  playerTimeLeft="  00:00",
  opponentTimeLeft="  00:00",
 
  onPlayAgain,
  onReturnHome,
}) => {
  const isPlayerTimeout = playerTimeLeft === "00:00";

  return (
    <div className="  bg-gradient-to-br from-red-900 via-gray-900 to-gray-950 flex items-center justify-center px-1">
      {/* Floating timeout icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500/20 text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⏰
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3 animate-pulse">⏰</div>
          <h1 className="text-4xl font-bold text-red-400 mb-2">Time Out!</h1>
          <p className="text-gray-300">
            {isPlayerTimeout ? "You" : opponent.name} ran out of time
          </p>
        </div>

        {/* Players Section */}
        <div className="space-y-4 mb-6">
          {/* Player Card */}
          <div className={`bg-gray-800 rounded-lg p-4 border-2 ${
            isPlayerTimeout ? "border-red-500/50" : "border-gray-600"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{player.avatar}</span>
                <div>
                  <div className={`font-semibold ${isPlayerTimeout ? "text-red-400" : "text-white"}`}>
                    {player.name}
                  </div>
                  <div className="text-sm text-gray-400">Rating: {player.rating}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-mono text-lg font-bold ${
                  isPlayerTimeout ? "text-red-500" : "text-green-400"
                }`}>
                  {playerTimeLeft}
                </div>
                <div className="text-xs text-gray-500">Time Left</div>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="text-center">
            <span className="text-gray-500 font-bold">VS</span>
          </div>

          {/* Opponent Card */}
          <div className={`bg-gray-800 rounded-lg p-4 border-2 ${
            !isPlayerTimeout ? "border-red-500/50" : "border-gray-600"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{opponent.avatar}</span>
                <div>
                  <div className={`font-semibold ${!isPlayerTimeout ? "text-red-400" : "text-white"}`}>
                    {opponent.name}
                  </div>
                  <div className="text-sm text-gray-400">Rating: {opponent.rating}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-mono text-lg font-bold ${
                  !isPlayerTimeout ? "text-red-500" : "text-green-400"
                }`}>
                  {opponentTimeLeft}
                </div>
                <div className="text-xs text-gray-500">Time Left</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        

        {/* Time Control Info */}
        

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            Play Again
          </button>
          <button
            onClick={onReturnHome}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 rounded-xl transition duration-300"
          >
            Return Home
          </button>
        </div>

        {/* Tip */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm italic">
            💡 Tip: Practice faster decision-making to avoid timeouts!
          </p>
        </div>
      </div>
    </div>
  );
};

 
 

export   {DrawPage ,LossPage,GameOverTimeout};



export default ChessResultsPage;
