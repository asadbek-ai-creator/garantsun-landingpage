import { SuCallMessage, SuEmail, SuLocation } from "@/lib/icons";
import { Link } from "react-router-dom";

const contactInfo = [
    {
        icon: <SuCallMessage />,
        label: "Звоните 7/24",
        value: "+99897 242 10 01",
        link: "tel:+998972421001",
    },
    {
        icon: <SuEmail />,
        label: "Написать нам",
        value: "garantsunenergy@gmail.com",
        link: "#",
    },
    {
        icon: <SuLocation />,
        label: "Адрес",
        value: "Uzbekistan, Karakalpakstan, Nukus",
    },
];


const Footer = () => {
    return (
        <footer className="footer-section footer-bg">
            <div className="container">
                <div className="contact-info-area">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="contact-info-items wow slideUp"
                            data-delay={`${0.3 + index * 0.2}`}
                        >
                            <div className="icon">{info.icon}</div>
                            <div className="content">
                                <p>{info.label}</p>
                                <h3>
                                    {info.link ? (
                                        <Link to={info.link}>{info.value}</Link>
                                    ) : (
                                        info.value
                                    )}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-widgets-wrapper">
                <div className="shape-1">
                    <img src="/img/footer-shape-1.png" alt="shape-img" />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div
                            className="col-xl-6 col-lg-8 col-md-10 text-center wow slideUp"
                            data-delay=".3"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link to="/">
                                        <img src="/img/logo/white-logo.svg" alt="logo-img" />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        Garant Sun Energy — ваш надёжный партнёр в солнечной энергетике
                                        по всему Узбекистану и Каракалпакстану.
                                    </p>
                                    <div className="social-icon d-flex align-items-center justify-content-center">
                                        <a href="https://www.instagram.com/garant_quyash_panelleri" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram" />
                                        </a>
                                        <a href="https://t.me/garant_quyash_panelleri" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-telegram-plane" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom style-2">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="wow slideLeft color-2" data-delay=".3">
                            © Все права защищены 2026 — <Link to="/">Garant Sun Energy</Link> {" "}
                        </p>
                        <ul className="footer-menu wow slideRight" data-delay=".5">
                            <li>
                                <Link to="contact">Условия использования</Link>
                            </li>
                            <li>
                                <Link to="contact">Политика конфиденциальности</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Link to="#" id="scrollUp" className="scroll-icon">
                    <i className="fa fa-arrow-up" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;