import SectionTitle from "@/components/ui/sectionTitle"
import { projectsData } from "@/db/projectsData"

const BlogsOne = () => {
    return (
        <section id="projects" className="projects-section section-padding fix">
            <div className="container">
                <SectionTitle className="text-center">
                    <SectionTitle.SubTitle>Наши проекты</SectionTitle.SubTitle>
                    <SectionTitle.Title>Завершённые проекты</SectionTitle.Title>
                </SectionTitle>

                <div className="row g-4 mt-2 justify-content-center">
                    {projectsData.map((project, index) => {
                        const delays = [".2", ".3", ".4", ".2", ".3", ".4", ".3"]
                        return (
                            <div
                                className="col-xl-4 col-lg-4 col-md-6 wow slideUp"
                                data-delay={delays[index] ?? ".3"}
                                key={project.id}
                            >
                                <div className="project-card">
                                    <div className="project-card__img-wrap">
                                        <img src={project.image} alt={project.title} />
                                    </div>
                                    <div className="project-card__body">
                                        <span className="project-card__badge">{project.power}</span>
                                        <h4 className="project-card__title">{project.title}</h4>
                                        <p className="project-card__location">
                                            <i className="fas fa-map-marker-alt" /> {project.location}
                                        </p>
                                        <p className="project-card__type">
                                            <i className="fas fa-solar-panel" /> {project.type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default BlogsOne