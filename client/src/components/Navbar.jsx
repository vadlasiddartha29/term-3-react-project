import { UserButton, useUser } from '@clerk/clerk-react'

export default function Navbar() {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ background: 'rgba(2, 6, 23, 0.85)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}
          >
            🥦
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none block">Nutrition Finder</span>
            <span className="text-slate-500 text-xs leading-none">Powered by Nutritionix</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-slate-300 text-sm font-medium leading-none">
                {user.firstName || user.emailAddresses[0]?.emailAddress}
              </span>
              <span className="text-slate-500 text-xs leading-none mt-0.5">Healthy eating 🌱</span>
            </div>
          )}
          {/* Clerk's built-in user button with sign-out */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9 ring-2 ring-brand-500/40 hover:ring-brand-500 transition-all',
                userButtonPopoverCard: 'bg-slate-900 border border-white/10 shadow-2xl',
                userButtonPopoverActionButton: 'text-slate-300 hover:text-white hover:bg-white/5',
                userButtonPopoverActionButtonText: 'text-slate-300',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
