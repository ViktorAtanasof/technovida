import { useState } from 'react';
import '../HamburgerButton/HamburgerButton.css';
import SideNav from '../Nav/SideNav/SideNav';
import { Transition } from 'react-transition-group';

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
                &#9776; Open
            </div>
            <Transition
                in={navOpen}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                {state => {
                    return (
                        <>
                            <SideNav isOpen={navOpen} state={state} />
                            <div className='overlay'
                                style={state === "entering" ? { animation: "show .3s forwards" }
                                    : state === "entered" ? { opacity: "1" } : { animation: "show .3s backwards reverse" }}
                                onClick={closeNav}></div>
                            <div className='closeBtn'
                                style={state === "entering" ? { animation: "show .3s forwards" }
                                    : state === "entered" ? { opacity: "1" } : { animation: "show .3s backwards reverse" }}
                                onClick={closeNav}>&times;</div>
                        </>
                    )
                }}
            </Transition >
        </>
    );
}

export default HamburgerButton;