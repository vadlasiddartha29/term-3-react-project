import { useSignIn } from '@clerk/clerk-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CustomSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authMethod, setAuthMethod] = useState('password') // 'password' | 'code'
  const [pendingVerification, setPendingVerification] = useState(false)
  const navigate = useNavigate()

  const handlePasswordSignIn = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/')
      } else if (result.status === 'needs_first_factor') {
        // If password is correct but needs another factor (like email code)
        const factor = result.supportedFirstFactors.find(f => f.strategy === 'email_code')
        if (factor) {
           await signIn.prepareFirstFactor({ strategy: 'email_code', emailAddressId: factor.emailAddressId })
           setPendingVerification(true)
        } else {
           setError('Please enable Email Code verification in your Clerk Dashboard.')
        }
      }
    } catch (err) {
      console.error('Error signing in:', err)
      setError(err.errors?.[0]?.longMessage || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setIsLoading(true)
    setError('')

    try {
      // First, create the sign-in attempt
      const result = await signIn.create({ identifier: email })
      
      // Then, find the email_code factor
      const factor = result.supportedFirstFactors.find(f => f.strategy === 'email_code')
      
      if (factor) {
        await signIn.prepareFirstFactor({ strategy: 'email_code', emailAddressId: factor.emailAddressId })
        setPendingVerification(true)
      } else {
        setError('Email code sign-in is not enabled for this account or in your Clerk Dashboard.')
      }
    } catch (err) {
      console.error('Error sending code:', err)
      setError(err.errors?.[0]?.longMessage || 'Could not send verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/')
      }
    } catch (err) {
      console.error('Error verifying code:', err)
      setError(err.errors?.[0]?.longMessage || 'Invalid verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${window.location.origin}${import.meta.env.BASE_URL}sso-callback`,
        redirectUrlComplete: `${window.location.origin}${import.meta.env.BASE_URL}`,
      })
    } catch (err) {
      console.error('Error with Google Sign In:', err)
      setError('Could not connect to Google.')
    }
  }

  if (pendingVerification) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Check your email</h3>
        <p className="text-[13px] text-slate-500 mb-6">We've sent a 6-digit code to {email}</p>
        
        <form onSubmit={handleVerifyCode} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold border border-red-100">{error}</div>}
          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-brand-600 focus:ring-0 outline-none transition-all text-sm text-slate-600"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
          <button 
            type="button" 
            onClick={() => setPendingVerification(false)}
            className="w-full text-brand-600 font-bold text-[11px] hover:underline"
          >
            Back to login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Social Login */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-all font-semibold text-slate-600 mb-4 shadow-sm text-[13px]"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-[1px] bg-slate-100"></div>
        <span className="text-[10px] text-slate-400 lowercase">or</span>
        <div className="flex-1 h-[1px] bg-slate-100"></div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold border border-red-100 mb-4">
          {error}
        </div>
      )}

      {/* Email Input (Always visible) */}
      <div className="mb-4">
        <label className="block text-slate-700 font-medium text-[13px] mb-1.5 ml-0.5">Email address</label>
        <div className="relative group">
           <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           </div>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Enter your email"
             required
             className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-brand-600 focus:ring-0 outline-none transition-all text-sm text-slate-600 placeholder:text-slate-300"
           />
        </div>
      </div>

      {authMethod === 'password' ? (
        <form onSubmit={handlePasswordSignIn} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-medium text-[13px] mb-1.5 ml-0.5">Password</label>
            <div className="relative group">
               <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               </div>
               <input
                 type={showPassword ? 'text' : 'password'}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Enter your password"
                 required
                 className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-brand-600 focus:ring-0 outline-none transition-all text-sm text-slate-600 placeholder:text-slate-300"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
               >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
               </button>
            </div>
            <div className="flex justify-between mt-2">
              <button 
                type="button" 
                onClick={() => setAuthMethod('code')}
                className="text-brand-600 font-bold text-[11px] hover:underline"
              >
                Sign in with code
              </button>
              <button type="button" className="text-brand-600 font-bold text-[11px] hover:underline">Forgot password?</button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : <>Sign In <span className="text-lg">→</span></>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="text-center py-2">
            <p className="text-[11px] text-slate-500">We will send a one-time code to your email.</p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Sending...' : 'Send Login Code'}
          </button>
          <button 
            type="button" 
            onClick={() => setAuthMethod('password')}
            className="w-full text-brand-600 font-bold text-[11px] hover:underline"
          >
            Use password instead
          </button>
        </form>
      )}
    </div>
  )
}
