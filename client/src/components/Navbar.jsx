import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { user } = useUser()
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 backdrop-blur-md"
      style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}
          >
            🥦
          </div>
          <div>
            <span className="text-slate-900 font-black text-lg leading-none block tracking-tight">Nutrition Finder</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1 block">Powered by AI</span>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-all relative py-1 ${location.pathname === link.path
                ? 'text-brand-600'
                : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <div className="absolute -bottom-[21px] left-0 w-full h-0.5 bg-brand-600 rounded-t-full shadow-[0_-1px_4px_rgba(22,163,74,0.4)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link 
              to="/auth" 
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition-all shadow-sm flex items-center gap-2"
            >
              <span className="text-lg">👤</span> Login / Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            {user && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-slate-900 text-sm font-bold leading-none">
                  {user.firstName || user.emailAddresses[0]?.emailAddress}
                </span>
                <span className="text-slate-500 text-[11px] font-medium leading-none mt-1">Healthy eating 🌱</span>
              </div>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 ring-2 ring-brand-500/10 hover:ring-brand-500/30 transition-all shadow-sm',
                  userButtonPopoverCard: 'bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden',
                  userButtonPopoverActionButton: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                  userButtonPopoverActionButtonText: 'text-slate-700 font-medium',
                  userButtonPopoverFooter: 'hidden',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
