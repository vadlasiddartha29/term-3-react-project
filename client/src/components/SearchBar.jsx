import { useState } from 'react'

const SUGGESTIONS = ['Apple', 'Chicken breast', 'Biryani', 'Dosa', 'Avocado', 'Salmon', 'Brown rice', 'Greek yogurt']

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  const handleSuggestion = (s) => {
    setQuery(s)
    onSearch(s)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">
          🔍
        </div>

        <input
          id="food-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search any food… apple, biryani, dosa, chicken"
          className="search-input pl-14 pr-36"
          autoComplete="off"
          disabled={isLoading}
        />

        <button
          id="btn-search"
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-5 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Searching
            </span>
          ) : (
            'Analyze →'
          )}
        </button>
      </form>

      {/* Quick suggestion chips */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            id={`btn-suggestion-${s.toLowerCase().replace(/\s/g, '-')}`}
            onClick={() => handleSuggestion(s)}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 border border-slate-200 bg-white hover:border-brand-500/50 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 disabled:opacity-40 shadow-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
