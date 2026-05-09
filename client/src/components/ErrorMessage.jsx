export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5"
        style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
      >
        😕
      </div>
      <h3 className="text-xl font-bold text-slate-200 mb-2">Oops! Not Found</h3>
      <p className="text-slate-400 text-center max-w-xs text-sm leading-relaxed">{message}</p>
      {onRetry && (
        <button
          id="btn-retry"
          onClick={onRetry}
          className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-brand-400 border border-brand-500/30 hover:bg-brand-500/10 transition-all duration-200"
        >
          Try another food →
        </button>
      )}
    </div>
  )
}
