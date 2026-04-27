import { Link } from 'react-router-dom'
import { ClipboardList, CalendarDays, CreditCard, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Pick a Service',
    description: 'Choose from our range of cleaning services and select the size of your property. Our price calculator updates in real-time.',
  },
  {
    number: '02',
    icon: CalendarDays,
    title: 'Choose Date & Time',
    description: 'Browse available time slots and pick what works best for you. Same-day and next-day bookings available.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Confirm & Pay',
    description: 'Securely pay online via Stripe. Receive an instant confirmation email with your booking details and reference number.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="section-heading mt-2">Book in 3 Easy Steps</h2>
          <p className="section-subheading">From selection to confirmation in under 5 minutes. No phone calls, no back-and-forth emails.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-sky-400/20 via-sky-400 to-sky-400/20" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-2xl bg-navy-900 flex items-center justify-center shadow-xl">
                  <step.icon size={36} className="text-sky-400" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-sky-400 text-navy-900 text-xs font-black flex items-center justify-center shadow-md">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-bold text-xl text-navy-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/booking" className="btn-primary text-base py-4 px-10">
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
