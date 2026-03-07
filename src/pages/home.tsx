import AboutOne from '@/components/sections/about/aboutOne'
import AchievementOne from '@/components/sections/achievements/achievementOne'
import BlogsOne from '@/components/sections/blogs/blogsOne'
import CreditCalculator from '@/components/sections/calculator/creditCalculator'
import LeadForm from '@/components/sections/contact/leadForm'
import FaqHomeOne from '@/components/sections/faqHomeOne'
import HeroOne from '@/components/sections/heros/heroOne'
import MarqueOne from '@/components/sections/marques/marqueOne'
import NewsLetter from '@/components/sections/newsLetter'
import PartnersOne from '@/components/sections/partners/partnersOne'
import Products from '@/components/sections/products'
import TeamesOne from '@/components/sections/teames/teamesOne'
import TestimonialOne from '@/components/sections/testimonials/testimonialOne'

const Home = () => {
    return (
        <div>
            <HeroOne />
            <MarqueOne/>
            <AboutOne />
            <PartnersOne className='pt-0'/>
            <AchievementOne/>
            <Products/>
            <CreditCalculator />
            <LeadForm />
            <MarqueOne/>
            <TestimonialOne/>
            <TeamesOne/>
            <FaqHomeOne/>
            <BlogsOne/>
            <NewsLetter/>
        </div>
    )
}

export default Home