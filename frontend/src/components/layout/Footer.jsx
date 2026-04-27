import { Link } from 'react-router-dom'
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-navy-900" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">Clean<span className="text-sky-400">Book</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Professional cleaning and home services at your fingertips. Book in minutes, relax all day.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-sky-400 hover:text-navy-900 flex items-center justify-center transition-all duration-200"
                  aria-label="Social link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'Book Now', 'Services', 'How It Works', 'Reviews'].map((label) => (
                <li key={label}>
                  <Link
                    to={label === 'Book Now' ? '/booking' : '/'}
                    className="text-gray-400 hover:text-sky-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Standard Cleaning', 'Deep Cleaning', 'End of Tenancy', 'Office Cleaning', 'Move In / Move Out'].map((s) => (
                <li key={s}>
                  <Link to="/booking" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-sky-400 mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-sky-400 mt-0.5 shrink-0" />
                <a href="mailto:hello@cleanbook.com" className="hover:text-sky-400 transition-colors">hello@cleanbook.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-sky-400 mt-0.5 shrink-0" />
                <span>123 Main Street, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CleanBook. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
