import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const isInvalidKey = !PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('YOUR_CLERK_PUBLISHABLE_KEY') || PUBLISHABLE_KEY === 'pk_test_';

if (isInvalidKey) {
  createRoot(document.getElementById('root')).render(
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#fee2e2', color: '#991b1b', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Missing Clerk Publishable Key</h1>
      <p style={{ maxWidth: '600px', lineHeight: '1.5' }}>
        You need to configure your Clerk API keys to run this application.
      </p>
      <div style={{ textAlign: 'left', backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #fca5a5' }}>
        <p>1. Go to your <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" style={{ color: '#b91c1c', fontWeight: 'bold' }}>Clerk Dashboard</a></p>
        <p>2. Get your Publishable Key.</p>
        <p>3. Open <code>client/.env</code> and set <code>VITE_CLERK_PUBLISHABLE_KEY</code> to your real key.</p>
        <p>4. Save the file. The app will reload automatically.</p>
      </div>
    </div>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={`${import.meta.env.BASE_URL}auth`}>
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}
