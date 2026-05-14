import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const StepCard = ({ number, icon, title, description, badge, details }) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="w-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 h-full flex flex-col">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-slate-100 text-xs font-black text-brand-600 shadow-sm z-10">
        {number}
      </div>
      
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
      
      {details && (
        <div className="mt-auto pt-6 border-t border-slate-50">
           {details}
        </div>
      )}
    </div>
  </div>
)

const FeatureRow = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-white shadow-sm hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-xl shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm mb-0.5">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
)

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-50/50 blur-[100px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-50/50 blur-[80px] rounded-full -ml-20 -mb-20" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-widest mb-6">
                How It Works
              </span>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                Smart Nutrition in <br />
                <span className="text-brand-600">Just a Few Steps</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                Nutrition Finder uses AI and real-time data to help you make better food choices and achieve your health goals.
              </p>
              
              <div className="flex items-center gap-4">
                <Link to="/auth" className="px-8 py-4 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
                  Get Started Now
                </Link>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                       U{i}
                     </div>
                   ))}
                   <div className="pl-4 text-sm text-slate-500 font-medium">+1k users joined</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
               {/* Dashboard Mockup Representation */}
               <div className="relative z-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.08)] p-6 animate-float">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-50">
                     <div className="w-10 h-10 rounded-lg bg-slate-100" />
                     <div className="h-4 w-32 bg-slate-100 rounded-full" />
                  </div>
                  <div className="space-y-4">
                     <div className="h-12 w-full bg-slate-50 rounded-2xl border border-slate-100 flex items-center px-4 gap-3">
                        <span className="text-slate-300">🔍</span>
                        <div className="h-2 w-24 bg-slate-200 rounded-full" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-brand-50/50 rounded-2xl border border-brand-100/50" />
                        <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100" />
                     </div>
                  </div>
               </div>
               {/* AI Assistant Bubble Mockup */}
               <div className="absolute -bottom-10 -right-6 z-20 w-64 bg-slate-900 rounded-3xl p-5 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-[10px]">🤖</div>
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">AI Assistant</span>
                  </div>
                  <div className="space-y-3">
                     <div className="p-3 bg-white/10 rounded-2xl rounded-tl-none">
                        <div className="h-1.5 w-full bg-white/20 rounded-full mb-2" />
                        <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
                     </div>
                     <div className="p-2 bg-brand-500 rounded-xl rounded-br-none ml-auto w-fit px-4">
                        <div className="h-1.5 w-12 bg-white/40 rounded-full" />
                     </div>
                  </div>
               </div>
               {/* Decorative floating elements */}
               <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand-100 rounded-full blur-2xl opacity-60 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">
              Your Nutrition Journey in <span className="text-brand-600">4 Simple Steps</span>
            </h2>
            <div className="w-16 h-1 bg-brand-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number="01"
              icon="🔐"
              title="Login Securely"
              description="Create your account or log in using Clerk authentication for a secure and personalized experience."
              details={
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">👤</div>
                  <div className="flex-1 text-left">
                    <div className="h-1.5 w-16 bg-slate-200 rounded-full mb-1" />
                    <div className="h-1 w-12 bg-slate-100 rounded-full" />
                  </div>
                  <div className="text-brand-500">✓</div>
                </div>
              }
            />
            <StepCard 
              number="02"
              icon="🔍"
              title="Search Any Food"
              description="Search for any food you want to know about. We support hundreds of foods and dishes."
              details={
                <div className="space-y-3">
                  <div className="h-8 w-full bg-slate-50 rounded-lg border border-slate-100 flex items-center px-3 justify-between">
                    <div className="h-1.5 w-16 bg-slate-200 rounded-full" />
                    <span className="text-[10px]">🔍</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-5 px-2 bg-slate-100 rounded-full text-[10px] flex items-center">Apple</div>
                    <div className="h-5 px-2 bg-slate-100 rounded-full text-[10px] flex items-center">Dosa</div>
                  </div>
                </div>
              }
            />
            <StepCard 
              number="03"
              icon="📊"
              title="Get Nutrition Analysis"
              description="Get instant, detailed nutritional information including calories, macros, vitamins and minerals."
              details={
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full border-4 border-brand-500 border-r-transparent flex items-center justify-center text-[8px] font-bold">95</div>
                   <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between text-[8px] font-bold"><span>Protein</span><span>0.5g</span></div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/3" />
                      </div>
                   </div>
                </div>
              }
            />
            <StepCard 
              number="04"
              icon="🤖"
              title="Ask AI Assistant"
              description="Ask questions and get smart nutrition guidance related to healthy eating, food, and your goals."
              details={
                <div className="space-y-3">
                   <div className="p-2 bg-slate-50 rounded-xl rounded-tl-none text-[8px] font-medium text-slate-500 text-left">
                     How much protein do I need daily?
                   </div>
                   <div className="flex gap-1.5">
                     <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center text-[6px]">🤖</div>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 bg-brand-200 rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-brand-300 rounded-full animate-bounce delay-100" />
                        <div className="w-1 h-1 bg-brand-400 rounded-full animate-bounce delay-200" />
                     </div>
                   </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#fcfdfc]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Powered by Smart Technology</h2>
            <p className="text-slate-500 font-medium">Built with the best tools to give you the best insights</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureRow icon="🛡️" title="Clerk Authentication" description="Secure and reliable user authentication for your data safety." />
            <FeatureRow icon="🗄️" title="Nutrition API" description="Real-time data from trusted nutrition databases." />
            <FeatureRow icon="🧠" title="AI Assistant" description="Smart AI chat that answers only nutrition related questions." />
            <FeatureRow icon="⚡" title="Smart Search" description="Fast and accurate search to find any food and analyze instantly." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-brand-700 p-12 lg:p-20 text-center text-white shadow-2xl shadow-brand-200">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/20 rounded-full -ml-20 -mb-20 blur-2xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl lg:text-5xl font-black mb-6">Start exploring smarter <br /> nutrition today!</h2>
               <p className="text-brand-100 text-lg mb-10">Search, analyze and improve your health with AI-powered insights.</p>
               <Link to="/auth" className="inline-flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-white text-brand-700 font-black text-lg hover:scale-105 transition-all shadow-xl">
                  Analyze Food Now <span className="text-2xl">→</span>
               </Link>
            </div>

            {/* Floating food icons for premium feel */}
            <div className="absolute top-20 left-20 text-4xl opacity-20 animate-float">🥗</div>
            <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🍎</div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">🥦</div>
             <span className="font-bold text-slate-900">Nutrition Finder</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link to="/" className="hover:text-brand-600">Home</Link>
            <Link to="/how-it-works" className="hover:text-brand-600">How It Works</Link>
            <Link to="/about" className="hover:text-brand-600">About Us</Link>
            <Link to="/contact" className="hover:text-brand-600">Contact</Link>
          </div>
          <p className="text-xs text-slate-400 font-medium">© 2024 Nutrition Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
