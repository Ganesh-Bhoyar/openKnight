 
import back from "../assets/back.png";

const gameModes = [
  { name: "Quick Play", icon: "⚡", desc: "Jump into a game instantly with our smart matchmaking system" },
  { name: "Rated Games", icon: "🏆", desc: "Compete in ranked matches and climb the global leaderboard" },
  { name: "Tournaments", icon: "👑", desc: "Join daily tournaments and compete for prizes and glory" },
  { name: "Puzzles", icon: "🧩", desc: "Sharpen your tactical skills with thousands of chess puzzles" },
  { name: "Analysis", icon: "🔍", desc: "Analyze positions with our powerful chess engine" },
  { name: "Learn", icon: "📚", desc: "Master chess fundamentals with interactive lessons" }
];

const testimonials = [
  {
    name: "Sarah Chen", rating: 1650, avatar: "👩",
    text: "OpenKnight has the best user interface I've seen in a chess platform. The matchmaking is incredibly fast!"
  },
  {
    name: "Marcus Rodriguez", rating: 1420, avatar: "👨",
    text: "The puzzle section helped me improve my tactics tremendously. Highly recommended for beginners!"
  },
  {
    name: "Emma Thompson", rating: 1890, avatar: "👩",
    text: "Love the tournament system and the community is very welcoming. Great platform for competitive play!"
  }
];

const features = [
  "Play against players worldwide",
  "Advanced chess engine analysis",
  "Live tournaments and events",
  "Interactive chess lessons",
  "Puzzle training system",
  "Mobile-friendly design",
  "Community forums",
  "Rating and statistics tracking",
];

export default function OpenKnightHomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow fixed w-full z-50">
        <nav className="container mx-auto flex items-center justify-between py-3 px-5">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-yellow-400 text-2xl">♘</span>
            <span>OpenKnight</span>
          </div>
          <ul className="hidden md:flex gap-6 font-medium">
            <li><a href="#home" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#play" className="hover:text-yellow-400 transition">Play</a></li>
            <li><a href="/learn" className="hover:text-yellow-400 transition">Learn</a></li>
            <li><a href="#community" className="hover:text-yellow-400 transition">Community</a></li>
            
          </ul>
          <div className="flex items-center gap-3">
            <button className="bg-gray-800 rounded px-4 py-1 text-sm font-semibold hover:bg-yellow-400 hover:text-black transition" onClick={() => {window.location.href = "/login"}}>Login</button>
            <button className="bg-yellow-400 rounded px-4 py-1 text-sm font-semibold text-black hover:bg-white transition" onClick={() => {window.location.href = "/signup"}}>Sign Up</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
  <div className="h-screen w-screen bg-cover bg-center " style={{ backgroundImage: `url(${back})` }}>
 


      <section id="home" className="min-h-screen   flex flex-col items-center justify-center pt-32">
       
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">Master Your Chess Journey</h1>
          <p className="text-lg text-gray-200 mb-6">
            Join thousands of players in the ultimate online chess experience.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <button className="bg-yellow-400 text-black text-xl font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-300 transition  " onClick={() => {window.location.href = "/dashboard"}}>Start Playing</button>
            <button className="bg-gray-800 text-white text-xl font-bold px-8 py-3 rounded-lg shadow hover:bg-gray-700 transition" onClick={() => {window.location.href = "/learn"}}>Learn Chess</button>
          </div>
          {/* Animated Chess Pieces */}
          <div className="flex gap-3 justify-center text-3xl text-grey-800 animate-bounce">
            <span>♔</span>
            <span>♕</span>
            <span>♘</span>
            <span>♖</span>
            <span>♙</span>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section id="play" className="py-20 bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-10 text-center">Game Modes</h2>
          <div className="grid md:grid-cols-3 gap-6 w-full p-12">
            {gameModes.map(mode => (
              <div key={mode.name} className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center hover:bg-yellow-400 hover:text-black transition">
                <div className="text-5xl mb-3">{mode.icon}</div>
                <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
                <p className="text-gray-200 text-center">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Community */}
      <section id="community" className="py-16 bg-gray-950 p-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-800 rounded-lg py-7 px-3 text-yellow-400 text-3xl font-bold shadow">2,847<br/><span className="text-lg text-gray-200 font-normal">Players Online</span></div>
            <div className="bg-gray-800 rounded-lg py-7 px-3 text-yellow-400 text-3xl font-bold shadow">1,234,567<br/><span className="text-lg text-gray-200 font-normal">Games Played</span></div>
            <div className="bg-gray-800 rounded-lg py-7 px-3 text-yellow-400 text-3xl font-bold shadow">23<br/><span className="text-lg text-gray-200 font-normal">Active Tournaments</span></div>
            <div className="bg-gray-800 rounded-lg py-7 px-3 text-yellow-400 text-3xl font-bold shadow">456,789<br/><span className="text-lg text-gray-200 font-normal">Puzzles Solved</span></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-900 p-12 ">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Why OpenKnight?</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-200 text-lg">
            {features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-950 p-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Community Voices</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {testimonials.map(testimonial => (
              <div key={testimonial.name} className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full">
                <div className="flex gap-3 items-center mb-3">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <span className="text-lg font-bold text-yellow-400">{testimonial.name}</span>
                  <span className="text-gray-300 text-sm">({testimonial.rating})</span>
                </div>
                <p className="text-gray-200 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 p-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <span className="text-yellow-400 text-2xl">♘</span>
            <span className="font-bold ml-1">OpenKnight</span>
            <span className="ml-3 text-sm">© 2025 All Rights Reserved</span>
          </div>
          <div className="flex gap-5 my-2">
            <a href="#" className="hover:text-yellow-400">About</a>
            <a href="#" className="hover:text-yellow-400">Contact</a>
            <a href="#" className="hover:text-yellow-400">Privacy</a>
            <a href="#" className="hover:text-yellow-400">Terms</a>
          </div>
          <div>
            <span className="text-sm">Get updates:</span>
            <input className="bg-gray-800 px-2 py-1 ml-2 rounded text-white" placeholder="Your email" />
            <button className="bg-yellow-400 rounded px-3 py-1 ml-2 text-black hover:bg-yellow-300 transition">Subscribe</button>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
