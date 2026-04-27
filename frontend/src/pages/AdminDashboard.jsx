import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Sparkles, RefreshCw, Search, Calendar, User, Filter, LayoutDashboard, CheckCircle2, Clock, XCircle } from 'lucide-react'
import axios from 'axios'
import { formatPrice } from '../lib/pricing'

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.get('/api/admin/bookings')
      setBookings(data)
    } catch {
      setError('Failed to load bookings. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await axios.patch(`/api/admin/bookings/${id}`, { status: newStatus })
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b))
    } catch {
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin_authenticated')
    navigate('/admin/login')
  }

  const filtered = bookings.filter((b) => {
    const matchesSearch = !search || [b.customer_name, b.email, b.service_name, b.reference]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    revenue: bookings.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + (b.price || 0), 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center">
              <Sparkles size={15} className="text-navy-900" />
            </div>
            <div>
              <h1 className="font-bold text-white">CleanBook Admin</h1>
              <p className="text-xs text-gray-400">Bookings Dashboard</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'text-navy-900' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-600' },
            { label: 'Completed', value: stats.completed, color: 'text-green-600' },
            { label: 'Revenue', value: formatPrice(stats.revenue), color: 'text-sky-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, service, or reference…"
              className="input-field pl-10 py-2.5 text-sm"
            />
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm pr-8 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {error && (
            <div className="p-6 text-center text-red-600 bg-red-50 border-b border-red-100">
              {error}
            </div>
          )}

          {loading && !error ? (
            <div className="p-16 flex items-center justify-center text-gray-400">
              <RefreshCw size={24} className="animate-spin mr-3" /> Loading bookings…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <LayoutDashboard size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No bookings found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Reference', 'Customer', 'Service', 'Date & Time', 'Address', 'Price', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-navy-900">
                        {b.reference || b.id?.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-navy-900">{b.customer_name}</div>
                        <div className="text-gray-400 text-xs">{b.email}</div>
                        <div className="text-gray-400 text-xs">{b.phone}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-navy-900">{b.service_name}</div>
                        <div className="text-gray-400 text-xs capitalize">{b.property_label}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-navy-900 font-medium">
                          <Calendar size={12} className="text-sky-400" />
                          {b.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                          <Clock size={11} />
                          {b.time_slot}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-navy-900 text-xs">{b.address}</div>
                        <div className="text-gray-400 text-xs">{b.city} {b.postcode}</div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-navy-900 whitespace-nowrap">
                        {formatPrice(b.price)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          disabled={updatingId === b.id}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
              <span>Showing {filtered.length} of {bookings.length} bookings</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
