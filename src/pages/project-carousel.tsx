import ProjectsOne from "@/components/sections/projects/projectsOne"
import PageTitle from "@/components/sections/pageTitle"

const ProjectCarousel = () => {
    return (
        <>
            <PageTitle title="Project Carousel" currentPage="Project Carousel" />
            <ProjectsOne />
        </>
    )
}

export default ProjectCarousel