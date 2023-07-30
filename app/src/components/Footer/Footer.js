import '../Footer/Footer.css';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer__background">
            <footer className="footer">
                <div className="footer__main">
                    <Link className='logo-link' onClick={() => window.location.href = '#'}>
                        <img src={logo} alt="logo" className='footer__logo' />
                    </Link>
                    <div className="nav__contact">
                        <h2>Contact us</h2>
                        <address>
                            5555 str. Bulgaria<br />
                        </address>
                        <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
                    </div>
                    <div className="footer__nav">
                        <h2 className="nav__title">Legal</h2>
                        <ul className="nav__ul">
                            <li>
                                <Link>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link>Terms of Use</Link>
                            </li>
                            <li>
                                <Link>Sitemap</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="legal">
                    <p>&copy; 2023 - Technovida - All rights reserved.</p>
                </div>
            </footer>

        </div>
    )
};

export default Footer;