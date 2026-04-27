import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendConfirmationEmail({ to, name, reference, serviceName, propertyLabel, date, timeSlot, address, city, postcode, price }) {
  if (!process.env.EMAIL_USER) {
    console.log('📧 Email not configured — skipping confirmation email for', to)
    return
  }

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #F8FAFC; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: #0F172A; padding: 32px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header span { color: #38BDF8; }
    .body { padding: 32px; }
    .badge { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 16px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
    .badge-icon { font-size: 24px; }
    .badge-text { color: #166534; font-weight: 600; }
    .reference { background: #0F172A; border-radius: 12px; padding: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .ref-label { color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .ref-value { color: #38BDF8; font-size: 20px; font-weight: 700; font-family: monospace; }
    .price { color: white; font-size: 20px; font-weight: 700; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
    .detail-label { color: #64748B; }
    .detail-value { color: #0F172A; font-weight: 500; }
    .footer { background: #F8FAFC; padding: 24px; text-align: center; font-size: 12px; color: #94A3B8; }
    .cta { display: inline-block; background: #38BDF8; color: #0F172A; padding: 14px 32px; border-radius: 10px; font-weight: 700; text-decoration: none; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Clean<span>Book</span></h1>
    </div>
    <div class="body">
      <div class="badge">
        <div class="badge-icon">✅</div>
        <div class="badge-text">Booking Confirmed! Hi ${name}, you're all set.</div>
      </div>

      <div class="reference">
        <div>
          <div class="ref-label">Booking Reference</div>
          <div class="ref-value">${reference}</div>
        </div>
        <div style="text-align:right">
          <div class="ref-label">Amount Paid</div>
          <div class="price">${formattedPrice}</div>
        </div>
      </div>

      <h3 style="color:#0F172A;margin-bottom:12px">Booking Details</h3>
      <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${serviceName}</span></div>
      <div class="detail-row"><span class="detail-label">Property</span><span class="detail-value">${propertyLabel}</span></div>
      <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${date}</span></div>
      <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${timeSlot}</span></div>
      <div class="detail-row" style="border-bottom:none"><span class="detail-label">Address</span><span class="detail-value">${address}, ${city} ${postcode}</span></div>

      <div style="text-align:center;margin-top:28px">
        <p style="color:#64748B;font-size:14px">Not happy with your clean? We offer a free re-clean within 24 hours.</p>
        <a href="${process.env.APP_URL || 'https://cleanbook.com'}" class="cta">View Your Booking</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} CleanBook. All rights reserved.</p>
      <p>123 Main Street, New York, NY 10001 · hello@cleanbook.com</p>
    </div>
  </div>
</body>
</html>
  `

  await transporter.sendMail({
    from: `"CleanBook" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Booking Confirmed — ${reference}`,
    html,
  })
}
