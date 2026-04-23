import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
