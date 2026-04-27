import { User, Mail, Phone } from 'lucide-react'

export default function Step4Contact({ formData, update, onNext, onBack }) {
  const { name, email, phone } = formData
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const phoneValid = phone.replace(/\D/g, '').length >= 10
  const canContinue = name.trim().length >= 2 && emailValid && phoneValid

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-1">Your Details</h2>
      <p className="text-gray-500 mb-6">We'll use these to confirm your booking and send updates.</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">Full Name <span className="text-red-400">*</span></label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Jane Smith"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="label">Email Address <span className="text-red-400">*</span></label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="jane@example.com"
              className="input-field pl-10"
            />
          </div>
          {email && !emailValid && (
            <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
          )}
        </div>

        <div>
          <label className="label">Phone Number <span className="text-red-400">*</span></label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="input-field pl-10"
            />
          </div>
          {phone && !phoneValid && (
            <p className="text-red-400 text-xs mt-1">Please enter a valid phone number (at least 10 digits).</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Booking Summary</p>
        <div className="space-y-1.5 text-sm text-gray-700">
          <div className="flex justify-between"><span>Service</span><span className="font-medium capitalize">{formData.serviceId || '—'}</span></div>
          <div className="flex justify-between"><span>Property</span><span className="font-medium">{formData.propertySize || '—'}</span></div>
          <div className="flex justify-between"><span>Date</span><span className="font-medium">{formData.date || '—'}</span></div>
          <div className="flex justify-between"><span>Time</span><span className="font-medium">{formData.timeSlot || '—'}</span></div>
          <div className="flex justify-between"><span>Address</span><span className="font-medium text-right max-w-[200px] truncate">{formData.address ? `${formData.address}, ${formData.city}` : '—'}</span></div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
