import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

// Simple token-based guard for admin routes
function adminGuard(req, res, next) {
  const token = req.headers['x-admin-token']
  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }
  next()
}

// GET /api/admin/bookings
router.get('/bookings', async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Admin fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch bookings.' })
  }

  res.json(data)
})

// PATCH /api/admin/bookings/:id — update status
router.patch('/bookings/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' })
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    return res.status(404).json({ message: 'Booking not found or update failed.' })
  }

  res.json(data)
})

export default router
