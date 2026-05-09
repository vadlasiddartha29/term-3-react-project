import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth route */}
        <Route
          path="/auth"
          element={
            <>
              {/* If already signed in, skip auth page → go to dashboard */}
              <SignedIn>
                <Navigate to="/" replace />
              </SignedIn>
              <SignedOut>
                <AuthPage />
              </SignedOut>
            </>
          }
        />

        {/* Home / Protected dashboard route */}
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              {/* Not signed in → show landing page */}
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
