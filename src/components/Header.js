import React, {Component} from 'react';
import '../css/Header.css';

export default class Header extends Component {

    render() {
        return (
            <header>
                {/*<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60"/>*/}

                {/*<div id="about" className="container-fluid"/>*/}
                {/*<div id="services" className="container-fluid"/>*/}
                {/*<div id="portfolio" className="container-fluid"/>*/}
                {/*<div id="pricing" className="container-fluid"/>*/}
                {/*<div id="contact" className="container-fluid"/>*/}

                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#about">ABOUT</a></li>
                                <li><a href="#contact">CONTACT</a></li>
                                <li><a href="#download">DOWNLOAD</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}