import { useState } from 'react';
import '../HamburgerButton/HamburgerButton.css';
import SideNav from '../SideNav/SideNav';

const Overlay = ({ onClick }) => <div className='overlay' onClick={onClick}></div>;
const CloseButton = ({ onClick }) => <div className='closeBtn' onClick={onClick}>&times;</div>;

function HamburgerButton() {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen((prevState) => !prevState);
    };

    return (
        <>
            <div className="hamburger-btn" onClick={toggleNav}>
                &#9776;
            </div>
            {navOpen && (
                <>
                    <SideNav isOpen={navOpen} onCloseSidenav={toggleNav} />
                    <Overlay onClick={toggleNav} />
                    <CloseButton onClick={toggleNav} />
                </>
            )}
        </>
    );
}

export default HamburgerButton;