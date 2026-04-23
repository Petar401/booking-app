export const SERVICES = [
  {
    id: 'standard',
    title: 'Standard Cleaning',
    description: 'Regular maintenance clean — perfect for keeping your home tidy.',
    icon: '🏠',
    basePrices: { studio: 79, '1bed': 99, '2bed': 129, '3bed': 159 },
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'Thorough top-to-bottom clean including hard-to-reach areas.',
    icon: '✨',
    basePrices: { studio: 149, '1bed': 179, '2bed': 219, '3bed': 269 },
  },
  {
    id: 'tenancy',
    title: 'End of Tenancy',
    description: 'Landlord-approved checklist to get your deposit back.',
    icon: '🏢',
    basePrices: { studio: 199, '1bed': 239, '2bed': 289, '3bed': 349 },
  },
  {
    id: 'movein',
    title: 'Move In / Move Out',
    description: 'Start fresh or leave your old home spotless.',
    icon: '📦',
    basePrices: { studio: 129, '1bed': 159, '2bed': 199, '3bed': 239 },
  },
]

export const PROPERTY_SIZES = [
  { id: 'studio', label: 'Studio', description: 'Up to 450 sq ft' },
  { id: '1bed', label: '1 Bedroom', description: '450–750 sq ft' },
  { id: '2bed', label: '2 Bedrooms', description: '750–1100 sq ft' },
  { id: '3bed', label: '3 Bedrooms+', description: '1100+ sq ft' },
]

export const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
]

export function calculatePrice(serviceId, propertySize) {
  const service = SERVICES.find((s) => s.id === serviceId)
  if (!service || !propertySize) return null
  return service.basePrices[propertySize] ?? null
}

export function formatPrice(amount) {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
