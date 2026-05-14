import { useState, useCallback } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import NutritionCard from '../components/NutritionCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

// ── Local history helpers ─────────────────────────────────────────────────────
const HISTORY_KEY = 'nutrition_search_history'

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
}

function addToHistory(query) {
  const prev = getHistory().filter(q => q.toLowerCase() !== query.toLowerCase())
  const updated = [query, ...prev].slice(0, 8)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  return updated
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { getToken } = useAuth()

  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [results, setResults] = useState([])    // array of food objects
  const [imageData, setImageData] = useState({}) // { [foodName]: { imageUrl, alt, credit } }
  const [error, setError] = useState('')
  const [lastQuery, setLastQuery] = useState('')
  const [history, setHistory] = useState(getHistory)

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return
    setStatus('loading')
    setError('')
    setResults([])
    setImageData({})
    setLastQuery(query)

    try {
      const token = await getToken()

      // 1️⃣  Fetch nutrition data
      const { data } = await axios.post(
        `${API_URL}/api/nutrition`,
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const foods = data.foods || []
      setResults(foods)

      // Update local history
      const updated = addToHistory(query)
      setHistory(updated)

      // 2️⃣  Fetch images for each food (non-blocking)
      const imagePromises = foods.map(async (food) => {
        try {
          const imgRes = await axios.get(`${API_URL}/api/image`, {
            params: { q: food.name },
            headers: { Authorization: `Bearer ${token}` },
          })
          return { name: food.name, ...imgRes.data }
        } catch {
          return { name: food.name, imageUrl: null }
        }
      })

      Promise.all(imagePromises).then((imgs) => {
        const map = {}
        imgs.forEach((img) => { map[img.name] = img })
        setImageData(map)
      })

      setStatus('success')
    } catch (err) {
      console.error('[Dashboard Search Error]', {
        apiUrl: `${API_URL}/api/nutrition`,
        error: err.message,
        response: err.response?.data
      });
      const msg =
        err.response?.data?.error ||
        (err.response?.status === 404
          ? `No nutrition data found for "${query}". Try a different spelling.`
          : 'Something went wrong. Please check your connection and try again.')
      setError(msg)
      setStatus('error')
    }
  }, [getToken])

  const handleClearHistory = () => {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Hero section ── */}
        <div className="text-center mb-10 animate-fade-in pt-6">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 leading-tight">
            What's in your{' '}
            <span style={{ background: 'linear-gradient(90deg, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              food?
            </span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Search any food and get instant, detailed nutritional information.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />
        </div>

        {/* ── Search history ── */}
        {history.length > 0 && status === 'idle' && (
          <div className="glass-card p-5 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">🕐 Recent Searches</span>
              <button
                id="btn-clear-history"
                onClick={handleClearHistory}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((q) => (
                <button
                  key={q}
                  id={`btn-history-${q.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => handleSearch(q)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 border border-slate-200 bg-white hover:border-brand-500/50 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 capitalize shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading state ── */}
        {status === 'loading' && <LoadingSpinner message={`Analyzing "${lastQuery}"…`} />}

        {/* ── Error state ── */}
        {status === 'error' && (
          <ErrorMessage
            message={error}
            onRetry={() => setStatus('idle')}
          />
        )}

        {/* ── Results ── */}
        {status === 'success' && results.length > 0 && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-slate-500 text-sm font-medium">Results for</p>
                <h2 className="text-xl font-bold text-slate-900 capitalize">"{lastQuery}"</h2>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-600 border border-brand-100 shadow-sm">
                {results.length} item{results.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="grid gap-6">
              {results.map((food, idx) => {
                const img = imageData[food.name] || {}
                return (
                  <NutritionCard
                    key={`${food.name}-${idx}`}
                    food={food}
                    imageUrl={img.imageUrl}
                    imageAlt={img.alt}
                    credit={img.credit}
                  />
                )
              })}
            </div>

            {/* New search CTA */}
            <div className="text-center mt-8">
              <button
                id="btn-new-search"
                onClick={() => setStatus('idle')}
                className="btn-primary"
              >
                🔍 Search another food
              </button>
            </div>
          </div>
        )}

        {/* ── Idle welcome state ── */}
        {status === 'idle' && history.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-7xl mb-5">🥗</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Start exploring nutrition</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
              Type any food above — whole foods, dishes, or brands — and get a complete nutritional breakdown instantly.
            </p>
            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg mx-auto">
              {[
                { icon: '⚡', label: 'Instant results' },
                { icon: '🔬', label: 'Detailed data' },
                { icon: '📊', label: 'Vitamins & minerals' },
              ].map(({ icon, label }) => (
                <div key={label} className="glass-card p-4">
                  <div className="text-2xl mb-2">{icon}</div>
                  <span className="text-xs text-slate-500 font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-16 py-8 text-center text-slate-500 text-xs">
        <p>Nutrition data powered by <span className="text-slate-700 font-medium">Nutritionix</span> · Images by <span className="text-slate-700 font-medium">Unsplash</span></p>
      </footer>
    </div>
  )
}
