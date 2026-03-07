import { Fragment } from 'react'
const textSliderData = [
    "Солнечные панели",
    "Нагрев воды",
    "Финансирование",
    "Гидроэнергия",
    "Солнечная энергия",
    "Солнечные панели",
    "Нагрев воды",
    "Финансирование",
    "Гидроэнергия",
    "Солнечная энергия",
    "Солнечные панели",
    "Нагрев воды",
    "Финансирование",
    "Гидроэнергия",
    "Солнечная энергия"
];
const MarqueOne = () => {
    return (
        <div className="marque-section">
            <div className="marquee-wrapper text-slider">
                <div className="marquee-inner to-left">
                    <ul className="marqee-list d-flex">
                        <li className="marquee-item">
                            {textSliderData.map((text, index) => (
                                <Fragment key={index}>
                                    <span className="text-slider">{text}</span>
                                    <span className="text-slider">
                                        <img src="/img/star.svg" alt="img" />
                                    </span>
                                </Fragment>
                            ))}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MarqueOne