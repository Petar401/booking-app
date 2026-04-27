import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Calendar, Clock, MapPin, User, Mail, Phone, Home, ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { formatPrice } from '../lib/pricing'

export default function Confirmation() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(`/api/bookings/${bookingId}`)
        setBooking(data)
      } catch {
        setError('Booking not found or could not be loaded.')
      } finally {
        setLoading(false)
      }
    }
    fetchBooking()
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-sky-400" />
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <p className="text-gray-500 mb-4">{error || 'Booking not found.'}</p>
            <Link to="/" className="btn-primary">Go to Homepage</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const details = [
    { icon: Calendar, label: 'Date', value: booking.date },
    { icon: Clock, label: 'Time', value: booking.time_slot },
    { icon: MapPin, label: 'Address', value: `${booking.address}, ${booking.city} ${booking.postcode}` },
    { icon: User, label: 'Name', value: booking.customer_name },
    { icon: Mail, label: 'Email', value: booking.email },
    { icon: Phone, label: 'Phone', value: booking.phone },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5">
              <CheckCircle2 size={44} className="text-green-500" />
            </div>
            <h1 className="text-4xl font-extrabold text-navy-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-500 text-lg">
              Thank you, <span className="font-semibold text-navy-900">{booking.customer_name.split(' ')[0]}</span>! A confirmation email has been sent to <span className="font-semibold text-navy-900">{booking.email}</span>.
            </p>
          </div>

          {/* Reference card */}
          <div className="bg-navy-900 text-white rounded-2xl p-6 mb-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-sky-400 font-mono">{booking.reference || bookingId.slice(0, 8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Amount Paid</p>
              <p className="text-2xl font-bold">{formatPrice(booking.price)}</p>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-bold text-navy-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
              <Home size={18} className="text-sky-400" />
              {booking.service_name} — {booking.property_label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {booking.instructions && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium mb-1">Special Instructions</p>
                <p className="text-sm text-gray-700">{booking.instructions}</p>
              </div>
            )}
          </div>

          {/* Status badge */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
            <p className="text-sm text-blue-700">
              Your booking status is <span className="font-semibold capitalize">{booking.status || 'pending'}</span>. We'll send you updates by email.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="btn-secondary flex-1 justify-center">
              <Home size={16} /> Back to Home
            </Link>
            <Link to="/booking" className="btn-primary flex-1 justify-center">
              Book Another <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
