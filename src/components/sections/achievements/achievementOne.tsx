import SectionTitle from '@/components/ui/sectionTitle';

const achievements = [
    {
        number: "25+",
        description: "Сотрудников",
        icon: "/img/achievement-icon/01.svg",
        delay: ".3"
    },
    {
        number: "50+",
        description: "Завершённых проектов",
        icon: "/img/achievement-icon/02.svg",
        delay: ".5"
    },
    {
        number: "100+",
        description: "Довольных клиентов",
        icon: "/img/achievement-icon/04.svg",
        delay: ".7"
    }
];

const AchievementOne = () => {
    return (
        <section className="achievement-section fix section-padding pt-0">
            <div className="container">
                <div className="achievement-wrapper">
                    <SectionTitle className="mb-0">
                        <SectionTitle.SubTitle className='text-white'>
                            Свяжитесь с нами
                        </SectionTitle.SubTitle>
                        <SectionTitle.Title className='text-white'>
                            Энергия будущего <br />из возобновляемых источников
                        </SectionTitle.Title>
                    </SectionTitle>
                    <div className="counter-area">
                        {achievements.map((achievement, index) => (
                            <div
                                className="counter-items wow slideUp"
                                data-delay={achievement.delay}
                                key={index}
                            >
                                <div className="icon">
                                    <img src={achievement.icon} alt="icon-img" />
                                </div>
                                <div className="content">
                                    <h2>{achievement.number}</h2>
                                    <p>{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AchievementOne