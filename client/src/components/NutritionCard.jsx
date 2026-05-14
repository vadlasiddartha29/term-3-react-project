import { useState } from 'react'

// ── Nutrient row component ────────────────────────────────────────────────────
function NutrientRow({ label, value, unit, color = 'brand', icon }) {
  const colorMap = {
    brand: 'bg-brand-50 text-brand-700 border-brand-100',
    blue: 'bg-blue-50  text-blue-700  border-blue-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    rose: 'bg-rose-50  text-rose-700   border-rose-100',
    amber: 'bg-amber-50 text-amber-700  border-amber-100',
    cyan: 'bg-cyan-50  text-cyan-700   border-cyan-100',
  }
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${colorMap[color]} transition-all hover:scale-[1.01]`}>
      <div className="flex items-center gap-2.5">
        <span className="text-base">{icon}</span>
        <span className="text-sm font-bold text-slate-700">{label}</span>
      </div>
      <span className="font-bold text-sm">
        {value}
        <span className="font-normal text-xs ml-0.5 opacity-70">{unit}</span>
      </span>
    </div>
  )
}

// ── Big calorie ring ──────────────────────────────────────────────────────────
function CalorieRing({ calories }) {
  const maxCal = 800
  const pct = Math.min(calories / maxCal, 1)
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - pct)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 112 112">
          {/* Track */}
          <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="8" />
          {/* Progress */}
          <circle
            cx="56" cy="56" r={radius}
            fill="none"
            stroke="url(#calGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
          <defs>
            <linearGradient id="calGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>
        {/* Text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900 leading-none">{calories.toLocaleString()}</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">kcal</span>
        </div>
      </div>
      <span className="text-slate-500 text-xs font-medium mt-2">Calories per serving</span>
    </div>
  )
}

// ── Main NutritionCard ────────────────────────────────────────────────────────
export default function NutritionCard({ food, imageUrl, imageAlt, credit }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const displayImage = !imgError && (imageUrl || food.highResPhoto || food.thumbnail)
  const imgSrc = imageUrl || food.highResPhoto || food.thumbnail

  return (
    <div className="glass-card animate-slide-up overflow-hidden">
      {/* ── Image banner ── */}
      {displayImage && (
        <div className="relative h-52 sm:h-64 bg-slate-800 overflow-hidden">
          <img
            src={imgSrc}
            alt={imageAlt || food.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
          {/* Food name overlay */}
          <div className="absolute bottom-4 left-5">
            <h2 className="text-2xl font-black text-white capitalize drop-shadow-md">{food.name}</h2>
            {food.brandName && <p className="text-brand-300 text-sm font-bold">{food.brandName}</p>}
          </div>
          {/* Unsplash credit */}
          {credit?.photographer && (
            <a
              href={credit.profileLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 text-xs text-slate-400 hover:text-white transition-colors"
            >
              📷 {credit.photographer}
            </a>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* No image fallback header */}
        {!displayImage && (
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-3xl shadow-sm">
              🍽️
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 capitalize">{food.name}</h2>
              {food.brandName && <p className="text-brand-600 text-sm font-bold">{food.brandName}</p>}
            </div>
          </div>
        )}

        {/* Serving info */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Serving:</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-brand-600 border border-brand-100 bg-brand-50 shadow-sm">
            {food.servingQty} {food.servingUnit}
          </span>
          {food.servingWeightGrams && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-100 bg-slate-50 shadow-sm">
              ~{food.servingWeightGrams}g
            </span>
          )}
        </div>

        {/* ── Calorie ring + macros ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Calorie Ring */}
          <CalorieRing calories={food.calories} />

          {/* Macro breakdown */}
          <div className="flex flex-col gap-2.5 justify-center">
            <p className="section-label">Macronutrients</p>
            <NutrientRow icon="💪" label="Protein" value={food.protein} unit="g" color="blue" />
            <NutrientRow icon="🌾" label="Carbohydrates" value={food.carbs} unit="g" color="amber" />
            <NutrientRow icon="🧈" label="Total Fat" value={food.fat} unit="g" color="orange" />
            <NutrientRow icon="🌿" label="Fiber" value={food.fiber} unit="g" color="brand" />
          </div>
        </div>

        {/* ── Additional Nutrients ── */}
        <div className="mb-6">
          <p className="section-label mb-3">Additional Nutrients</p>
          <div className="grid grid-cols-2 gap-2.5">
            <NutrientRow icon="🍬" label="Sugars" value={food.sugar} unit="g" color="rose" />
            <NutrientRow icon="🧂" label="Sodium" value={food.sodium} unit="mg" color="cyan" />
            <NutrientRow icon="🫀" label="Potassium" value={food.potassium} unit="mg" color="purple" />
            <NutrientRow icon="🧬" label="Sat. Fat" value={food.saturatedFat} unit="g" color="orange" />
            <NutrientRow icon="🩸" label="Cholesterol" value={food.cholesterol} unit="mg" color="rose" />
          </div>
        </div>

        {/* ── Vitamins & Minerals ── */}
        {food.vitamins && (
          <div>
            <p className="section-label mb-3">Vitamins & Minerals</p>
            <div className="grid grid-cols-2 gap-2.5">
              {food.vitamins.vitaminA > 0 && <NutrientRow icon="🟠" label="Vitamin A" value={food.vitamins.vitaminA} unit="IU" color="amber" />}
              {food.vitamins.vitaminC > 0 && <NutrientRow icon="🍊" label="Vitamin C" value={food.vitamins.vitaminC} unit="mg" color="orange" />}
              {food.vitamins.vitaminD > 0 && <NutrientRow icon="☀️" label="Vitamin D" value={food.vitamins.vitaminD} unit="IU" color="amber" />}
              {food.vitamins.vitaminE > 0 && <NutrientRow icon="🌻" label="Vitamin E" value={food.vitamins.vitaminE} unit="mg" color="brand" />}
              {food.vitamins.vitaminK > 0 && <NutrientRow icon="🥬" label="Vitamin K" value={food.vitamins.vitaminK} unit="mcg" color="brand" />}
              {food.vitamins.calcium > 0 && <NutrientRow icon="🦷" label="Calcium" value={food.vitamins.calcium} unit="mg" color="blue" />}
              {food.vitamins.iron > 0 && <NutrientRow icon="⚙️" label="Iron" value={food.vitamins.iron} unit="mg" color="rose" />}
            </div>
            {Object.values(food.vitamins).every(v => v === 0) && (
              <p className="text-slate-400 text-xs text-center py-4 font-medium italic">Vitamin data not available for this item</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
