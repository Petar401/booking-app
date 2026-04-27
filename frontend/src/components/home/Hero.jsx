import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Clock } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Star size={14} fill="currentColor" />
            <span>Rated 4.9/5 by 2,000+ happy customers</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Spotless Spaces,{' '}
            <span className="text-sky-400">Booked Instantly</span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
            Professional cleaning services tailored to your home. Choose your service, pick a slot, and we'll handle the rest — guaranteed satisfaction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to="/booking" className="btn-primary text-base py-4 px-8">
              Book Now <ArrowRight size={18} />
            </Link>
            <a
              href="#services"
              onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-outline text-base py-4 px-8"
            >
              View Services
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Shield, label: 'Fully Insured' },
              { icon: Clock, label: 'Same-day Available' },
              { icon: Star, label: 'Satisfaction Guarantee' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon size={16} className="text-sky-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10K+', label: 'Bookings Completed' },
            { value: '500+', label: 'Verified Cleaners' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '100%', label: 'Satisfaction Rate' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-sky-400">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
