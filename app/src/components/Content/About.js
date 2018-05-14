import React, {Component} from 'react';
var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;

export default class Contact extends Component {

    render() {
        return (
            <Element name="about" id="about">
                <nav className="navbar navbar-expand-lg navbar-dark bg-faded">
                    <a className="navbar-brand">
                        <img src={require('../../resources/images/logo_white.png')} alt="Logo"/>
                    </a>
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link activeClass="active" className="about" to="about" spy={true} smooth={true} duration={500} >ABOUT</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClass="active" className="download" to="download" spy={true} smooth={true} duration={500} >DOWNLOAD</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClass="active" className="contact" to="contact" spy={true} smooth={true} duration={500} >CONTACT</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div id="aboutSection" className="container text-center">
                    <h1>WELCOME TO BEYOND SIGHT</h1>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                </div>
            </Element>
        );
    }

}
