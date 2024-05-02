export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import LiveMatchsSnaps from '@/components/LiveMatchsSnaps'
import Pricing from '@/components/pricing'
import CounterStats from '@/components/CounterStats'

export default function Home() {
  return (
    <>
      <Hero />  
      <Zigzag />
      <LiveMatchsSnaps/>
      <CounterStats/>
      <Testimonials />
      <Features />
      <Pricing/>
      <Newsletter />
    </>
  )
}
