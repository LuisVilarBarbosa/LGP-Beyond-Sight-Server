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
                    <p>Beyond Sight has the goal of solving the difficulty regarding the daily environment of visually impaired people. By providing an alternative communication between the speaker and the audience, it will allow them to autonomously attend presentations, without requiring assistance to understand the contents displayed.
                    </p>
                </div>
            </Element>
        );
    }

}
