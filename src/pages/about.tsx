import AboutOne from "@/components/sections/about/aboutOne"
import PartnersOne from "@/components/sections/partners/partnersOne"
import ProjectsOne from "@/components/sections/projects/projectsOne"
import Offer from "@/components/sections/offer"
import PageTitle from "@/components/sections/pageTitle"
import TeamesOne from "@/components/sections/teames/teamesOne"

const About = () => {
  return (
    <>
      <PageTitle title="About Us" currentPage="About Us"/>
      <AboutOne/>
      <Offer/>
      <ProjectsOne/>
      <TeamesOne/>
      <PartnersOne/>
    </>
  )
}

export default About