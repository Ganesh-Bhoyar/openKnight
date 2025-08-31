import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChessWaitingPageProps {
  wait: React.Dispatch<React.SetStateAction<boolean>>;
}

const waitingStates = [
  "Searching for opponent...",
  "Found a player! Preparing game...",
  "Almost ready...",
  "Connecting..."
];

const chessSymbols = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

const estimatedWaitTimes = ["< 30 seconds", "< 1 minute", "< 2 minutes"];

interface PlayerCounts {
  online: number[];
  searching: number[];
  games: number[];
}

const playerCounts: PlayerCounts = {
  online: [220, 234, 245, 256, 243, 238],
  searching: [140, 156, 167, 149, 158, 162],
  games: [78, 89, 92, 87, 95, 91]
};

const getRandomFromArray = <T,>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const ChessWaitingPage = ( {wait} :ChessWaitingPageProps) => {
  const [statusText, setStatusText] = useState(waitingStates[0]);
  const [spinnerPiece, setSpinnerPiece] = useState("♔");
  const [isSearching, setIsSearching] = useState(true);
  const [searchStartTime] = useState(Date.now());
  const [waitTime, setWaitTime] = useState(estimatedWaitTimes[0]);
  const [counts, setCounts] = useState({
    online: 220,
    searching: 140,
    games: 78
  });

  // Animate player counts
  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => {
      setCounts({
        online: getRandomFromArray(playerCounts.online),
        searching: getRandomFromArray(playerCounts.searching),
        games: getRandomFromArray(playerCounts.games)
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isSearching]);

  // Spinner piece cycle
  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => {
      setSpinnerPiece(getRandomFromArray(chessSymbols));
    }, 2000);
    return () => clearInterval(interval);
  }, [isSearching]);

  // Wait time estimate
  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - searchStartTime;
      if (elapsed < 30000) setWaitTime(estimatedWaitTimes[0]);
      else if (elapsed < 60000) setWaitTime(estimatedWaitTimes[1]);
      else setWaitTime(estimatedWaitTimes[2]);
    }, 10000);
    return () => clearInterval(interval);
  }, [isSearching, searchStartTime]);

  // Simulate search phases
  useEffect(() => {
    if (!isSearching) return;
    const phases = [
      { delay: 5000, message: waitingStates[0] },
      { delay: 12000, message: "Analyzing player pool..." },
      { delay: 18000, message: "Matching skill levels..." },
      { delay: 25000, message: waitingStates[1] },
      { delay: 28000, message: waitingStates[2] },
      { delay: 30000, message: waitingStates[3] }
    ];
    phases.forEach((phase) => {
      setTimeout(() => {
        if (isSearching) setStatusText(phase.message);
      }, phase.delay);
    });
  }, [isSearching]);

  return (
    <div className="min-h-screen w-full opacity-80 flex flex-col items-center justify-center bg-gray-900 text-white gap-6">
      {/* Spinner */}
      <motion.div
        className="text-6xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      >
        {spinnerPiece}
      </motion.div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={statusText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xl"
        >
          {statusText}
        </motion.div>
      </AnimatePresence>

      {/* Wait time */}
      <div className="text-sm text-gray-400">Estimated wait: {waitTime}</div>

      {/* Player counts */}
      <div className="flex gap-6 text-lg">
        <div>Online: {counts.online}</div>
        <div>Searching: {counts.searching}</div>
        <div>Games: {counts.games}</div>
      </div>

      {/* Cancel button */}
      <button
        onClick={() => wait(false)}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
      >
        Cancel Search
      </button>

      {!isSearching && (
        <div className="mt-6 text-red-400">Search canceled. Returning...</div>
      )}
    </div>
  );
};

export default ChessWaitingPage;
