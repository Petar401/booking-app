import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'New York, NY',
    rating: 5,
    text: 'Absolutely incredible service! I booked a deep clean for my apartment and the team did an amazing job. The booking process was so easy and the price was exactly what was quoted.',
    avatar: 'SM',
    service: 'Deep Cleaning',
  },
  {
    name: 'James T.',
    location: 'Brooklyn, NY',
    rating: 5,
    text: 'Used CleanBook for end of tenancy cleaning and got my full deposit back! The team was professional, thorough, and arrived right on time. Will definitely use again.',
    avatar: 'JT',
    service: 'End of Tenancy',
  },
  {
    name: 'Emily R.',
    location: 'Manhattan, NY',
    rating: 5,
    text: 'I\'ve tried several cleaning services and CleanBook is by far the best. Easy online booking, transparent pricing, and the cleaners do an exceptional job every time.',
    avatar: 'ER',
    service: 'Standard Cleaning',
  },
  {
    name: 'David K.',
    location: 'Queens, NY',
    rating: 5,
    text: 'Booked a move-in clean for my new place. The apartment was spotless when they finished. The online booking took less than 5 minutes and payment was seamless.',
    avatar: 'DK',
    service: 'Move In Clean',
  },
  {
    name: 'Lisa W.',
    location: 'Hoboken, NJ',
    rating: 5,
    text: 'Same-day booking was a lifesaver when I had unexpected guests coming. The cleaners arrived within 2 hours and transformed my home. Highly recommend!',
    avatar: 'LW',
    service: 'Standard Cleaning',
  },
  {
    name: 'Marcus B.',
    location: 'Jersey City, NJ',
    rating: 5,
    text: 'The price calculator made it so easy to understand exactly what I was paying for. No hidden fees, no surprises. The actual cleaning matched the description perfectly.',
    avatar: 'MB',
    service: 'Deep Cleaning',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">Customer Reviews</span>
          <h2 className="section-heading mt-2">Loved by Thousands</h2>
          <p className="section-subheading">Don't just take our word for it. Here's what our customers have to say.</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Stars count={5} />
            <span className="font-bold text-navy-900">4.9 out of 5</span>
            <span className="text-gray-500 text-sm">(2,147 reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-900 text-sky-400 flex items-center justify-center text-sm font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <Quote size={20} className="text-sky-200 shrink-0" />
              </div>
              <Stars count={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">"{t.text}"</p>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
