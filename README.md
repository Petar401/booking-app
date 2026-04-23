<div align="center">

# CleanBook — Full-Stack Booking App

A professional cleaning & booking service web app built with React, Node.js, Supabase, and Stripe.

</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (PaymentElement) |
| Email | Nodemailer (SMTP) |
| Icons | Lucide React |

---

## Features

- **Homepage** — Hero, Services, How It Works, Testimonials, Footer
- **5-Step Booking Form** — Service → Date/Time → Address → Contact → Stripe Payment
- **Dynamic Price Calculator** — Updates in real-time based on service + property size
- **Confirmation Page** — Booking summary with reference number
- **Email Confirmation** — Automated email via Nodemailer
- **Admin Dashboard** — View, search, filter, and update booking statuses
- **Stripe Webhooks** — Auto-confirms bookings after successful payment
- **Mobile Responsive** — Works on all screen sizes

---

## Project Structure

```
booking-app/
├── frontend/             # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/   # Header, Footer
│   │   │   ├── home/     # Hero, Services, HowItWorks, Testimonials
│   │   │   └── booking/  # BookingForm, Step1–Step5
│   │   ├── pages/        # Home, Booking, Confirmation, AdminLogin, AdminDashboard
│   │   └── lib/          # supabase.js, pricing.js
│   └── .env.example
├── backend/              # Express API
│   ├── src/
│   │   ├── routes/       # bookings.js, payments.js, admin.js
│   │   └── lib/          # supabase.js, stripe.js, email.js
│   └── .env.example
└── supabase/
    └── schema.sql        # Database schema + RLS policies
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Stripe](https://stripe.com) account (test mode is fine)
- (Optional) A Gmail account with an App Password for email confirmation

---

### 1. Clone & Install

```bash
git clone https://github.com/Petar401/booking-app.git
cd booking-app

# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

---

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor → New Query** and run the contents of `supabase/schema.sql`
3. Copy your project URL and keys from **Settings → API**

---

### 3. Configure Environment Variables

**Backend** — copy and fill in `backend/.env.example` → `backend/.env`:

```bash
cd backend
cp .env.example .env
```

```env
PORT=5000
FRONTEND_URL=http://localhost:3000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password

APP_URL=http://localhost:3000
ADMIN_SECRET_TOKEN=your-random-secret
```

**Frontend** — copy and fill in `frontend/.env.example` → `frontend/.env`:

```bash
cd frontend
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

### 4. Set Up Stripe Webhooks (local development)

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward events:

```bash
stripe listen --forward-to localhost:5000/api/bookings/webhook
```

Copy the `whsec_...` secret shown and add it to `backend/.env` as `STRIPE_WEBHOOK_SECRET`.

---

### 5. Run the App

**Start the backend:**

```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

**Start the frontend (new terminal):**

```bash
cd frontend
npm run dev
# Running on http://localhost:3000
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/booking` | 5-step booking form |
| `/confirmation/:id` | Booking confirmation |
| `/admin/login` | Admin login (admin / cleanbook2024) |
| `/admin` | Admin dashboard |

---

## Admin Access

- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `cleanbook2024`

> Change these credentials before deploying to production.

---

## Colour Scheme

| Colour | Hex |
|---|---|
| Deep Navy | `#0F172A` |
| Sky Blue | `#38BDF8` |
| White | `#FFFFFF` |

---

## Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend && npm run build
# Deploy the dist/ folder
```
Set environment variables in your hosting provider's dashboard.

### Backend (Railway / Render)
Point to `backend/` as the root. Set all environment variables. Make sure to update `FRONTEND_URL` and `APP_URL` to your production URLs.

---

## License

MIT
