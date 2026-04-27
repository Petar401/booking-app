import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-navy-900" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-navy-900">Clean<span className="text-sky-400">Book</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('services')} className="text-gray-600 hover:text-navy-900 font-medium transition-colors">Services</button>
          <button onClick={() => scrollTo('how-it-works')} className="text-gray-600 hover:text-navy-900 font-medium transition-colors">How It Works</button>
          <button onClick={() => scrollTo('testimonials')} className="text-gray-600 hover:text-navy-900 font-medium transition-colors">Reviews</button>
          <button onClick={() => scrollTo('contact')} className="text-gray-600 hover:text-navy-900 font-medium transition-colors">Contact</button>
          <Link to="/booking" className="btn-primary text-sm py-2.5 px-5">Book Now</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          <button onClick={() => scrollTo('services')} className="text-left py-2 text-gray-700 font-medium">Services</button>
          <button onClick={() => scrollTo('how-it-works')} className="text-left py-2 text-gray-700 font-medium">How It Works</button>
          <button onClick={() => scrollTo('testimonials')} className="text-left py-2 text-gray-700 font-medium">Reviews</button>
          <button onClick={() => scrollTo('contact')} className="text-left py-2 text-gray-700 font-medium">Contact</button>
          <Link to="/booking" className="btn-primary text-sm mt-1" onClick={() => setMenuOpen(false)}>Book Now</Link>
        </div>
      )}
    </header>
  )
}
