import { SuCallMessage, SuEmail, SuLocation } from "@/lib/icons";
import { Link } from "react-router-dom";

const contactInfo = [
    {
        icon: <SuCallMessage />,
        label: "Call Us 7/24",
        value: "+998-555-01-12",
        link: "tel:+9985550112",
    },
    {
        icon: <SuEmail />,
        label: "Make a Quote",
        value: "garantsunenergy@gmail.com",
        link: "#",
    },
    {
        icon: <SuLocation />,
        label: "Location",
        value: "Uzbekistan, Karakalpakstan, Nukus",
    },
];

const quickLinks = [
    { text: "Solar About", link: "/about" },
    { text: "Our Services", link: "/service" },
    { text: "Our Blogs", link: "/news" },
    { text: "FAQ’S", link: "/faq" },
    { text: "Contact Us", link: "/contact" },
];

const services = [
    { text: "Consultancy", link: "/service-details" },
    { text: "Solar System", link: "/service-details" },
    { text: "Solar Panel", link: "/service-details" },
    { text: "Style Guide", link: "/service-details" },
    { text: "License", link: "/service-details" },
];

const recentPosts = [
    {
        image: "/img/news/pp1.jpg",
        date: "20 Feb, 2025",
        title: "2021 Batterman Award honors Brad Burkhart",
        link: "/news-details",
    },
    {
        image: "/img/news/pp2.jpg",
        date: "15 Dec, 2025",
        title: "2021 Batterman Award honors Brad Burkhart",
        link: "/news-details",
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
                    <div className="row">
                        <div
                            className="col-xl-3 col-lg-4 col-md-6 wow slideUp"
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
                                        Garant Sun Energy — your trusted partner in solar energy
                                        across Uzbekistan and Karakalpakstan.
                                    </p>
                                    <div className="social-icon d-flex align-items-center">
                                        <Link to="#">
                                            <i className="fab fa-facebook-f" />
                                        </Link>
                                        <Link to="#">
                                            <i className="fa-brands fa-x-twitter" />
                                        </Link>
                                        <Link to="#">
                                            <i className="fa-brands fa-linkedin-in" />
                                        </Link>
                                        <Link to="#">
                                            <i className="fa-brands fa-youtube" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-2 col-lg-4 col-md-6 ps-lg-5 wow slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Quick Links</h3>
                                </div>
                                <ul className="list-area">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link to={link.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget style-margin">
                                <div className="widget-head">
                                    <h3>Services</h3>
                                </div>
                                <ul className="list-area">
                                    {services.map((service, index) => (
                                        <li key={index}>
                                            <Link to={service.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {service.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-lg-4 col-md-6 wow slideUp"
                            data-delay=".7"
                        >
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom style-2">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="wow slideLeft color-2" data-delay=".3">
                            © All Copyright 2026 by <Link to="/">Garant Sun Energy</Link> {" "}
                        </p>
                        <ul className="footer-menu wow slideRight" data-delay=".5">
                            <li>
                                <Link to="contact">Terms &amp; Condition</Link>
                            </li>
                            <li>
                                <Link to="contact">Privacy Policy</Link>
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