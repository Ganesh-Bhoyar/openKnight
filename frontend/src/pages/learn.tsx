import React, { useState } from "react";

interface Lesson {
  id: number;
  title: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  completed: boolean;
}

interface Course {
  id: number;
  title: string;
  icon: string;
  lessons: number;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const courses: Course[] = [
  {
    id: 1,
    title: "Chess Fundamentals",
    icon: "♙",
    lessons: 12,
    description: "Master the basics: piece movement, rules, and board setup",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Opening Principles",
    icon: "♘",
    lessons: 8,
    description: "Learn essential opening moves and development strategies",
    level: "Beginner"
  },
  {
    id: 3,
    title: "Tactical Training",
    icon: "⚔️",
    lessons: 15,
    description: "Master pins, forks, skewers, and tactical combinations",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Endgame Mastery",
    icon: "♔",
    lessons: 10,
    description: "Convert advantages and master essential endgame patterns",
    level: "Advanced"
  }
];

const lessons: Lesson[] = [
  {
    id: 1,
    title: "How Pieces Move",
    icon: "♟️",
    level: "Beginner",
    duration: "5 min",
    description: "Learn how each chess piece moves and captures",
    completed: true
  },
  {
    id: 2,
    title: "Check and Checkmate",
    icon: "👑",
    level: "Beginner", 
    duration: "8 min",
    description: "Understand check, checkmate, and stalemate",
    completed: true
  },
  {
    id: 3,
    title: "Pin Tactics",
    icon: "📌",
    level: "Intermediate",
    duration: "12 min",
    description: "Master absolute and relative pins",
    completed: false
  },
  {
    id: 4,
    title: "Fork Combinations",
    icon: "🔱",
    level: "Intermediate",
    duration: "10 min", 
    description: "Learn to attack multiple pieces simultaneously",
    completed: false
  }
];

const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"courses" | "lessons" | "practice">("courses");

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Beginner": return "text-green-400 bg-green-400/20";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/20";
      case "Advanced": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 text-white">
      {/* Header */}
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">
          Learn Chess
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Master chess with structured courses, interactive lessons, and practice exercises
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-1 flex">
          {[
            { key: "courses", label: "Courses", icon: "📚" },
            { key: "lessons", label: "Lessons", icon: "🎯" },
            { key: "practice", label: "Practice", icon: "⚡" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-md flex items-center gap-2 transition ${
                activeTab === tab.key
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition cursor-pointer border border-gray-700 hover:border-yellow-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{course.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.lessons} lessons</span>
                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                      Start Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div>
            <div className="grid gap-4 mb-8">
              {lessons.map(lesson => (
                <div
                  key={lesson.id}
                  className="bg-gray-800 rounded-lg p-6 flex items-center gap-4 hover:bg-gray-700 transition cursor-pointer border border-gray-700"
                >
                  <div className="text-3xl">{lesson.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getLevelColor(lesson.level)}`}>
                        {lesson.level}
                      </span>
                      {lesson.completed && (
                        <span className="text-green-400 text-sm">✓ Completed</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{lesson.description}</p>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-semibold transition ${
                    lesson.completed
                      ? "bg-gray-600 text-gray-300"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`}>
                    {lesson.completed ? "Review" : "Start"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === "practice" && (
          <div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Tactical Puzzles",
                  icon: "🧩",
                  description: "Solve chess puzzles to improve pattern recognition",
                  count: "1,247 puzzles"
                },
                {
                  title: "Endgame Trainer", 
                  icon: "🏁",
                  description: "Practice essential endgame positions",
                  count: "156 positions"
                },
                {
                  title: "Opening Explorer",
                  icon: "🔍", 
                  description: "Study opening variations and theory",
                  count: "50+ openings"
                }
              ].map(practice => (
                <div
                  key={practice.title}
                  className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition cursor-pointer border border-gray-700 hover:border-yellow-400/50"
                >
                  <div className="text-4xl mb-4">{practice.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{practice.title}</h3>
                  <p className="text-gray-400 mb-4">{practice.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{practice.count}</p>
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition w-full">
                    Practice Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
