import { MapPin } from 'lucide-react'

export default function Step3Address({ formData, update, onNext, onBack }) {
  const { address, city, postcode, instructions } = formData
  const canContinue = address.trim() && city.trim() && postcode.trim()

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-1">Service Address</h2>
      <p className="text-gray-500 mb-6">Where should our team come?</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">Street Address <span className="text-red-400">*</span></label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={address}
              onChange={(e) => update({ address: e.target.value })}
              placeholder="123 Main Street, Apt 4B"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">City <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={city}
              onChange={(e) => update({ city: e.target.value })}
              placeholder="New York"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">ZIP / Postcode <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => update({ postcode: e.target.value })}
              placeholder="10001"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="label">Special Instructions <span className="text-gray-400 font-normal">(optional)</span></label>
          <textarea
            value={instructions}
            onChange={(e) => update({ instructions: e.target.value })}
            placeholder="e.g. Ring doorbell on arrival, dog in the house, focus on kitchen..."
            rows={4}
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
