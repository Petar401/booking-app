import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BookingForm from '../components/booking/BookingForm'
import { Shield, Star, Clock } from 'lucide-react'

export default function Booking() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-navy-900 mb-3">Book Your Cleaning</h1>
            <p className="text-gray-500 text-lg">Fast, easy, and fully secure. Ready in under 5 minutes.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main form */}
            <div className="flex-1">
              <BookingForm />
            </div>

            {/* Side info */}
            <div className="lg:w-72 xl:w-80 space-y-5 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-navy-900 mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Shield, text: 'Fully insured & vetted cleaners' },
                    { icon: Star, text: '4.9★ average customer rating' },
                    { icon: Clock, text: 'Same-day & next-day slots available' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-gray-600">
                      <Icon size={16} className="text-sky-400 mt-0.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-900 text-white rounded-2xl p-5">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-3">Our team is available Mon–Sat, 8am–6pm.</p>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-sky-400 font-semibold text-sm hover:text-sky-300 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy-900 mb-1">100% Satisfaction Guarantee</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Not happy with the clean? We'll send a team back free of charge within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
