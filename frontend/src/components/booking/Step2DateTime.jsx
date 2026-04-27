import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, addDays, startOfDay, isBefore } from 'date-fns'
import { TIME_SLOTS } from '../../lib/pricing'

function generateDays(count = 14) {
  const today = startOfDay(new Date())
  return Array.from({ length: count }, (_, i) => addDays(today, i + 1))
}

export default function Step2DateTime({ formData, update, onNext, onBack }) {
  const { date, timeSlot } = formData
  const days = generateDays()
  const [weekStart, setWeekStart] = useState(0)

  const visibleDays = days.slice(weekStart, weekStart + 7)
  const canContinue = date && timeSlot

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-1">Pick a Date & Time</h2>
      <p className="text-gray-500 mb-6">Select your preferred date and time slot.</p>

      {/* Date picker */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-navy-900">Available Dates</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setWeekStart(Math.max(0, weekStart - 7))}
              disabled={weekStart === 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setWeekStart(Math.min(7, weekStart + 7))}
              disabled={weekStart >= 7}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
              aria-label="Next week"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {visibleDays.map((day) => {
            const iso = format(day, 'yyyy-MM-dd')
            const isSelected = date === iso
            return (
              <button
                key={iso}
                onClick={() => update({ date: iso, timeSlot: '' })}
                className={`flex flex-col items-center py-2.5 px-1 rounded-xl border-2 transition-all duration-150 ${
                  isSelected
                    ? 'border-sky-400 bg-sky-50 text-navy-900'
                    : 'border-gray-200 hover:border-sky-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-xs font-medium text-gray-400">{format(day, 'EEE')}</span>
                <span className="text-base font-bold mt-0.5">{format(day, 'd')}</span>
                <span className="text-xs text-gray-400">{format(day, 'MMM')}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {date && (
        <div className="mb-8">
          <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
            <Clock size={16} className="text-sky-500" />
            Available Times — {format(new Date(date + 'T12:00:00'), 'EEEE, MMMM d')}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => update({ timeSlot: slot })}
                className={`py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                  timeSlot === slot
                    ? 'border-sky-400 bg-sky-50 text-navy-900'
                    : 'border-gray-200 hover:border-sky-200 text-gray-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

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
