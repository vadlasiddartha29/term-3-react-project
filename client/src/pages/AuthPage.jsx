import { SignIn, SignUp } from '@clerk/clerk-react'
import { useState } from 'react'

export default function AuthPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'

  return (
    <div className="auth-page-light">
      
      {/* Animated subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[0.04] blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}
        />
        <div
          className="absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #15803d, transparent)', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex min-h-screen">
        
        {/* Left Column (Brand info & Image) */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 pr-12 animate-fade-in pl-8">
          
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-sm" style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}>
              🥦
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Nutrition Finder</span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Eat smart. <br />
            <span className="text-brand-600">Live healthy.</span>
          </h1>
          
          <p className="text-slate-500 leading-relaxed mb-12 max-w-md">
            Nutrition Finder helps you discover the right food, track nutrients, and build better eating habits for a healthier you.
          </p>

          <div className="space-y-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0">🌱</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Personalized Insights</h3>
                <p className="text-sm text-slate-500">Get tailored nutrition recommendations based on your goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0">📊</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Track & Improve</h3>
                <p className="text-sm text-slate-500">Monitor your nutrients and build healthier habits every day.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0">🛡️</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Trusted & Reliable</h3>
                <p className="text-sm text-slate-500">Backed by nutrition science and verified data.</p>
              </div>
            </div>
          </div>

          {/* Bottom left image */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl mt-auto mb-8 border-4 border-white">
            <img 
              src="./auth_salad.png" 
              alt="Healthy Bowl" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column (Auth Card) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 animate-slide-up">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 p-8 sm:p-10 relative">
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-2xl mb-4 text-brand-600 text-xl">
                🌱
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back!</h2>
              <p className="text-sm text-slate-500">Sign in to continue your health journey</p>
            </div>

            {/* Custom Tab Switcher */}
            <div className="flex border-b border-slate-200 mb-8">
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                  mode === 'signin' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
                {mode === 'signin' && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                  mode === 'signup' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign Up
                {mode === 'signup' && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>
                )}
              </button>
            </div>

            {/* Clerk Component wrapper */}
            <div className="flex justify-center">
              {mode === 'signin' ? (
                <SignIn
                  routing="hash"
                  signUpUrl="/auth#signup"
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'w-full shadow-none bg-transparent p-0 border-0',
                      header: 'hidden',
                      footer: 'hidden'
                    },
                  }}
                />
              ) : (
                <SignUp
                  routing="hash"
                  signInUrl="/auth"
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'w-full shadow-none bg-transparent p-0 border-0',
                      header: 'hidden',
                      footer: 'hidden'
                    },
                  }}
                />
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
