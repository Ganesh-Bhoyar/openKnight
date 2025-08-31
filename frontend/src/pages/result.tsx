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
          <button className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl transition duration-300 shadow mb-2">
            Play Again
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl transition duration-300 shadow">
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
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition duration-300 shadow mb-2">
            Try Again
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl transition duration-300 shadow">
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
          <button className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl transition duration-300 shadow">
            Play Again
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition duration-300 shadow">
            Return to Home
          </button>
        </div>
      </section>
    </div>
  );
};

export   {DrawPage ,LossPage};



export default ChessResultsPage;
