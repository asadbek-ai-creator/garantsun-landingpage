import { Link } from "react-router-dom"

const TopHeaderOne = ({ wrapperClass, className }: { wrapperClass?: string, className?: string }) => {
    return (
        <div className={`header-top-section fix ${className}`}>
            <div className="container-fluid">
                <div className={`header-top-wrapper ${wrapperClass}`}>
                    <ul className="contact-list">
                        <li>
                            <i className="far fa-envelope" />
                            <Link to="mailto:info@example.com" className="link">garantsunenergy@gmail.com</Link>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone-volume" />
                            <Link to="tel:+998972421001">+99897 242 10 01</Link>
                        </li>
                    </ul>
                    <div className="top-right">
                        <div className="social-icon d-flex align-items-center">
                            <span>Follow Us:</span>
                            <Link to="https://www.instagram.com/garant_quyash_panelleri" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></Link>
                            <Link to="https://t.me/garant_quyash_panelleri" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram-plane" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeaderOne