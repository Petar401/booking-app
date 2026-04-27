import { useState } from 'react'
import { Check } from 'lucide-react'
import Step1Service from './Step1Service'
import Step2DateTime from './Step2DateTime'
import Step3Address from './Step3Address'
import Step4Contact from './Step4Contact'
import Step5Payment from './Step5Payment'
import { calculatePrice, formatPrice } from '../../lib/pricing'

const STEPS = [
  { label: 'Service' },
  { label: 'Date & Time' },
  { label: 'Address' },
  { label: 'Your Details' },
  { label: 'Payment' },
]

const initialFormData = {
  serviceId: '',
  propertySize: '',
  date: '',
  timeSlot: '',
  address: '',
  city: '',
  postcode: '',
  instructions: '',
  name: '',
  email: '',
  phone: '',
}

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)

  const price = calculatePrice(formData.serviceId, formData.propertySize)

  const update = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  const stepProps = { formData, update, price }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  i < step
                    ? 'bg-sky-400 border-sky-400 text-navy-900'
                    : i === step
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {i < step ? <Check size={16} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium whitespace-nowrap hidden sm:block ${
                  i === step ? 'text-navy-900' : i < step ? 'text-sky-500' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${i < step ? 'bg-sky-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Price summary bar (shows once service + size selected) */}
      {price && (
        <div className="bg-navy-900 text-white rounded-xl px-5 py-3 flex items-center justify-between mb-6">
          <span className="text-gray-300 text-sm">Estimated total</span>
          <span className="text-sky-400 font-bold text-xl">{formatPrice(price)}</span>
        </div>
      )}

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {step === 0 && <Step1Service {...stepProps} onNext={() => setStep(1)} />}
        {step === 1 && <Step2DateTime {...stepProps} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Step3Address {...stepProps} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Step4Contact {...stepProps} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <Step5Payment {...stepProps} onBack={() => setStep(3)} />}
      </div>
    </div>
  )
}
