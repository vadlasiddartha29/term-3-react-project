import Navbar from '../components/Navbar'

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Contact Us</h1>
        <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <p className="text-sm font-bold text-slate-700 mb-2">Email us at:</p>
           <a href="mailto:support@nutritionfinder.com" className="text-brand-600 font-black hover:underline text-lg">support@nutritionfinder.com</a>
        </div>
      </div>
    </div>
  )
}
