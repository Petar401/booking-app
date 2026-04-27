import { Link } from 'react-router-dom'
import { Home, Sparkles, Building2, MoveRight, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Standard Cleaning',
    description: 'Regular maintenance cleaning for your home. Dusting, vacuuming, mopping, and sanitising all surfaces.',
    price: 'From $79',
    features: ['Kitchen & bathrooms', 'All rooms dusted & vacuumed', 'Floors mopped'],
    popular: false,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'A thorough top-to-bottom clean ideal for spring cleaning or move-in/move-out situations.',
    price: 'From $149',
    features: ['Everything in Standard', 'Inside oven & fridge', 'Grout & tile scrubbing', 'Baseboard & vent cleaning'],
    popular: true,
    color: 'bg-sky-50 text-sky-500',
  },
  {
    icon: Building2,
    title: 'End of Tenancy',
    description: 'Comprehensive cleaning to help you get your full deposit back. We cover every corner.',
    price: 'From $199',
    features: ['Deep clean + carpets', 'Window cleaning', 'Appliance interiors', 'Landlord-approved checklist'],
    popular: false,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: MoveRight,
    title: 'Move In / Move Out',
    description: 'Start fresh in your new home or leave your old one spotless for the next tenants.',
    price: 'From $129',
    features: ['Full property clean', 'Flexible scheduling', 'Before/after photos', 'Same-day availability'],
    popular: false,
    color: 'bg-emerald-50 text-emerald-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="section-heading mt-2">Everything Your Home Needs</h2>
          <p className="section-subheading">Choose from our range of professional cleaning services, all backed by our satisfaction guarantee.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative bg-white rounded-2xl border p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                service.popular ? 'border-sky-400 shadow-md ring-1 ring-sky-400' : 'border-gray-100 shadow-sm'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                <service.icon size={20} />
              </div>
              <h3 className="font-bold text-navy-900 text-lg mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
              <ul className="space-y-2 mb-5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-navy-900 text-lg">{service.price}</span>
                <Link
                  to="/booking"
                  className="flex items-center gap-1 text-sky-500 font-semibold text-sm hover:gap-2 transition-all"
                >
                  Book <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
