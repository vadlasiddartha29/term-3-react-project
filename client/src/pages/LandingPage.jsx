import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function LandingPage() {
  return (
    <div className="h-screen w-full bg-[#fcfdfd] text-slate-800 font-sans overflow-hidden flex flex-col relative">

      {/* Decorative background leaves (simplified with CSS) */}
      <div className="absolute top-0 right-0 w-[60vh] h-[60vh] bg-green-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/4"></div>

      <Navbar />

      {/* Main Content */}
      <main className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 flex items-center relative z-10 min-h-0">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 relative z-20 flex flex-col justify-center h-full pb-4 lg:pb-10">

          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-md text-[10px] lg:text-xs font-semibold mb-4 lg:mb-6 self-start">
            <span className="text-brand-500">🌱</span> Smart Nutrition. Better You.
          </div>

          <h1 className="font-bold text-slate-900 tracking-tight leading-[1.1] mb-4 lg:mb-6" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)' }}>
            Discover better food <br /> choices for a <br />
            <span className="text-brand-600">healthier you.</span>
          </h1>

          <p className="text-sm lg:text-base text-slate-500 leading-relaxed mb-6 lg:mb-10 max-w-[400px] lg:max-w-md">
            Nutrition Finder helps you discover the right foods, track nutrients, and build sustainable healthy habits — effortlessly.
          </p>

          <div className="relative inline-block mb-8 lg:mb-12 self-start">
            <Link to="/auth" className="inline-flex items-center gap-3 bg-brand-600 text-white px-5 py-3 lg:px-6 lg:py-4 rounded-xl font-semibold text-base lg:text-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20">
              <span className="text-lg lg:text-xl">🌱</span>
              Start Your Journey
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white text-brand-600 rounded-full flex items-center justify-center ml-2 lg:ml-4 shadow-sm text-sm lg:text-base">
                →
              </div>
            </Link>

            {/* Handwritten note & arrow */}
            <div className="absolute top-1/2 left-full ml-2 lg:ml-4 -translate-y-1/2 hidden xl:flex items-center gap-2 min-w-[200px]">
              <svg width="30" height="15" viewBox="0 0 40 20" fill="none" className="text-brand-500">
                <path d="M0 10 Q 20 -5 40 10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M35 5 L 40 10 L 32 12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="font-['Caveat',cursive,sans-serif] text-brand-600 text-base lg:text-lg rotate-[-5deg] leading-tight">
                Personalized insights <br /> just for you
              </span>
            </div>
          </div>

          {/* Avatar group */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 lg:-space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs shadow-sm overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="user" className="w-full h-full" /></div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs shadow-sm overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="user" className="w-full h-full" /></div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs shadow-sm overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nala" alt="user" className="w-full h-full" /></div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-brand-600 border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-bold text-white shadow-sm">+10K</div>
            </div>
            <div className="text-[11px] lg:text-sm text-slate-500">
              <span className="block font-semibold text-slate-700">Join 10,000+ happy users</span>
              living healthier lives.
            </div>
          </div>

        </div>

        {/* Right Content - Huge Image and Floating Cards */}
        <div className="hidden lg:flex w-1/2 h-full absolute right-0 top-0 items-center justify-end z-10 overflow-visible pointer-events-none">

          <div className="relative w-[70vh] max-w-[800px] aspect-square flex items-center justify-center translate-x-[5%] lg:translate-x-[10%]">
            <img
              src="https://png.pngtree.com/png-clipart/20241121/original/pngtree-salad-png-image_17276899.png"
              alt="Healthy Salad Bowl"
              className="w-full h-full object-contain object-right drop-shadow-2xl"
            />

            {/* Top Card - Track Progress */}
            <div className="absolute top-[5%] left-[-8%] bg-white/80 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 lg:p-4 border border-white/20 w-48 lg:w-56 z-20 animate-float pointer-events-auto rotate-[-2deg]" style={{ animationDelay: '0s' }}>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-50 rounded-lg flex items-center justify-center text-brand-600 mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xs lg:text-sm mb-1">Track Progress</h3>
              <p className="text-[10px] lg:text-xs text-slate-500 leading-relaxed mb-2 lg:mb-3">Monitor your nutrients and daily goals.</p>
              <div className="w-full h-4 lg:h-6 flex items-center justify-between gap-1">
                <svg className="w-full h-full text-brand-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Middle Card - Smart Insights */}
            <div className="absolute top-[38%] left-[-20%] bg-white/80 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 lg:p-4 border border-white/20 w-48 lg:w-56 z-30 animate-float pointer-events-auto rotate-[3deg]" style={{ animationDelay: '1.5s' }}>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-50 rounded-lg flex items-center justify-center text-brand-600 mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xs lg:text-sm mb-1">Smart Insights</h3>
              <p className="text-[10px] lg:text-xs text-slate-500 leading-relaxed mb-2 lg:mb-3">Personalized nutrition recommendations just for you.</p>
              <div className="flex gap-0.5 text-brand-500">
                {'★★★★★'.split('').map((star, i) => <span key={i} className="text-sm lg:text-base">{star}</span>)}
              </div>
            </div>

            {/* Bottom Card - Healthier You */}
            <div className="absolute top-[68%] left-[-5%] bg-white/80 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 lg:p-4 border border-white/20 w-48 lg:w-56 z-20 animate-float pointer-events-auto rotate-[-1deg]" style={{ animationDelay: '3s' }}>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-50 rounded-lg flex items-center justify-center text-brand-600 mb-2 lg:mb-3">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xs lg:text-sm mb-1">Healthier You</h3>
              <p className="text-[10px] lg:text-xs text-slate-500 leading-relaxed mb-3 lg:mb-4">Build better habits for a better life.</p>
              <div className="flex items-center justify-between text-[10px] lg:text-xs text-slate-400 font-medium">
                <span>+</span>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-brand-500 flex items-center justify-center text-brand-600 font-bold text-xs lg:text-sm">
                  85%
                </div>
                <span>+</span>
              </div>
            </div>

            {/* Subtle dotted connection lines (SVG background overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ opacity: 0.2 }} viewBox="0 0 100 100">
              <path d="M 20 25 Q 30 50 10 50 T 20 80" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            </svg>

          </div>
        </div>
      </main>
    </div>
  )
}
