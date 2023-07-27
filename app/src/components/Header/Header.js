import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import '../Header/Header.css';
import HamburgerButton from '../HamburgerButton/HamburgerButton';

function Header() {
    return (
        <div className="header__background">
            <header className="header__content">
                <HamburgerButton />
                <Link className='logo-link' to={'/'}>
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </header>
        </div>
    );
}

export default Header;