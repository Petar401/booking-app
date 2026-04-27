import { Router } from 'express'
import { stripe } from '../lib/stripe.js'

const router = Router()

// Create a PaymentIntent so the frontend can initialise the Stripe Elements UI
router.post('/create-intent', async (req, res) => {
  const { amount } = req.body

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount.' })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars → cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ message: 'Failed to create payment intent.' })
  }
})

export default router
