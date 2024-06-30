import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header id="masthead" className="site-header">
            <div className="tool-title">
                <h1>Message Transmitter</h1>
            </div>
            <div className="menu-header-menu-container">
                <ul id="primary-menu" className="menu nav-menu">
                    <li className="menu-item">
                        <a href="/">Home</a>
                    </li>
                    <div className="menu-item">
                        <a href="/signin" onClick={() => console.log('SignIn clicked')}>
                            Signin
                        </a>
                    </div>
                    <div className="menu-item">
                        <a href="/signup" onClick={() => console.log('Signup clicked')}>
                            Signup
                        </a>
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Header;
