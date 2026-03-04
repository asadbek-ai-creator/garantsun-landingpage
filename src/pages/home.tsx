import { useState } from 'react'
import AboutOne from '@/components/sections/about/aboutOne'
import AchievementOne from '@/components/sections/achievements/achievementOne'
import BlogsOne from '@/components/sections/blogs/blogsOne'
import CreditCalculator from '@/components/sections/calculator/creditCalculator'
import type { CreditResults } from '@/components/sections/calculator/creditCalculator'
import LeadForm from '@/components/sections/contact/leadForm'
import FaqHomeOne from '@/components/sections/faqHomeOne'
import HeroOne from '@/components/sections/heros/heroOne'
import MarqueOne from '@/components/sections/marques/marqueOne'
import MarqueTwo from '@/components/sections/marques/marqueTwo'
import NewsLetter from '@/components/sections/newsLetter'
import PartnersOne from '@/components/sections/partners/partnersOne'
import PriceGridOne from '@/components/sections/pricing/priceGridOne'
import Products from '@/components/sections/products'
import ServicesOne from '@/components/sections/services/servicesOne'
import TeamesOne from '@/components/sections/teames/teamesOne'
import TestimonialOne from '@/components/sections/testimonials/testimonialOne'

const Home = () => {
    const [creditResults, setCreditResults] = useState<CreditResults | undefined>()

    return (
        <div>
            <HeroOne />
            <MarqueOne/>
            <AboutOne />
            <PartnersOne className='pt-0'/>
            <ServicesOne/>
            <AchievementOne/>
            <Products/>
            <CreditCalculator onResultsChange={setCreditResults} />
            <LeadForm creditResults={creditResults} />
            <MarqueTwo/>
            <TestimonialOne/>
            <TeamesOne/>
            <PriceGridOne/>
            <FaqHomeOne/>
            <BlogsOne/>
            <NewsLetter/>
        </div>
    )
}

export default Home