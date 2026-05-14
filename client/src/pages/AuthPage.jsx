import { useState } from 'react'
import Navbar from '../components/Navbar'
import CustomSignIn from '../components/CustomSignIn'
import CustomSignUp from '../components/CustomSignUp'

const DotPattern = ({ className }) => (
  <div className={`grid grid-cols-4 gap-4 ${className}`}>
    {[...Array(16)].map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />
    ))}
  </div>
)

const FeatureIcon = ({ children }) => (
  <div className="w-10 h-10 bg-[#f0f9f1] rounded-xl flex items-center justify-center text-xl shrink-0">
    {children}
  </div>
)

export default function AuthPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'

  return (
    <div className="auth-page-light h-screen w-full relative flex flex-col overflow-hidden bg-[#fcfdfc]">
      <Navbar />

      {/* Decorative background patterns */}
      <DotPattern className="absolute top-20 left-10 opacity-60" />
      <DotPattern className="absolute bottom-40 right-10 opacity-60" />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-1 px-6 lg:px-12 items-center">

        {/* Left Column (Brand info & Image) */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 pr-12 animate-fade-in pl-8">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shadow-sm" style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}>
              <span className="text-white text-base">🌱</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Nutrition Finder</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Eat smart. <br />
            <span className="text-brand-600">Live healthy.</span>
          </h1>

          <p className="text-slate-500 leading-relaxed mb-6 max-w-md">
            Nutrition Finder helps you discover the right food, track nutrients, and build better eating habits for a healthier you.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <FeatureIcon>🌱</FeatureIcon>
              <div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Personalized Insights</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">Get tailored nutrition recommendations based on your goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FeatureIcon>📊</FeatureIcon>
              <div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Track & Improve</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">Monitor your nutrients and build healthier habits every day.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FeatureIcon>🛡️</FeatureIcon>
              <div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Trusted & Reliable</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">Backed by nutrition science and verified data.</p>
              </div>
            </div>
          </div>

          {/* <div className="absolute bottom-[-10%] left-[-15%] w-[450px] lg:w-[550px] pointer-events-none z-20">
            <img
              src="https://png.pngtree.com/png-clipart/20241121/original/pngtree-salad-png-image_17276899.png"
              alt="Healthy Bowl"
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] opacity-95"
            />
          </div> */}
        </div>

        {/* Right Column (Auth Card) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 animate-slide-up">
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-50 p-8 sm:p-10 relative overflow-hidden">

            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-[#f0f9f1] rounded-full mb-4 text-xl">
                🌱
              </div>
              <h2 className="text-[22px] font-black text-slate-900 mb-1 tracking-tight">
                {mode === 'signin' ? 'Welcome back!' : 'Create an account'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                {mode === 'signin' ? 'Sign in to continue your health journey' : 'Join us to start your healthy life today'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-slate-100 mb-8">
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 pb-3 text-xs font-bold transition-all relative ${mode === 'signin' ? 'text-brand-600' : 'text-slate-300 hover:text-slate-500'
                  }`}
              >
                Sign In
                {mode === 'signin' && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-600 rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 pb-3 text-xs font-bold transition-all relative ${mode === 'signup' ? 'text-brand-600' : 'text-slate-300 hover:text-slate-500'
                  }`}
              >
                Sign Up
                {mode === 'signup' && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-600 rounded-t-full"></div>
                )}
              </button>
            </div>

            {/* Auth Content */}
            <div className="flex justify-center flex-col min-h-[340px]">
              {mode === 'signin' ? (
                <>
                  <CustomSignIn />
                  <div className="mt-4 text-center">
                    <p className="text-[12px] text-slate-400 font-medium">
                      Don't have an account? <button onClick={() => setMode('signup')} className="text-brand-600 font-bold hover:underline">Sign up</button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <CustomSignUp />
                  <div className="mt-4 text-center">
                    <p className="text-[12px] text-slate-400 font-medium">
                      Already have an account? <button onClick={() => setMode('signin')} className="text-brand-600 font-bold hover:underline">Sign in</button>
                    </p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
