import { useSignUp, useClerk } from '@clerk/clerk-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CustomSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsLoading(true)
    setError('')

    try {
      await signUp.create({
        emailAddress: email,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error('Error signing up:', err)
      setError(err.errors?.[0]?.longMessage || 'Could not create account.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsLoading(true)
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        navigate('/')
      }
    } catch (err) {
      console.error('Error verifying:', err)
      setError(err.errors?.[0]?.longMessage || 'Invalid verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signUp.authenticateWithRedirect({
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
        <p className="text-sm text-slate-500 mb-6">We've sent a verification code to {email}</p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">{error}</div>}
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            required
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-brand-600 outline-none transition-all text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
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

      <form onSubmit={handleSignUp} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div>
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

        {/* Password Field */}
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Sign Up <span className="text-lg">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
