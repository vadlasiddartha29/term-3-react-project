import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">About Us</h1>
        <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Nutrition Finder is dedicated to providing accurate and easy-to-understand nutritional information to help you lead a healthier life. Our mission is to simplify healthy eating through technology.
        </p>
      </div>
    </div>
  )
}
