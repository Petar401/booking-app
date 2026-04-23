import { Check } from 'lucide-react'
import { SERVICES, PROPERTY_SIZES, formatPrice } from '../../lib/pricing'

export default function Step1Service({ formData, update, onNext }) {
  const { serviceId, propertySize } = formData
  const canContinue = serviceId && propertySize

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-1">Select Your Service</h2>
      <p className="text-gray-500 mb-6">Choose a service and your property size to see instant pricing.</p>

      {/* Service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => update({ serviceId: s.id })}
            className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              serviceId === s.id
                ? 'border-sky-400 bg-sky-50'
                : 'border-gray-200 hover:border-sky-200 hover:bg-gray-50'
            }`}
          >
            {serviceId === s.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center">
                <Check size={11} className="text-navy-900" strokeWidth={3} />
              </div>
            )}
            <span className="text-2xl mb-2 block">{s.icon}</span>
            <h3 className="font-semibold text-navy-900 text-sm mb-0.5">{s.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
            {propertySize && (
              <p className="text-sky-500 font-bold text-sm mt-2">
                {formatPrice(s.basePrices[propertySize])}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Property size */}
      <h3 className="font-semibold text-navy-900 mb-3">Property Size</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {PROPERTY_SIZES.map((size) => (
          <button
            key={size.id}
            onClick={() => update({ propertySize: size.id })}
            className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 ${
              propertySize === size.id
                ? 'border-sky-400 bg-sky-50'
                : 'border-gray-200 hover:border-sky-200 hover:bg-gray-50'
            }`}
          >
            {propertySize === size.id && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-sky-400 flex items-center justify-center">
                <Check size={9} className="text-navy-900" strokeWidth={3} />
              </div>
            )}
            <p className="font-semibold text-navy-900 text-sm">{size.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{size.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  )
}
