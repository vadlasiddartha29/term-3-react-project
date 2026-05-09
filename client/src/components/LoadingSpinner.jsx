export default function LoadingSpinner({ message = 'Analyzing nutrition data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      {/* Pulsing ring + spinner */}
      <div className="relative w-20 h-20 mb-6">
        {/* Outer pulse ring */}
        <span
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: 'transparent',
            border: '2px solid #22c55e',
            animation: 'pulseRing 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
          }}
        />
        {/* Spinning arc */}
        <svg
          className="w-20 h-20 animate-spin"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40" cy="40" r="34"
            stroke="rgba(34,197,94,0.15)"
            strokeWidth="6"
          />
          <path
            d="M40 6 a34 34 0 0 1 34 34"
            stroke="url(#spinnerGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="spinnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🔍
        </div>
      </div>

      <p className="text-slate-300 font-medium text-lg">{message}</p>
      <p className="text-slate-500 text-sm mt-1">Fetching detailed nutritional data</p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-brand-500"
            style={{
              animation: 'bounce 1.2s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
