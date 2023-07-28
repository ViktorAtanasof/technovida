import { useState } from 'react';
import '../HamburgerButton/HamburgerButton.css';
import SideNav from '../SideNav/SideNav';

function HamburgerButton() {
    const [navOpen, setNavOpen] = useState(false);

    const openNav = () => {
        setNavOpen(true);
    }

    const closeNav = () => {
        setNavOpen(false);
    }

    return (
        <>
            <div className="hamburger-btn" onClick={openNav}>
                &#9776;
            </div>
            {navOpen && (
                <>
                    <SideNav isOpen={navOpen} onCloseSidenav={closeNav} />
                    <div className='overlay' onClick={closeNav}></div>
                    <div className='closeBtn' onClick={closeNav}>&times;</div>
                </>
            )}
        </>
    );
}

export default HamburgerButton;