import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import CarServices from '@/components/home/CarServices'
import HowAutoConnect from '@/components/home/HowAutoConnect'
import WhyChooseAuto from '@/components/home/WhyChooseAuto'
import SmartApp from '@/components/home/SmartApp'
import YouLiveUs from '@/components/home/YouLiveUs'
import Hero from '@/components/home/Hero'
import Form from '@/components/home/Form'
import Footer from '@/components/layout/Footer'

// const poppins = Poppins({ subsets: ['latin'] })

export default function Home() {
  return (
<div>
  <Navbar />
  <Hero />
  <Form />
  <CarServices />
  <HowAutoConnect />
  <WhyChooseAuto />
  <SmartApp />
  <YouLiveUs />
  <Footer />
</div>
  )
}
