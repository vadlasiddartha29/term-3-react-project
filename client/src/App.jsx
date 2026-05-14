import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Contact from './pages/Contact'
import ChatBot from './components/ChatBot'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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

        {/* Public routes */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

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

        {/* SSO Callback Route */}
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SignedIn>
        <ChatBot />
      </SignedIn>
    </BrowserRouter>
  )
}
