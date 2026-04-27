import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, CreditCard, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { formatPrice, SERVICES, PROPERTY_SIZES } from '../../lib/pricing'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

function CheckoutForm({ formData, price, bookingId, onBack }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const service = SERVICES.find((s) => s.id === formData.serviceId)
  const propertyLabel = PROPERTY_SIZES.find((p) => p.id === formData.propertySize)?.label

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message)
        setLoading(false)
        return
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation/${bookingId}`,
        },
      })

      if (confirmError) {
        setError(confirmError.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-navy-900 mb-1">Secure Payment</h2>
      <p className="text-gray-500 mb-6">Your payment is processed securely by Stripe.</p>

      {/* Order summary */}
      <div className="bg-navy-900 text-white rounded-xl p-5 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Order Summary</p>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-300">{service?.title}</span>
            <span>{propertyLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Date & Time</span>
            <span>{formData.date} at {formData.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Address</span>
            <span className="text-right max-w-[200px] truncate">{formData.address}, {formData.city}</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-sky-400 font-bold text-2xl">{formatPrice(price)}</span>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="mb-6 p-4 border border-gray-200 rounded-xl">
        <PaymentElement />
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
              Processing…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock size={15} />
              Pay {formatPrice(price)}
            </span>
          )}
        </button>
      </div>

      <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1.5">
        <CreditCard size={13} />
        Secured by Stripe · 256-bit encryption
      </p>
    </form>
  )
}

export default function Step5Payment({ formData, price, onBack }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [bookingId, setBookingId] = useState(null)
  const [initError, setInitError] = useState('')
  const [initialising, setInitialising] = useState(false)
  const [started, setStarted] = useState(false)

  const startPayment = async () => {
    setInitialising(true)
    setInitError('')
    try {
      const service = SERVICES.find((s) => s.id === formData.serviceId)
      const propertyLabel = PROPERTY_SIZES.find((p) => p.id === formData.propertySize)?.label
      const { data } = await axios.post('/api/bookings', {
        ...formData,
        price,
        serviceName: service?.title,
        propertyLabel,
      })
      setClientSecret(data.clientSecret)
      setBookingId(data.bookingId)
      setStarted(true)
    } catch {
      setInitError('Could not initialise payment. Please check your connection and try again.')
    } finally {
      setInitialising(false)
    }
  }

  if (!started) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">Ready to Confirm</h2>
        <p className="text-gray-500 mb-6">Review your booking then proceed to secure payment.</p>

        <div className="bg-navy-900 text-white rounded-xl p-5 mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Booking Summary</p>
          <div className="space-y-2 text-sm mb-4">
            {[
              ['Service', SERVICES.find(s => s.id === formData.serviceId)?.title || '—'],
              ['Property', PROPERTY_SIZES.find(p => p.id === formData.propertySize)?.label || '—'],
              ['Date', formData.date],
              ['Time', formData.timeSlot],
              ['Address', `${formData.address}, ${formData.city} ${formData.postcode}`],
              ['Name', formData.name],
              ['Email', formData.email],
              ['Phone', formData.phone],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-right truncate">{val}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-sky-400 font-bold text-xl">{formatPrice(price)}</span>
          </div>
        </div>

        {initError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{initError}</span>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary flex-1">Back</button>
          <button
            onClick={startPayment}
            disabled={initialising}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {initialising ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                Loading…
              </span>
            ) : (
              <span className="flex items-center gap-2"><Lock size={15} /> Proceed to Pay</span>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: { colorPrimary: '#38BDF8', borderRadius: '12px' },
        },
      }}
    >
      <CheckoutForm formData={formData} price={price} bookingId={bookingId} onBack={() => setStarted(false)} />
    </Elements>
  )
}
