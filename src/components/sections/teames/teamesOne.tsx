import { teamMembersOneData } from "@/db/teamMembersOneData"

const TeamesOne = () => {
    return (
        <section id="team" className="team-pro-section">
            <div className="container">
                <div className="team-pro-header text-center wow slideUp" data-delay=".2">
                    <span className="team-pro-header__label">НАША КОМАНДА</span>
                    <h2 className="team-pro-header__title">Познакомьтесь с командой</h2>
                </div>

                <div className="team-pro-cards">
                    {teamMembersOneData.map((member, index) => {
                        const delays = [".2", ".3", ".4", ".3", ".4"]
                        return (
                            <div key={member.id} className="team-pro-card wow slideUp" data-delay={delays[index] ?? ".3"}>
                                <div className="team-pro-card__img">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-pro-card__info">
                                    <p className="team-pro-card__name">{member.name}</p>
                                    <p className="team-pro-card__role">{member.role}</p>
                                    <p className="team-pro-card__company">{member.company}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="team-pro-footer">
                    <a
                        href="https://www.instagram.com/garant_quyash_panelleri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-pro-footer__link"
                    >
                        <i className="fab fa-instagram" />
                        <span>@garant_quyash_panelleri</span>
                    </a>
                    <a
                        href="https://t.me/garant_quyash_panelleri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-pro-footer__link"
                    >
                        <i className="fab fa-telegram-plane" />
                        <span>@garant_quyash_panelleri</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default TeamesOne