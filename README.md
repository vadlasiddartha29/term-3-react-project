# 🥦 Nutrition Finder

A full-stack web application to search any food and get detailed nutritional information — powered by Clerk authentication, Nutritionix, and Unsplash.

---

## 📁 Folder Structure

```
term-3 react project/
├── client/                          ← React + Vite + Tailwind CSS + Clerk
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           ← Top nav with user info + logout
│   │   │   ├── SearchBar.jsx        ← Food search input + suggestions
│   │   │   ├── NutritionCard.jsx    ← Full nutrition display card
│   │   │   ├── LoadingSpinner.jsx   ← Animated loading state
│   │   │   └── ErrorMessage.jsx     ← Error display
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx         ← Login / Signup (Clerk)
│   │   │   └── Dashboard.jsx        ← Main app after login
│   │   ├── App.jsx                  ← Router + route protection
│   │   ├── main.jsx                 ← ClerkProvider root
│   │   └── index.css                ← Tailwind + custom styles
│   ├── .env                         ← Your env vars (create from .env.example)
│   ├── .env.example                 ← Template
│   ├── tailwind.config.js
│   └── index.html
│
└── server/                          ← Node.js + Express API proxy
    ├── routes/
    │   ├── nutrition.js             ← POST /api/nutrition
    │   └── image.js                 ← GET  /api/image
    ├── middleware/
    │   └── verifyClerk.js           ← JWT verification
    ├── index.js                     ← Express entry point
    ├── .env                         ← Your env vars (create from .env.example)
    └── .env.example                 ← Template
```

---

## 🔑 Step 1 — Get Your API Keys

### 1. Clerk (Authentication)
1. Go to https://clerk.com and create a free account
2. Click **"Create application"** → name it "Nutrition Finder"
3. Enable **Email/Password** and optionally **Google** sign-in
4. Go to **API Keys** in the sidebar
5. Copy:
   - **Publishable Key** → starts with `pk_test_...` (goes in `client/.env`)
   - **Secret Key** → starts with `sk_test_...` (goes in `server/.env`)

### 2. Nutritionix (Nutrition Data)
1. Go to https://www.nutritionix.com/business/api
2. Click **"Sign Up for Free"** → fill in the form (select "Developer / Student")
3. After signup, go to your **Dashboard**
4. Copy your **App ID** and **API Key**
5. Free tier: 500 requests/day (plenty for development)

### 3. Unsplash (Food Images)
1. Go to https://unsplash.com/developers
2. Click **"Your apps"** → **"New Application"**
3. Accept the terms, name it "Nutrition Finder"
4. Copy your **Access Key**
5. Free tier: 50 requests/hour

---

## ⚙️ Step 2 — Set Up Environment Variables

### Backend (`server/.env`)
```bash
# Copy the example file
copy server\.env.example server\.env
```

Then open `server/.env` and fill in:
```env
PORT=5000
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY
NUTRITIONIX_APP_ID=YOUR_APP_ID
NUTRITIONIX_API_KEY=YOUR_API_KEY
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_KEY
```

### Frontend (`client/.env`)
```bash
# Copy the example file
copy client\.env.example client\.env
```

Then open `client/.env` and fill in:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files to git!** Both are already in `.gitignore`.

---

## 🚀 Step 3 — Run the Project

Open **two terminal windows**:

### Terminal 1 — Start Backend
```bash
cd server
npm run dev
```
You should see: `✅ Nutrition Finder server running on http://localhost:5000`

### Terminal 2 — Start Frontend
```bash
cd client
npm run dev
```
You should see: `Local: http://localhost:5173`

---

## 🧪 Step 4 — Test the App

1. Open http://localhost:5173
2. You'll see the **Login/Signup** page
3. Create an account (email/password)
4. You'll be redirected to the **Dashboard**
5. Search for any food: "apple", "chicken breast", "biryani", "dosa"
6. See full nutrition breakdown + food image
7. Click your avatar (top right) → **Sign out**
8. Try visiting `/` while logged out — you'll be sent back to `/auth` ✅

---

## 🔐 How Authentication Works

```
User visits /           →  Not signed in?  →  Redirect to /auth
User visits /auth       →  Signs in with Clerk
Clerk issues JWT token  →  Stored in browser session
User redirected to /    →  Dashboard loads
User searches food      →  JWT sent as Bearer token to backend
Backend verifyClerk.js  →  Validates JWT with Clerk API
Routes respond          →  Data returned to frontend
User clicks sign out    →  Clerk clears session, redirect to /auth
```

---

## 📡 API Reference

### POST `/api/nutrition`
Search for nutrition data.

**Headers:** `Authorization: Bearer <clerk_token>`

**Body:**
```json
{ "query": "1 cup brown rice" }
```

**Response:**
```json
{
  "foods": [{
    "name": "brown rice",
    "calories": 216,
    "protein": 5.0,
    "carbs": 44.8,
    "fat": 1.8,
    "fiber": 3.5,
    "sugar": 0.7,
    "sodium": 10,
    "potassium": 154,
    "vitamins": {
      "vitaminC": 0,
      "calcium": 20,
      "iron": 1.0,
      ...
    },
    "thumbnail": "https://...",
    ...
  }]
}
```

### GET `/api/image?q=brown+rice`
Get a food image from Unsplash.

**Headers:** `Authorization: Bearer <clerk_token>`

**Response:**
```json
{
  "imageUrl": "https://images.unsplash.com/...",
  "alt": "brown rice",
  "credit": { "photographer": "Jane Doe", "profileLink": "..." }
}
```

---

## 🎨 UI Features

| Feature | Detail |
|---|---|
| 🔐 Auth page | Animated gradient background, tab switcher for Sign In/Up |
| 🔍 Search bar | Quick suggestion chips, keyboard submit |
| 📊 Nutrition card | SVG calorie ring, color-coded nutrient rows |
| 🖼️ Food image | Banner with gradient overlay, Unsplash credit |
| ⚡ Loading | SVG spinner with pulsing ring + bouncing dots |
| ❌ Error handling | Friendly message + retry button |
| 🕐 Search history | Saved in localStorage, max 8 recent searches |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Auth | Clerk |
| Routing | React Router v6 |
| HTTP client | Axios |
| Backend | Node.js + Express |
| Nutrition API | Nutritionix |
| Image API | Unsplash |

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| `Missing VITE_CLERK_PUBLISHABLE_KEY` | Create `client/.env` from `.env.example` |
| `401 Unauthorized` from backend | Check `CLERK_SECRET_KEY` in `server/.env` |
| `500 Nutritionix error` | Verify `NUTRITIONIX_APP_ID` + `NUTRITIONIX_API_KEY` |
| Images not loading | Check `UNSPLASH_ACCESS_KEY`; images are non-critical |
| CORS error | Backend only allows `localhost:5173` and `localhost:3000` |
| Clerk sign-in not redirecting | Make sure `afterSignOutUrl` in `main.jsx` matches your route |
