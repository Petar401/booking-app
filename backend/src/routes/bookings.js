import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../lib/supabase.js'
import { stripe } from '../lib/stripe.js'
import { sendConfirmationEmail } from '../lib/email.js'

const router = Router()

function generateReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// POST /api/bookings — create booking and confirm payment
router.post('/', async (req, res) => {
  const {
    serviceId, propertySize, serviceName, propertyLabel,
    date, timeSlot,
    address, city, postcode, instructions,
    name, email, phone,
    price,
  } = req.body

  // Basic validation
  if (!serviceId || !date || !timeSlot || !address || !name || !email || !phone || !price) {
    return res.status(400).json({ message: 'Missing required booking fields.' })
  }

  try {
    // Create payment intent attached to the booking
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { email, name, serviceId, date },
    })

    const reference = generateReference()
    const bookingId = uuidv4()

    // Persist to Supabase
    const { error: dbError } = await supabase.from('bookings').insert({
      id: bookingId,
      reference,
      service_id: serviceId,
      service_name: serviceName,
      property_size: propertySize,
      property_label: propertyLabel,
      date,
      time_slot: timeSlot,
      address,
      city,
      postcode,
      instructions: instructions || '',
      customer_name: name,
      email,
      phone,
      price,
      status: 'pending',
      stripe_payment_intent_id: paymentIntent.id,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Still return client secret so payment can proceed even if DB is misconfigured
    }

    res.json({
      bookingId,
      reference,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.error('Booking creation error:', err)
    res.status(500).json({ message: 'Failed to create booking.' })
  }
})

// POST /api/bookings/webhook — Stripe webhook to mark booking as confirmed
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object
    const { data: [booking] } = await supabase
      .from('bookings')
      .select('*')
      .eq('stripe_payment_intent_id', pi.id)

    if (booking) {
      await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', booking.id)

      // Send confirmation email
      try {
        await sendConfirmationEmail({
          to: booking.email,
          name: booking.customer_name,
          reference: booking.reference,
          serviceName: booking.service_name,
          propertyLabel: booking.property_label,
          date: booking.date,
          timeSlot: booking.time_slot,
          address: booking.address,
          city: booking.city,
          postcode: booking.postcode,
          price: booking.price,
        })
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
      }
    }
  }

  res.json({ received: true })
})

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single()

  if (error || !data) {
    return res.status(404).json({ message: 'Booking not found.' })
  }

  res.json(data)
})

export default router
