import React, {Component} from 'react';
import '../css/Header.css';

export default class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-faded">
                    <navd>
                        <img src="../resources/images/logo_white.png" style={{width: 100, marginTop: -7}}/>
                        BEYOND SIGHT
                    </navd>
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
                                <a className="nav-link" href="#about">ABOUT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">CONTACT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#download">DOWNLOAD</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

}